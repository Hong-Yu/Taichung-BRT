/**
 * Created by hong on 2014/9/3.
 */
var async = require('async');

var data_builder = require("./data_builder.js");
data_builder.Initialize();
var light_converter = require("./light_converter.js");
light_converter.Initialize();

module.exports = {
    Initialize: function() {
        this.intersections = [];
        this.intersection_index_table = [];
        this.live_light = [];
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
        data_builder.set_connector(this.con_db);
    },
    Build: function() {
        Build(this.con_db, this.intersections, this.intersection_index_table);

    },
    Update: function(input_data) {
        Update(input_data, this.intersections, this.intersection_index_table);
    },
    get_live_light: function (map_center) {
        RenewLiveLight(this.intersections, this.live_light, map_center);
        return this.live_light;
    }
};

function Build(con_db, intersections, intersection_index_table) {
    async.series([
        function(callback) {
            //1. Build traffic light data.
            data_builder.Build(con_db, intersections, intersection_index_table, callback);
        },
        function(callback) {
//            Show(intersections, intersection_index_table);
            callback(null, 'show complete.');
        }
    ],
        function(err, result) {
            console.log("Traffic light -- data process -- result array :", result);
        }
    );

}

function Show(input_data, index_table) {
    for (var row_index = 0; row_index < input_data.length; ++row_index) {
        console.log('index: ', row_index, ' id: ', index_table[row_index]);
        console.log(input_data[row_index]);
        if (row_index > 0) break;
    }
}

function Update(input_data, intersections, intersection_index_table) {
    var card_data = input_data;
//         console.log(card_data);
    var light_detail = [];
    var light_single = [];
    var light_card_detail = [];
    for (var card_index = 0; card_index < 6; card_index++) {
        light_converter.Convert(input_data[card_index]);
        light_detail[card_index] = light_converter.get_detail();
        light_single[card_index] = light_converter.get_single();
        light_card_detail[card_index] = light_converter.get_card_detail();
    }
//    console.log('card input: ', input_data);
//    console.log('light detail: ', light_detail);
    var intersection_id = card_data[0].equip_id;
    var intersection_index = intersection_index_table.indexOf(intersection_id);
    UpdateLight(light_detail, light_single, light_card_detail, intersections[intersection_index]);

}

function UpdateLight(detail_set, single_set, light_card_detail, intersection) {
    for (var pole_index = 0; pole_index < intersection.length; ++pole_index) {
        var card_index = intersection[pole_index].card_id - 1;
        intersection[pole_index].detail = detail_set[card_index];
        intersection[pole_index].light = single_set[card_index];
        intersection[pole_index].card_detail = light_card_detail[card_index];
    }
}

function RenewLiveLight(intersections, live_light, map_center) {
//    console.log("map center: ", map_center);
    var longitude_center = map_center.B;
    var latitude_center = map_center.k;
    var light_index = -1;
    var intersection;
    var pole_info;
    for (var section_index = 0; section_index < intersections.length; ++section_index) {
        intersection = intersections[section_index];
        for (var card_index = 0; card_index < intersection.length; ++card_index) {
            pole_info = intersection[card_index];
            if (Math.abs(pole_info.longitude - longitude_center) > 0.005) continue;
            if (Math.abs(pole_info.latitude - latitude_center) > 0.005) continue;
            live_light[++light_index] = pole_info;
        }
    }
}

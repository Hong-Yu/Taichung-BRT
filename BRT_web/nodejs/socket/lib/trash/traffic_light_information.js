/**
 * Created by CCT on 2014/4/14.
 */
module.exports = {
   Initialize: function() {
       this.intersections = [];
       Select(this.intersections);

   },
//   Data: function() {
//      ReadPosition(this.con_db, this.data_manage);
//   },
   set_connector: function (con_db) {
      this.con_db = con_db;
   },
   set_data_manager: function (data_manage) {
      this.data_manage = data_manage;
   }
};

function Select(intersections) {
    var query = con_db.query("Select id, longitude, latitude, intersection_id, card_id, traffic_type, rotation from traffic_light");
    query.exec( function( err, res ){
        if( err ){
            console.log('read traffic light error\n');
            console.log(err);
            return
        }else{
            BuildIntersection(res.result, intersections);
        }
    });

}

function BuildIntersection(input_data, intersections) {
    var intersection_index_table = [];
    var intersection_index = 0;
    var intersection_id = -48;
    var data_current;
    for (var col_index = 0; col_index < input_data.length; ++col_index) {
        data_current = input_data[col_index];
        if (intersection_id != data_current.intersection_id) {
            intersection_id = data_current.intersection_id;


        }

    }

}

function ReadPosition(con_db, data_manage) {
   var query = con_db.query("Select id, longitude, latitude, intersection_id, card_id, traffic_type, rotation from traffic_light");
   query.exec( function( err, res ){
      if( err ){
         console.log('read traffic light error\n');
         console.log(err);
         return
      }else{
         var info = res.result;
         DeliverPoleInfo(info, data_manage);

      }
   });
}

function DeliverPoleInfo(info, data_manage) {
   var current_info;
   var intersection_index, card_index, lat, lng, type, rotation;
   for (var row_index = 0; row_index < info.length; ++row_index) {
      current_info = info[row_index];
      intersection_index = current_info.intersection_id;
      card_index = current_info.card_id ;
      lat =  current_info.latitude ;
      lng =  current_info.longitude ;
      type =  current_info.traffic_type ;
      rotation =  current_info.rotation ;
      data_manage.set_pole_info(intersection_index, card_index, lat, lng, type, rotation);
   }


}
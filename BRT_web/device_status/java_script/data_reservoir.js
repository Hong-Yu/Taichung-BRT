/**
 * Created by hong on 2014/7/24.
 */
function DataReservoir() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize(intersections) {
        this.impoundment = new Object();
        InitializeImpoundment(intersections, this.impoundment);
//        console.log("intersection data: ", JSON.stringify( this.impoundment));
    }
    this.set_device_location = set_device_location;
    function set_device_location(locations) {
        var devices_type = ["tc", "dsrc", "gps", "ipc"];
        for (var type_index = 0; type_index < devices_type.length; ++type_index) {
            var device_type = devices_type[type_index];
            InitializeLocation(device_type, locations[device_type], this.impoundment);
        }
    }
    this.set_device_status = set_device_status;
    function set_device_status(status_data) {
//        console.log("status data: ", status_data);
        for(var intersection_index = 0; intersection_index < status_data.length; ++intersection_index) {
            UpdateStatus(status_data[intersection_index], this.impoundment);
        }
//        console.log(this.impoundment);
    }
    this.Penstock = Penstock;
    function Penstock() {
        return this.impoundment;

    }

// Private member ---------------------------------------------------------
    function InitializeImpoundment(intersections, impoundment) {
        var index_table = [];
        var length = intersections.length;
        var tc = [];
        var dsrc = [];
        var gps = [];
        var ipc = [];
        for(var intersection_index = 0; intersection_index < length; ++intersection_index) {
            index_table[intersection_index] = intersections[intersection_index].intersection_id;
            tc[intersection_index] = NewContent();
            dsrc[intersection_index] = NewContent();
            gps[intersection_index] = NewContent();
            ipc[intersection_index] = NewContent();
        }
        impoundment.index_table = index_table;
        impoundment.tc = tc;
        impoundment.dsrc = dsrc;
        impoundment.gps = gps;
        impoundment.ipc = ipc;
        function NewContent() {
            var content = new Object();
            content.intersection_id = -1;
            content.latitude = -1;
            content.longitude = -1;
            content.is_connect = false;
            return content;
        }
    }
    function InitializeLocation(device_type, locations, impoundment) {
//        console.log("intersection index table: ", JSON.stringify( impoundment.index_table));
//        console.log("data: ", JSON.stringify( locations ));
        for (var intersection_index = 0; intersection_index < locations.length; ++intersection_index) {
            var index = impoundment.index_table.indexOf(locations[intersection_index].intersection_id);
//            console.log("index", index, "device_type", device_type, ' id: ', locations[intersection_index].intersection_id);
            if (index == -1) continue;
//            console.log("index", index, "device_type", device_type);
            impoundment[device_type][index].intersection_id = locations[intersection_index].intersection_id;
            impoundment[device_type][index].latitude = locations[intersection_index].latitude;
            impoundment[device_type][index].longitude = locations[intersection_index].longitude;
        }
//                    impoundment.gps[3].intersection_id = 48;
//        console.log("gps: ", impoundment.gps);

    }
    function UpdateStatus(status_data, impoundment) {
//        console.log(" status_data: ", status_data);
        var devices_type = ["tc", "dsrc", "gps", "ipc"];
        for (var type_index = 0; type_index < devices_type.length; ++type_index) {
            var device_type = devices_type[type_index];
            var index = impoundment.index_table.indexOf(status_data.intersection_id);
//            console.log(" index: ", index, " id: ", status_data);
            if (device_type == 'dsrc'){
                var is_connect = [];
                is_connect[0] = IsConnect(status_data['src'][0]);
                is_connect[1] = IsConnect(status_data['src'][1]);
                impoundment[device_type][index].is_connect = is_connect;
            } else{
                impoundment[device_type][index].is_connect = IsConnect(status_data[device_type]);
            }

        }
        function IsConnect(input_data) {
            return input_data == "connect";
        }


    }


}
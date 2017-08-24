var sql_generator =  require('../sql_generator.js');

module.exports = {
    Initialize: function(ms_connector) {
        this.impoundment = new Object();
        Initialize(ms_connector, this.impoundment);
    },
    Pound: function(input_water) {
        Pound(input_water, this.impoundment);
   },
    Penstock: function() {
        return this.impoundment;

    }
}

function Initialize(ms_connector, impoundment) {
    //  Select intersection
    var table_name = "intersection";
    var column_name = ["intersection_id", "name", "latitude", "longitude"];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    cmd_sql += "WHERE longitude is not null AND latitude is not null;";
    ExecuteWithResult(ms_connector, cmd_sql, InitializeImpoundment);
    function ExecuteWithResult(ms_connector, cmd_sql, ResultFunction) {
        var query = ms_connector.query(cmd_sql);
        query.exec( function( err, res ){
            if( err ){
                console.log('select error: ', mark);
                console.log(err);
            }else{
                ResultFunction(res.result);
            }
        });
    }
    function InitializeImpoundment(input_data) {
        var index_table = [];
        var information = [];
        for(var intersection_index = 0; intersection_index < input_data.length; ++intersection_index) {
            var intersection_id = input_data[intersection_index].intersection_id;
            var content = new Object();
            var sub_contect = ["disconnect", "disconnect", "disconnect", "disconnect"];
            content.intersection_id  = intersection_id;
            content.tc  = "disconnect";
            content.src  = sub_contect;
            content.gps  = "disconnect";
            content.ipc  = "disconnect";
            index_table[intersection_index] = intersection_id;
            information[intersection_index] = content;
        }
        impoundment.index_table = index_table;
        impoundment.information = information;
//        console.log("Impoundment ", impoundment);
    }
}

function Pound(input_data, impoundment) {
    var intersection_index = impoundment.index_table.indexOf(input_data.LCN);
    var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
    switch(label){
        case '0F-04':
            impoundment.information[intersection_index].tc = CheckConnect(input_data.HardwareStatus, "C000", "?????");
            break;
        case 'BF-00':
            impoundment.information[intersection_index].src[0] = CheckConnect(input_data.SRC1, 0, 1);
            impoundment.information[intersection_index].src[1] = CheckConnect(input_data.SRC2, 0, 1);
            impoundment.information[intersection_index].src[2] = CheckConnect(input_data.SRC3, 0, 1);
            impoundment.information[intersection_index].src[3] = CheckConnect(input_data.SRC4, 0, 1);
            impoundment.information[intersection_index].ipc = "disconnect";
            if (impoundment.information[intersection_index].src.indexOf("connect") != -1) {
                impoundment.information[intersection_index].ipc = "connect";
            }
            break;
        case 'FF-02':
            impoundment.information[intersection_index].gps = CheckConnect(input_data.GPSStatus, 0, 1);
            break;
        default:
            console.log("Data not be assigned :" + label);
            break;
    }
//    console.log("Update data: ", impoundment.information[intersection_index]);
    function CheckConnect(key, keyword_con, keyword_dis) {
        if (key == keyword_con) return "connect";
        return "disconnect";
    }

}

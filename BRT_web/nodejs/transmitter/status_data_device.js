/**
 * Created by hong on 2014/7/21.
 */
module.exports = {
    Initialize: function() {
    },
    get_data_tc: function() {
        return DataMakerTC();
    },
    get_data_src: function() {
        return DataMakerSRC();
    },
    get_data_gps: function() {
        return DataMakerGPS();
    }
};

function DataMakerTC() {
    var send_data = new Object();
    send_data.FunctionNo = "0F";
    send_data.MsgTypeNo = "04";
    send_data.LCN = 2021;
    send_data.HardwareStatus = "C000";
    return JSON.stringify(send_data);
}

function DataMakerSRC() {
    var send_data = new Object();
    send_data.FunctionNo = "BF";
    send_data.MsgTypeNo = "00";
    send_data.LCN = 2021;
    send_data.SRC1 = 1;
    send_data.SRC2 = 0;
    send_data.SRC3 = 1;
    send_data.SRC4 = 0;
    return JSON.stringify(send_data);
}

function DataMakerGPS() {
    var send_data = new Object();
    send_data.FunctionNo = "FF";
    send_data.MsgTypeNo = "02";
    send_data.LCN = 2021;
    send_data.GPSStatus = 1;
    return JSON.stringify(send_data);
}

//TC:
//{
//    "FunctionNo":"0F",
//    "MsgTypeNo":"04",
//    "MsgTime":"2014-04-30 18:04:45",
//    "LCN":1234,
//    "key":"0F04",
//    "HardwareStatus":"C000"   //C000為正常，其他為異常，目前訂每分鐘送
//}
//
//SRC: //請更名為SRC
//{
//    "FunctionNo":"BF",
//    "MsgTypeNo":"00",
//    "MsgTime":"2014-04-30 18:04:45",
//    "LCN":1234,
//    "key":"BF00",
//    "SRC1":0,    //0:正常, 1:異常
//    "SRC2":0,    //0:正常, 1:異常
//    "SRC3":1,    //0:正常, 1:異常
//    "SRC4":0     //0:正常, 1:異常
//}
//
//GPS:
//{
//    "FunctionNo":"FF",
//    "MsgTypeNo":"02",
//    "MsgTime":"2014-04-30 18:04:45",
//    "LCN":1234,
//    "key":"FF02",
//    "GPSStatus":1   //0:異常, 1:正常
//}
//
//IPC:
//    若三分鐘沒有收到SRC(BF00)的資訊即表示IPC斷線，若有收到即表示連線
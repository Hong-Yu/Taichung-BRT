/**
 * Created by hong on 2014/7/22.
 */

module.exports = {
    Initialize: function() {
    },
    get_data_bus: function(repeat_index) {
        return DataMakerBUS(repeat_index);
    },
    get_bus_arrival_time: function () {
        return BusArrivalTime();

    }
};

function DataMakerBUS(repeat_index) {
    var contents = [];
    contents[0] = Contents();
    contents[1] = Contents();
    var send_data = new Object();
    send_data.FunctionNo = 105;
    send_data.MsgTypeNo = 3;
    send_data.Contents = contents;
    return JSON.stringify(send_data);
    function Contents() {
        console.log("bus count: ", repeat_index);
        var bus_data = new Object();
        bus_data.CarNo = 'No.00' + RandomInt(3) +'-00';
        bus_data.LocX = 120.66417217254639 + repeat_index * 0.0001;
        bus_data.LocY = 24.15492804181027;
        bus_data.AvgSpeed = 36.541;
        return bus_data;
    }
}

function RandomInt(max) {
    return Math.floor(Math.random() * max);
}
//24.15492804181027, B: 120.66417217254639,


//{
//“FunctionNo”:105,
//  “MsgTypeNo”:3,
//  “Contents”:[
//    {“CarNo”:”12345”,
//“LocX”: 120.12345,
//“LocY”: 24.52343,
//“MachineStatus”:3,
//“LostSchStatus”:0,
//“LostSchTime”:0,
//“AvgSpeed”:36.541
//},
//{“CarNo”:”54321”,
//“LocX”: 121.62345,
//“LocY”: 24.52326,
//“MachineStatus”:3,
//“LostSchStatus”:0,
//“LostSchTime”:0,
//“AvgSpeed”:32.678
//}
//],
//“MsgTime”:”2014-01-27 22:15:00”
//}
function BusArrivalTime() {
    var send_data = new Object();
    send_data.FunctionNo = 104;
    send_data.MsgTypeNo = 3;
    send_data.Contents = Contents();
    return JSON.stringify(send_data);
    function Contents() {
        console.log("bus arrival time: ");
        var bus_data = new Object();
        bus_data.CarNo = 'No.00' + RandomInt(3) +'-00';
        bus_data.LocX = 120.66417217254639;
        bus_data.LocY = 24.15492804181027;
        bus_data.StationID = 2;
        bus_data.DIR = '1';
        bus_data.EstToStaTime = '2014-11-14 7:10:35';
        return bus_data;
    }
}

//{ FunctionNo: 104,
//    MsgTypeNo: 3,
//    Contents:
//    { CarNo: 50,
//        LocX: 120.67395833333333,
//        LocY: 24.147343333333332,
//        StationID: 2,
//        DIR: '1',
//        EstToStaTime: '2014-11-14 7:10:35' },
//    MsgTime: '2014-11-14 15:8:56' }
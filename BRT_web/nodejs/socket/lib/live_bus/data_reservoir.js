/**
 * Created by hong on 2014/11/14.
 */
module.exports = {
    Initialize: function() {
        this.bus_queue = [];
        this.bus_data = new Object();
        this.Contents = [];
        this.bus_data.Contents = this.Contents;

    },
    UpdateBusStatus: function(input_data) {
        UpdateBusStatus(input_data.Contents[0], this.bus_queue, this.bus_data.Contents);
    },
    getBusData: function () {
        return this.bus_data;
    }
};

function UpdateBusStatus(input_data, bus_queue, bus_contents) {
    var car_no = input_data.CarNo;
    var bus_index = bus_queue.indexOf(car_no);
    if (bus_index == -1) {
        bus_queue.push(car_no);
        bus_index = bus_queue.length - 1;
        bus_contents.push(new BusContentConstruct());
    }
    bus_contents[bus_index] = input_data;

}

function BusContentConstruct() {
    this.CarNo = '000000';
    this.LocX = 0;
    this.LocY = 0;
    this.MachineStatus = 0;
    this.LostSchStatus = 0;
    this.LostSchTime = 0;
    this.AvgSpeed = 0;
}

//建議JSON範例：
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

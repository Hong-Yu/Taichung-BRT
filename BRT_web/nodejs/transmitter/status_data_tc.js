/**
 * Created by hong on 2014/7/22.
 */

module.exports = {
    Initialize: function() {
    },
    get_data_tc: function() {
        return DataMakerTC();
    }
};

function DataMakerTC() {
    var d = new Date();
    if (typeof DataMakerTC.countdown === "undefined") DataMakerTC.countdown = 15;
    if (typeof DataMakerTC.stepID === "undefined") DataMakerTC.stepID = 1;
    if (DataMakerTC.countdown < 0) {
        DataMakerTC.countdown = 15;
        DataMakerTC.stepID++;
    }
    if (DataMakerTC.stepID > 7) DataMakerTC.stepID = 1;
    var input_data = new Object();
    var result = [];
    var status = new Object();
    status.Strategy = 0;
    if (DataMakerTC.countdown  == 10) status.Strategy = 1;
    status.stepID = DataMakerTC.stepID;
    status.stepsec = DataMakerTC.countdown--;
    status.DIR = 0;
//    status.LCN = 2008;
    status.LCN = Math.floor(Math.random()*57)+2001;
    status.BRTID = "test000132";
    status.PAtime = 1234;
    status.HOUR = d.getHours();
    status.MIN = d.getMinutes();
    status.SEC = d.getSeconds();
//    status.Point = 5;
    status.Point = Math.floor(Math.random()*8);
    status.Condition = RandomInt(5);
    result[0] = status;
    input_data.FunctionNo = 3;
    input_data.MsgTypeNo = 1;
    input_data.immediate = new Object();
    input_data.immediate.result = result;
    return JSON.stringify(input_data);
}

function RandomInt(max) {
    return Math.floor(Math.random() * max);
}
//Receive 3-1
//{"FunctionNo":3,"MsgTypeNo":1,"MsgTime":"2014-11-24 11:40:38","immediate":{"resu
//    lt":[{"LCN":2008,"stepID":0,"stepsec":31,"Condition":0,"Strategy":0,"BRTID":"000
//    000000000","RouteID":"00000000","RoadID":"000000000000","DIR":0,"Point":7,"HOUR"
//:0,"MIN":0,"SEC":0,"TSPType":0,"PAtime":0,"PD":0,"Speed":0}]}}
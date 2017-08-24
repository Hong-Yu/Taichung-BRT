/**
 * Created by hong on 2014/12/19.
 */

module.exports = {
    Initialize: function() {
    },
    get_data_light: function() {
        return DataMakerLight();
    }
};

function DataMakerLight() {

    var sent_data = new Object();
    var result = [];

    for (var card_index = 0; card_index < 6; ++card_index) {
        var card_id = card_index + 1;
        result[card_index] = CardInfo(2018, card_id);
    }

    sent_data.FunctionNo = 4;
    sent_data.MsgTypeNo = 1;
    sent_data.Lightstate = new Object();
    sent_data.Lightstate.result = result;
    return JSON.stringify(sent_data);
}

function CardInfo(equip_id, card_id) {
    var status = new Object();
    status.equip_id = equip_id;
    status.CardID = card_id;
    if (card_id == 1) {
        status.red = '0';
        status.yellow = '0';
        status.Lgreen = '0';
        status.green = '0';
        status.Fgreen = '11';
        status.Rgreen = '11';
        status.PRed = '0';
        status.Pgreen = '11';
    } else {
        status.red = '11';
        status.yellow = '0';
        status.Lgreen = '0';
        status.green = '0';
        status.Fgreen = '0';
        status.Rgreen = '0';
        status.PRed = '11';
        status.Pgreen = '0';
    }

    return status;
}

function RandomInt(max) {
    return Math.floor(Math.random() * max);
}

//{"FunctionNo":4,"MsgTypeNo":1,"MsgTime":"2014-12-15 10:26:03","Lightstate":{"res
//    ult":[{"equip_id":2008,"CardID":1,"red":"0","yellow":"0","Lgreen":"0","green":"0
//    ","Fgreen":"11","Rgreen":"11","PRed":"0","Pgreen":"11"},{"equip_id":2008,"CardID
//    ":2,"red":"11","yellow":"0","Lgreen":"0","green":"0","Fgreen":"0","Rgreen":"0","
//    PRed":"11","Pgreen":"0"},{"equip_id":2008,"CardID":3,"red":"0","yellow":"0","Lgr
//    een":"0","green":"11","Fgreen":"0","Rgreen":"0","PRed":"0","Pgreen":"11"},{"equi
//    p_id":2008,"CardID":4,"red":"11","yellow":"0","Lgreen":"0","green":"0","Fgreen":
//    "0","Rgreen":"0","PRed":"11","Pgreen":"0"},{"equip_id":2008,"CardID":0,"red":"0"
//    ,"yellow":"0","Lgreen":"0","green":"0","Fgreen":"0","Rgreen":"0","PRed":"0","Pgr
//    een":"0"},{"equip_id":2008,"CardID":0,"red":"0","yellow":"0","Lgreen":"0","green
//    ":"0","Fgreen":"0","Rgreen":"0","PRed":"0","Pgreen":"0"},{"equip_id":2008,"CardI
//    D":0,"red":"0","yellow":"0","Lgreen":"0","green":"0","Fgreen":"0","Rgreen":"0","
//    PRed":"0","Pgreen":"0"},{"equip_id":2008,"CardID":0,"red":"0","yellow":"0","Lgre
//    en":"0","green":"0","Fgreen":"0","Rgreen":"0","PRed":"0","Pgreen":"0"}]}}
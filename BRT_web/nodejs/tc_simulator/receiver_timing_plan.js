/**
 * Created by hong on 2014/10/15.
 */
var udp_client = require("./udp_client");
udp_client.Initialize();

module.exports = {
    Send: function () {
        Sent();
    }


};

function Sent() {
//    var send_data = ResponseData('OF-80');
    var send_data = ResponseData('99-1');
    var data_index = 0;
    SentProcess();
    function SentProcess() {
        if (data_index == 0) send_data = ResponseData('99-1');
        else if (data_index == 6) send_data = ResponseData('OF-81');
        else if (data_index <= 10) send_data = ResponseData('OF-80');
        console.log('Process: ',data_index  ,' ', send_data);
        send_data = JSON.stringify(send_data);
        udp_client.Send(send_data);
        if (data_index++ >= 9) return;
        setTimeout(arguments.callee, 500);
    }

}


function ResponseData(lable) {
    var data;
    switch(lable) {
        case 'OF-80':
            data = {"FunctionNo": "0F",
                "MsgTypeNo": "80",
                "MsgTime": "2014-10-14 14:07:35",
                "key": "0F80",
                "CommandID": "0F10",
                "CommandContents": "AA BB 08 20 08 00 0E 0F 10 52 52 AA CC 46 ",
                "LCN": 2008 };
            break;
        case 'OF-81':
            data = {"FunctionNo": "0F",
                "MsgTypeNo": "81",
                "MsgTime": "2014-10-14 14:27:18",
                "key": "0F81",
                "CommandID": "0F10",
                "ErrororCode": "04",
                "ParameterNumber": 1,
                "LCN": 2008 };
            break;
        case '99-1':
            data = {"FunctionNo": "99",
                "MsgTypeNo": "1",
                "MsgTime": "2014-10-14 14:27:18",
                "Total_V3": 9,
                "CommandID": "0F10",
                "ErrororCode": "04",
                "ParameterNumber": 1,
                "LCN": 2008 };
            break;
        default :
            console.log('Lable is not found', lable);
    }

    return data;
}

//0F-80
//{"FunctionNo": "0F", "MsgTypeNo": "80", "MsgTime": "2014-10-14 14:07:35", "key": "0F80", "CommandID": "0F10", "CommandContents": "AA BB 08 20 08 00 0E 0F 10 52 52 AA CC 46 ", "LCN": 2008 }
//
//0F-81
//{"FunctionNo": "0F", "MsgTypeNo": "81", "MsgTime": "2014-10-14 14:27:18", "key": "0F81", "CommandID": "0F10", "ErrororCode": "04", "ParameterNumber": 1, "LCN": 2008 }
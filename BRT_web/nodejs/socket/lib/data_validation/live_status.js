/**
 * Created by hong on 2014/11/24.
 */
module.exports = {
    Validate: function(input_data) {
        return Validate(input_data);
    }
};

function Validate(input_data) {
    var is_valid = true;
    if (typeof input_data.LCN === 'undefined') is_valid = false;
    if (typeof input_data.stepID === 'undefined') is_valid = false;
    if (typeof input_data.stepsec === 'undefined') is_valid = false;
    if (typeof input_data.Condition === 'undefined') is_valid = false;
    if (typeof input_data.Strategy === 'undefined') is_valid = false;
    if (typeof input_data.BRTID === 'undefined') is_valid = false;
    if (typeof input_data.Point === 'undefined') is_valid = false;
    if (input_data.DIR != 0 && input_data.DIR != 1) is_valid = false;
    if (is_valid) {
        console.log('successful checking 3-1 data.');
    } else {
        console.log('failed checking 3-1 data.');
    }
    return is_valid;
}

//Receive 3-1
//{"FunctionNo":3,"MsgTypeNo":1,"MsgTime":"2014-11-24 11:40:38","immediate":{"resu
//    lt":[{"LCN":2008,"stepID":0,"stepsec":31,"Condition":0,"Strategy":0,"BRTID":"000
//    000000000","RouteID":"00000000","RoadID":"000000000000","DIR":0,"Point":7,"HOUR"
//:0,"MIN":0,"SEC":0,"TSPType":0,"PAtime":0,"PD":0,"Speed":0}]}}

//LCN：設備編號
//
//stepID：步階
//
//stepsec：秒數
//
//Condition：號誌優先控制執行狀態，整數(0~5)。
//0：手動關機
//1：定時關機
//2：手動號誌優先控制執行中
//3：定時號誌優先控制執行中
//4：手動待機
//5：定時待機
//
//Strategy：號誌優先控制執行策略，整數(0~2)
//0：無。
//1：延長綠燈。
//2：切斷紅燈。
//
//BRTID：快捷巴士編號
//
//RouteID：優先路線編號
//
//RoadID：路口編號
//
//DIR：方向性 (0:往靜宜大學/1:往台中火車站)
//
//Point：快捷巴士通過觸發點參數，
//0：觸發點P0，(最遠端之虛擬站) >250m
//1：觸發點P1，250m
//2：觸發點P2，150m
//3：觸發點P3，70 m
//4：觸發點P4。(路口的站點)
//5：觸發點P5。(已通過路口之站點)
//6：近端設站點
//7：沒有車
//8：異常
//
//HOUR：發報時時間：小時，整數(0~23)，單位為小時
//
//MIN：發報時時間：分鐘，整數(0~59)，單位為分
//
//SEC：發報時時間：秒數，整數(0~59)，單位為秒
//
//TSPType：1 Byte，優先要求種類，整數(0~3)，若為0表示無優先，若為1條件優先，若為2為絕對優先，3為車門開啟，4為車門關閉，5為保留
//
//PAtime：預估到達P4時間，整數(0~254)，單位為秒，近端設站為0
//
//PD：預估到達P4距離，整數(0~300)，單位為公尺，近端設站為0
//
//Speed：車行速度，整數(0~60)，單位為Km/hr
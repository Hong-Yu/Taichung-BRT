/**
 * Created by Jia on 2014/9/17.
 */
var TableDataInsert = {
    TableInfo :function (target) {
        console.log('Hello~');
        var x = (parseInt(target.attributes[1].value)-20);
        var y = (parseInt(target.attributes[2].value)+50);
        var locationId = target.id;
        var locarionName = target.innerHTML;
        var domain_info = $('div.divinfo');
        domain_info.empty();
        window.clearInterval(IntervalObj.Interval);
        console.log(x);
        console.log(y);
        InsertInfo(locationId, locarionName, x, y);
    }
};
var TableData = {
    InputData:[]
};
var IntervalObj = new Object();
function InsertInfo(locationId, locarionName, x, y){
    var domain_info = $('div.divinfo');
    var name = locarionName;
    var num = parseInt(locationId);
    var str_table="";
    str_table +='<div class="panel panel-default" style="width: 330px; position: absolute; left: '+(x+50)+'px; top: '+(y+20)+'px">';
    str_table +='<button type="button" class="close glyphicon glyphicon-remove" data-dismiss="alert"></button>';
    str_table +='<div class="panel-body">';
    str_table +='<img src="intersection_imgs/'+num+'.gif" title="'+name+' 路口簡圖">';
    str_table +='<div><h4>'+num+' '+name+'</h4><p>';
    str_table +='<table class="table table-striped table-bordered" style="text-align:center;">';
    str_table +='<thead><tr><th>方向</th><th>往靜宜</th><th>往火車站</th></tr></thead>　<tbody><tr><td>優先狀態</td><td class="status" colspan="2">---</td></tr>';
    str_table +='<tr><td>優先策略</td><td class="strategy0">---</td><td class="strategy1">---</td></tr>' +
        '</tbody></table></p></div></div><div><p id="timefoot" style="text-align: right"></p></div></div>';

    domain_info.append(str_table);
    var lcn = parseInt(locationId.substr(2,2));
    IntervalObj.Interval=setInterval(function(){
                var input_data = TableData.InputData[lcn];
                InsertTable(input_data);
        },1000);
}

function InsertTable(input_data){
    console.log(JSON.stringify(input_data));

    var domain_div = ".divinfo";
    var text_condition = "未有資料";
    switch (input_data.Condition){
        case 0:
            text_condition = "手動關機";
            break;
        case 1:
            text_condition = "定時關機";
            break;
        case 2:
            text_condition = "手動優先控制執行中";
            break;
        case 3:
            text_condition = "定時優先控制執行中";
            break;
        case 4:
            text_condition = "手動待機";
            break;
        case 5:
            text_condition = "定時待機";
            break;
        default:
            text_condition = "未有資料";
            break;
    }
    var status = $(domain_div+' td.status').text(text_condition);

    if(input_data.DIR ===0){
        var text_status="未有資料";
        switch (input_data.Strategy){
            case 0:
                text_status = "無";
                break;
            case 1:
                text_status = "延長綠燈";
                break;
            case 2:
                text_status = "切斷紅燈";
                break;
            default:
                text_status = "未有資料";
                break;
        }
        var strategy0 = $(domain_div+' td.strategy0');
        strategy0.text(text_status);
    }else if(input_data.DIR ==1){
        var text_status2="未有資料";
        switch (input_data.Strategy) {
            case 0:
                text_status2 = "無";
                break;
            case 1:
                text_status2 = "延長綠燈";
                break;
            case 2:
                text_status2 = "切斷紅燈";
                break;
            default:
                text_status2 = "未有資料";
                break;
        }
        var strategy1 = $(domain_div+' td.strategy1');
        strategy1.text(text_status2);
    }

//    var green_countdown = $(domain_div+' td.green_countdown');
//    green_countdown.text(input_data.countdown[0]);

    var time_t = $(domain_div+' #timefoot');
    var text_t = '更新時間 '+input_data.HOUR+' : '+input_data.MIN+' : '+input_data.SEC+'　　';
    time_t.text(text_t);
}
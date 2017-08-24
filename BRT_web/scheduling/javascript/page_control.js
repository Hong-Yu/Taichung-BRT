/**
 * Created by Jia on 2014/10/31.
 * Events and pages control.
 * New / Uplaod / Cancel / Delete
 */
var PageControl = {
    WSetting: function(ws){
        this.websocket = ws;
    },
    NewSchedule: function(){
        new_scheduling();
    },
    ScheduleSetting: function(){
        var name = $('#name')[0].value;
        var max = $('#max')[0].value;
        var timer = $('#timer')[0].value;
        if(name !== '' && max !=='' && timer !=='' && !isNaN(max) && !isNaN(timer)){
            // console.log(name, max, timer);
            var main_set = new SettingEvent();
            main_set.MainSetting(name, max, timer);
        }else{
            alert('請填入正確內容。\n欄位皆不可空白、名稱開頭限英文、\n路口數與時段數僅限數字。');
        }
    },
    ScheduleUpload: function(max, timer, name){
        upload_scheduling(max, timer, name);
    },
    CancelNew: function(){
        cancel_scheduling(this.websocket);
    },
    Manage: function(inputdata){
            var sche = ScheduleMethod.GetByName(inputdata);
            console.log(sche);
            manage_scheduling(inputdata, sche.result, this.websocket);
    }
};

function new_scheduling(){
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    $.get("scheduling/sub_page/new_schedule.html", function(data) {
        domain_main.prepend(data);
    });
}

function upload_scheduling(max, timer, name){
    var uploadObj = {};
    uploadObj.result = [];
    var ar_time_begin = [];
    var ar_time_end = [];
    for(var t=0; t<timer; ++t){
        ar_time_begin[t] = $('input[type="time"][class="'+t+'"][id="1"]').val();
        ar_time_end[t] = $('input[type="time"][class="'+t+'"][id="2"]').val();
        uploadObj.result[t]={};
        uploadObj.result[t].time_begin = ar_time_begin[t];
        uploadObj.result[t].time_end = ar_time_end[t];
        uploadObj.result[t].scheduling = [];
        for(var s=0; s<max; ++s) {
            uploadObj.result[t].scheduling[s]={};
            uploadObj.result[t].scheduling[s].intersection_id = $('select:eq('+s+')').val();
            uploadObj.result[t].scheduling[s].checked = +$('input[type="checkbox"][id="'+s+'"]:eq('+t+')').prop( "checked" );
        }
    }
    var ar_time_interval =[];
    ar_time_interval = ar_time_end.map(function(ar_end, i){
        var h_end = parseInt(ar_end.slice(0,2));
        var m_end = parseInt(ar_end.slice(3,5));
        var minutes_end = h_end*60+m_end;
        var h_beg = parseInt(ar_time_begin[i].slice(0,2));
        var m_beg = parseInt(ar_time_begin[i].slice(3,5));
        var minutes_beg = h_beg*60+m_beg;
//        console.log(minutes_end);
//        console.log(minutes_beg);
        var re_sult = minutes_end-minutes_beg;
        return re_sult;
    }, ar_time_begin);
    console.log(ar_time_interval);
    var data_flag = 0;
    for(var t=0; t<timer; ++t){
        if(isNaN(ar_time_interval[t])){
            data_flag = 1;
            // alert('第'+(t+1)+'行時段未輸入正確。');
        }else{
            uploadObj.result[t].interval_min = ar_time_interval[t];
        }
    }
    uploadObj.scheduling_name = name;

    var intersectionObj = IntersectionsMethod.Getter();
    var websocket = intersectionObj.websocket;

    if(data_flag ===0){
        uploadObj.FunctionNo = 'scheduling';
        uploadObj.MsgTypeNo = 'new';
        var jsondata = JSON.stringify(uploadObj);
        console.log(jsondata);
        websocket.send(jsondata);
    alert('排程建立完成!');
    PageControl.CancelNew();
}else{
    alert('時段未輸入正確。');
}
}

function cancel_scheduling(ws){
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    var str_main = "";
    str_main +='<div class="running_zone"><h3><span class="label label-warning">執行中的排程</span><small> -點選執行中排程進入管理</small></h3>';
    str_main +='<div class="running_btn bg-warning" id="running"><p class="text-primary">目前未有執行中的排程</p></div></div><hr>';
    str_main +='<div class="new_sche"><h4><span class="label label-primary"><label onclick="PageControl.NewSchedule();" title="new an scheduling">';
    str_main +='<span class="glyphicon glyphicon-plus" title="new an scheduling"></span>新增排程</label></span></h4></div>';
    // $.get("scheduling/sub_page/main.html", function(data) {
    //     domain_main.prepend(data);
    // });
    domain_main.append(str_main);
    running_schedule(ws);
        function running_schedule(web_socket){
        var request = {};
        request.FunctionNo = 'scheduling';
        request.MsgTypeNo = 'query';
        // var json_data = JSON.stringify(request);
        web_socket.Send(request);
    }
}

function manage_scheduling(name, sche, websocket){
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    var str_main = "";
    str_main +='<div class="manage_title"><h3><span class="label label-success">管理排程</span></h3><div class="info_sche bg-success"><div class="col-sm-4"><label id="sche-name"></label><p id="sche-p"></p></div><div class="col-sm-8" style="text-align: left;"><button class="btn btn-danger btn-sm" id="sche_delete">刪除此排程</button></div></div></div><div class="main-table"><table class="table table-hover table-bordered" id="manage-table" style="text-align: center"></table></div>';
    str_main +='<div  class="info_sche"><label class="bg-primary" onclick="PageControl.CancelNew();">　<span class="glyphicon glyphicon-chevron-left"></span>取消　</label></div>';
    // str_main +='<button class="btn btn-danger" id="sche_delete">刪除此排程</button>';
    // $.get("scheduling/sub_page/manage.html", function(data) {
    //     domain_main.append(data);
    // });
    domain_main.prepend(str_main);
    domain_label = $('#sche-name');
    domain_label.text(name);
    $('#sche-p').text('共有 '+sche[0].scheduling.length+'個路口，'+sche.length+'個時段');
    var domain_table = $('#manage-table');
    var str_table = "";
    str_table += "<thead><tr><td>起始時間</td><td>執行分鐘數</td>";
    for (var i = 0; i < sche[0].scheduling.length; i++) {
        str_table += "<td>"+sche[0].scheduling[i].intersection_id+"</td>";
    }
    str_table += "</tr></thead><tbody>";
    for (var t = 0; t < sche.length; t++) {
        str_table += "<tr><td>"+sche[t].time_begin+"</td>";
        str_table += "<td>"+sche[t].interval_min+"</td>";
        for (var ts = 0; ts < sche[t].scheduling.length; ts++) {
            if(sche[t].scheduling[ts].checked === 0){
                str_table += "<td>關</td>";
            }else{
                str_table += "<td>開</td>";
            }
        }
        str_table += "</tr>";
    }
    str_table += "</tbody>";
    domain_table.append(str_table);
    $('#sche_delete').bind('click', function(){
       var r = confirm('真的要刪除嗎?');
       if (r === true) {
        var schedata = {};
        schedata.FunctionNo = 'scheduling';
        schedata.MsgTypeNo = 'delete';
        schedata.scheduling_name = name;
        // var json = JSON.stringify(schedata);
        websocket.Send(schedata);
        PageControl.CancelNew();
       }else{
        console.log('cancel scheduling delete.');
       }
    });
}
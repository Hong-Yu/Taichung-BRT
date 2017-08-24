/**
 * Created by hong on 2014/3/3.
 */
function TimingPlanTable() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize(interval_max) {
        InsertTable(interval_max);
    }
    // Private member ---------------------------------------------------------
    function InsertTable(interval_max) {
        $.get("timing_plan/sub_page/timming_plan_table.html", function(data) {
            for (var table_index = 1; table_index <= interval_max; table_index++) {
                AppendTable(data, table_index, interval_max);
            }
//           var str_html= '<tr class="phase_add"><th colspan="5"><span class="glyphicon glyphicon-plus phase_add"></span></th></tr>'
        });
    }
    function AppendTable(data, table_index, interval_max) {
        data = "<tr id = 'timing_plan_table" + table_index + "' mark=" + table_index + " style='display:none;'>" + data;
        var domain_main=$('#centerview');
        domain_main.find('table.table.mainbody>tbody').append(data);
//        console.log("Append table ", table_index);
        if (table_index == interval_max) {
            StyleTable();
        }
        // collapse event
        var table_id = '#timing_plan_table' + table_index;
        $(table_id).find('.display-btn').click(btn_collapsed);

    }

    function StyleTable() {
        var ui = $("#plan_table");
        var tp=ui.find('div.bootstrap-timepicker>input').css('font-size','14pt').timepicker({
            minuteStep: 10,
            showSeconds: false,
            showMeridian: false,
            defaultTime: 'current'
        });
        $("#plan_table").find('div.bootstrap-timepicker>input').timepicker().on('show.timepicker', function(e) {
            console.log('The time is ' + e.time.value);
            console.log('The hour is ' + e.time.hour);
            console.log('The minute is ' + e.time.minute);
            console.log('The meridian is ' + e.time.meridian);
        });
        //if(data && data.setTime)
//        tp.timepicker('setTime',"11:00");
        ui.find('tr.phase_details>td>input').val(0);
        ui.find('tr.phase_overview>td>input').css({backgroundColor:'#f9f9f9'}).val(0);
        ui.find('th').css({fontWeight:'bold',color:'darkgreen'});
        ui.find('.phase_overview input').css({textAlign:'center',color:'#0080FF'});
        ui.find('.phase_details input').css({textAlign:'center',color:'#008080'});
        //ui.find('.display-btn:eq("0")').click(btn_collapsed);
        ui.find('.btn-operation').click(function(e){
            switch(e.target.textContent){
                case '定':
                    $(e.target).text('優').removeClass('btn-warning').addClass('btn-danger');
                    $(e.target).attr("value", "1");
                    break;
                case '優':
                    $(e.target).text('定').removeClass('btn-danger').addClass('btn-warning');
                    $(e.target).attr("value", "0");
                    break;
                default:
                    break;
            }
        });
    }
    // UI設計的按鈕 Script 展開(單獨抽出來)
    var btn_collapsed=function(e){
        if($(this).find('span').hasClass('icon-plus')){
            $(this).find('span').removeClass('icon-plus').addClass('icon-list');
            $(this).parent().parent().parent().find('tbody tr.phase_details').hide();
            $(this).parent().parent().parent().find('tbody tr.phase_details.phase_details-showMaxGandMinG').show(150);
            $(this).parent().parent().parent().parent().parent().find("div.countdown").show();
        }
        else if($(this).find('span').hasClass('icon-list')){
            $(this).find('span').removeClass('icon-list').addClass('icon-minus');
            $(this).parent().parent().parent().find('tbody tr.phase_details').show(150);
            $(this).parent().parent().parent().parent().parent().find("div.countdown").show();
        }
        else if($(this).find('span').hasClass('icon-minus')){
            $(this).find('span').removeClass('icon-minus').addClass('icon-plus');
            $(this).parent().parent().parent().find('tbody tr.phase_details').hide(150);
            $(this).parent().parent().parent().parent().parent().find("div.countdown").hide();
        }
        return $(this).text();
    };



}


/**
 * Created by Jia on 2014/11/3.
 * Main create scheduling page.
 */
function SettingEvent(){
    this.MainSetting = MainSetting;
    function MainSetting(name, max, timer){
        main_setting(name, max, timer);
    }

    function main_setting(name, max, timer){
        var scheduling_name = name;
        var max_num = max;
        var title_div = $('.first_setting');
        var str_title='';
        str_title += "<div class='bg-info'><div class='info_sche col-sm-5'><p><strong>排程名稱：</strong>"+scheduling_name+"<br><strong>排程路口數：</strong>"+max_num+"<br><strong>排程時段數：</strong>"+timer+"</p></div>";
        str_title += '<div class="col-sm-7"><p>若路口同時段定時時制已開啟優先，無法使用此功能關閉優先。<br>開啟優先的時段範圍為1~255分鐘，超過請下0為永久。<br>設定關閉優先的時段範圍無作用。(時段結束關閉依然有效)</p></div></div>';
        title_div.append(str_title);
        $('.first_setting > h3 > small').innerHTML = ' -建立排程內容';
        var first_div = $('#initial');
        first_div.hide();
        var main_div = $('#main-setting');
        var intersectionObj = IntersectionsMethod.Getter();
        var intersections = intersectionObj.result;
        var str_main = "";
        str_main += "<table class='table table-hover table-condensed bg-success' style='text-align: center'><thead style='text-align: center'><tr><th>時間 \\ 路口</th>";
        var str_sub ="";
        for(var m=0; m<max_num;++m){
            str_main += "<th>("+(m+1)+") <select></select></th>";
            str_sub += "<td><input class='bootstrap-switch' type='checkbox' name='my-checkbox' id='"+m+"'></td>";
        }
        str_main += "</tr></thead><tbody>";
        for(var i=0; i<timer; ++i){
            str_main += "<tr><td><input type='time' class='"+i+ "' id='1'> ~ <input type='time' class='" +i+"' id='2'></td>"+str_sub+"</tr>";
        }
        str_main += "</tbody></table>";
        str_main += '<div><label class="bg-primary" onclick="PageControl.CancelNew();">　<span class="glyphicon glyphicon-chevron-left"></span>取消　</label>';
        str_main += '<label class="bg-primary" onclick="PageControl.ScheduleUpload('+max+', '+timer+', \''+scheduling_name+'\');">　建立<span class="glyphicon glyphicon-chevron-right"></span>　</label></div>';
        main_div.append(str_main);
        $.fn.bootstrapSwitch.defaults.size = 'mini';
        $.fn.bootstrapSwitch.defaults.onColor = 'danger';
        $.fn.bootstrapSwitch.defaults.onText = '開啟';
        $.fn.bootstrapSwitch.defaults.offText = '關閉';
//        $.fn.bootstrapSwitch.defaults.labelText = '優先';
        $("[name='my-checkbox']").bootstrapSwitch();

        var domain_intersection = $("select:lt("+max_num+")");
        var option_dir;
        for (var data_index = 0; data_index < intersections.length; ++data_index) {
            var current_data = intersections[data_index];
            option_dir = document.createElement('option');
            option_dir.innerHTML =current_data.intersection_id+ " - " + current_data.name;
            option_dir.title = current_data.intersection_id;
            option_dir.setAttribute("value", current_data.intersection_id);
            domain_intersection.append(option_dir);
        }
    }
}
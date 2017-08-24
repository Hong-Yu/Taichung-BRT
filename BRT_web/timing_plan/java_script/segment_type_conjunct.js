/**
 * Created by hong on 2014/6/10.
 */
// 設定時段型態

function SegmentTypeConjunct() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        SegmentTypeConjunct.segment_type_data = DataConstruct();  // work for database crash only.
        AddSpecialDayNumber(SegmentTypeConjunct.segment_type_data);
        ButtonListener();
        CalendarDroppable();
    }
    this.set_segment_type_data = set_segment_type_data;
    function set_segment_type_data(input_data) {
        AddSpecialDayNumber(input_data);
//        console.log("special day: ", );
        if (typeof input_data.length == 0) {
            SegmentTypeConjunct.segment_type_data = DataConstruct();
        } else {
            SegmentTypeConjunct.segment_type_data = input_data;
        }
//            console.log("segment type data: ", JSON.stringify(input_data));
    }
    this.get_segment_type_data = get_segment_type_data;
    function get_segment_type_data() {
        return SegmentTypeConjunct.segment_type_data;
    }
    this.Repaint = Repaint;
    function Repaint() {
        var segment_type_data = SegmentTypeConjunct.segment_type_data;
        var paint_segment_type = new PaintSegmentType();
        paint_segment_type.Initialize(segment_type_data);
        paint_segment_type.Show();
        paint_segment_type.Paint();

    }

    // Private member ---------------------------------------------------------
    function ButtonListener() {
        $("button.segment_type_modify").bind("click", SettingInitialize);
        $("div.segment_type_setting.end button").bind("click", SettingEnd);
    }

    function SettingInitialize() {
        // Animate button
        $("div.segment_type_setting.start").animate({left:'800px',opacity:0}, 2000);
        $("div.segment_type_setting.end").fadeIn(3000);
        $("div.segment_type").css('display', 'none');
        // Initialize is-first-setting array
        SegmentTypeConjunct.is_first_setting = [];
        for (var array_index = 0; array_index <= 20; ++array_index) {
            SegmentTypeConjunct.is_first_setting[array_index] = true;
        }
        console.log("segment type setting start ??");
        var domain_list = $("ul.segment_type_modify");
        domain_list.empty();
        for (var type_index = 1; type_index < 21; ++type_index) {
            var span = document.createElement("div");
            span.innerHTML = "型態 " + type_index;
            if (type_index >= 1 && type_index <= 7) span.style.color = get_color(type_index);
            if (type_index > 7 ) span.style.color = get_color(type_index);
            var li = document.createElement("li").appendChild(span);
            domain_list.append(li);
        }
        // Event of draggable button.
        domain_list.find("div").draggable({
            revert: function(event, ui) {
                $(this).originalPosition = {
                    top : 0,
                    left : 0
                };
                return true;
            }
        });
        // Remove plan table that be existed.
        RefreshPlanTable();
        function RefreshPlanTable() {
            console.log("Plan table be removed.");
//            $("#plan_table").find("select.phase_list").empty();
            HideTableAll();
            function HideTableAll() {
                for (var table_index = 0; table_index < 32; table_index++) {
                    var table_id = '#timing_plan_table' + (table_index + 1);
                    var domain = $(table_id);
                    if (domain.length == 0) continue;
                    domain.css("display", "none");
                }
            }
        }
    }

    function SettingEnd() {
//      $("div.segment_type_setting.start").css('opacity', '100');
        $("div.segment_type_setting.start").animate({left:'0px',opacity:100}, 2000);
        $("div.segment_type_setting.end").fadeOut(2000);
        $("div.segment_type_setting ul").empty();
        $("div.segment_type").css('display', '');
    }

    function CalendarDroppable() {
        $("div.calendar table td").droppable({
            drop: function(event, ui) {
                var calendar_date = $(this).find("div").attr("date");
                var date_type = $(this).attr("class").split(' ')[1];
                console.log("Date: ", calendar_date, "Type: ", date_type);
                var segment_index = event.toElement.innerHTML.split(" ")[1];
                var segment_name = get_segment_type_name(date_type);
                console.log("index: ", segment_index, "name: ", segment_name);
                DataConjunct(segment_index, segment_name, calendar_date);
            }
        });
    }
    function DataConjunct(segment_index, segment_name, calendar_date) {
        var segment_type_data = SegmentTypeConjunct.segment_type_data;

        if (segment_index <= 7) {
            segment_type_data[segment_name] = segment_index;
        } else {
            var type_index = segment_index - 7;
            var name_start = 'spc' + type_index + '_startdate';
            var name_end = 'spc' + type_index + '_enddate';
            if (SegmentTypeConjunct.is_first_setting[segment_index]) {
                segment_type_data[name_start] = calendar_date;
                segment_type_data[name_end] = calendar_date;
                SegmentTypeConjunct.is_first_setting[segment_index] = false;
            } else {
                var date_value = calendar_date.split('-');
                var date_start = segment_type_data[name_start].split('-');
                var is_smaller = false;
                console.log("compare: ", date_value, " and ", date_start);
                for (var compare_index = 0; compare_index < 3; ++compare_index) {
                    console.log("compare detail: ", parseInt(date_start[compare_index]), " and ", parseInt(date_value[compare_index]));

//                if (parseInt(date_start[compare_index]) > parseInt(date_value[compare_index])) {
                    if (parseInt(date_start[compare_index]) < parseInt(date_value[compare_index])) {
                        is_smaller = true;
                        break;
                    }
                }
                console.log("is smaller: ", is_smaller);
                if (is_smaller) segment_type_data[name_end] = calendar_date;
                else segment_type_data[name_start] = calendar_date;

                console.log("segment conjunct ", segment_type_data[name_start], " ", segment_type_data[name_end]);

            }


        }
      RepaintData();

    }
    function RepaintData() {
        var segment_type_data = SegmentTypeConjunct.segment_type_data;
        var paint_segment_type = new PaintSegmentType();
        paint_segment_type.Initialize(segment_type_data);
        paint_segment_type.Show();
        paint_segment_type.Paint();
        var segment_type_event = new SegmentTypeEvent();
        segment_type_event.ReListenButton();
    }

    function get_color(index) {
        var color_set = [];
        color_set[0] = "#9933FF"; // For special day.
        color_set[1] = "#000000"; // First normal day.
        color_set[2] = "#FF0000";
        color_set[3] = "#00FF00";
        color_set[4] = "#FF9900";
        color_set[5] = "#FF00FF";
        color_set[6] = "#00FFFF";
        color_set[7] = "#800000";
        if (index > 7) return "#9933FF";
        return color_set[index];
    }
    function DataConstruct() {
        var segment_type_data = new Object;
        var week_days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat",
            "even_sun", "even_mon", "even_tue", "even_wed", "even_thu", "even_fri", "even_sat"];
        for (var day_index = 0; day_index < week_days.length; ++day_index) {
            segment_type_data[week_days[day_index]] = 1;
        }
        for (var type_index = 1; type_index <= 13; ++type_index) {
            var name_start = 'spc' + type_index + '_startdate';
            var name_end = 'spc' + type_index + '_enddate';
            segment_type_data[name_start] = "2014-01-01";
            segment_type_data[name_end] = "2014-01-01";
        }
        return segment_type_data;
    }

    function get_segment_type_name(index) {
        var name_array = [];
        var array_index = 0;
        var week_days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat",
            "even_sun", "even_mon", "even_tue", "even_wed", "even_thu", "even_fri", "even_sat"];
        for (var day_index = 0; day_index < week_days.length; ++day_index) {
            name_array[array_index++] = week_days[day_index];
        }
        for (var type_index = 1; type_index <= 13; ++type_index) {
            var name_start = 'spc' + type_index + '_startdate';
            var name_end = 'spc' + type_index + '_enddate';
            name_array[array_index++] = name_start;
            name_array[array_index++] = name_end;
        }
//      return name_array.indexOf(name);
        return name_array[index];

    }
    function AddSpecialDayNumber(input_data) {
        for (var type_index = 1; type_index <= 13; ++type_index) {
            var name_start = 'spc' + type_index;
            input_data[name_start] = type_index + 7;
        }
    }
}

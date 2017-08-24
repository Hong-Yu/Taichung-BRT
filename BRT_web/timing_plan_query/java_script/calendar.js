/**
 * Created by hong on 2014/6/9.
 */
function Calendar() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        this.calendar_data = new Object();
//        MonthListener(this.calendar_data);
        var current_year = (new Date).getFullYear();
        var current_month = (new Date).getMonth() + 1;
        this.calendar_data.year = current_year;
        this.calendar_data.month = current_month;
        var calendar_data = this.calendar_data;
        setTimeout(function() {
            // Do something after 5 seconds
            CalendarElement(current_year, current_month, calendar_data);

        }, 200);
    }
    this.set_segment_class = set_segment_class;
    function set_segment_class(segment_class) {
        this.segment_class = segment_class;
    }
    this.Listener = Listener;
    function Listener() {
        MonthListener(this.calendar_data, this.segment_class);


    }
// Private member ----------------------------------------------------------
    function MonthListener(calendar_data, segment_class) {
        var segment_type_event = new SegmentTypeEvent();
        $("#table_calendar").find('td').append($('<div></div>'));
        $("#table_calendar").find('th.cleft').click(function(e){
            MonthMove(calendar_data, "decrease");
            CalendarElement(calendar_data.year, calendar_data.month, calendar_data)
            segment_class.Repaint();
//            calendar_data.paint_segment_type.PaintCalendar();
            //

           segment_type_event.ReListenCalendar();
        });
        $("#table_calendar").find('th.cright').click(function(e){
            MonthMove(calendar_data, "increase");
            CalendarElement(calendar_data.year, calendar_data.month, calendar_data);
//            calendar_data.paint_segment_type.PaintCalendar();
            segment_class.Repaint();
            segment_type_event.ReListenCalendar();
        });

    }

    function CalendarElement(year, month, calendar_data) {
        console.log("Paint day of calendar why?: ", year, " ", month, " ", JSON.stringify(calendar_data));
        var cell_index = 0;
        function TableCellNumber (element_set, year, month) {
            var cal=getYearFirstDate(year, month, 1);
            var day=1;
            for (var i = 0; i < element_set.length; i++){
                if (day > cal.monthDays) break;
                if ($(element_set[i]).parent().attr('class').split(' ')[0] != 'd'+cal.firstDay && day == 1) { continue; }
                $(element_set[i])
                    .attr('date', year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0'+ day : day) )
                    .attr('index', cell_index)
                    .text(day);
                day += 1;
                cell_index += 1;
            }
        }
        var element_set=$('table.scalendar.sc1').find('td').find('div').empty().attr('date','').attr('index','').attr('class', 'segment_type_content').css('padding','0px').css('position','relative');
        TableCellNumber (element_set, year, month);
        $('table.scalendar.sc1').find('th.theader').text(year+'-'+( month<10 ? '0'+month : month) );
        var month_next = ( month+1 > 12 ? month+1-12 : month+1 );
        var year_next = ( month+1 > 12 ? year+1 : year );
        element_set=$('table.scalendar.sc2').find('td').find('div').empty().attr('date','').attr('index','').attr('class', 'segment_type_content').css('padding','0px').css('position','relative');
        TableCellNumber (element_set, year_next, month_next);

        $('table.scalendar.sc2').find('th.theader').text(year_next+'-'+(month_next<10 ? '0'+month_next : month_next));
        // 紀錄 flag, 之後要用來操作用
//        calendar_data = { year:year, month:month };
        calendar_data.year = year;
        calendar_data.month = month;
        console.log("element length: ", element_set.length);
    }

    // Calculate month move
    function MonthMove(data, type) {
        switch (type) {
            case "increase" :
                data.month += 1;
                if (data.month >= 13){
                    data.month = 1;
                    data.year += 1;
                }
                break;
            case "decrease" :
                data.month -= 1;
                if (data.month <= 0){
                    data.month = 12;
                    data.year -= 1;
                }
                break;
        }
    }

}




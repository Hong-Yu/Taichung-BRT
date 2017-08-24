/**
 * Created by hong on 2014/3/3.
 */
var segment_type_listener = new Object();
function SegmentTypeEvent() {
    // Public member ----------------------------------------------------------
    this.Listen = Listen;
    function Listen() {
        CalendarEvent();
        ButtonEvent();
        ListenResetButton();
    }
    this.ReListenCalendar = ReListenCalendar;
    function ReListenCalendar() {
        $('table.scalendar td div').unbind('mouseup'); // remove mouse-up listener.
        CalendarEvent();
    }
    this.ReListenButton = ReListenButton;
    function ReListenButton() {
        $('ul.segtype_tab li').unbind('mouseup'); // remove mouse-up listener.
        ButtonEvent();
    }
    this.set_plan_inserter = set_plan_inserter;
    function set_plan_inserter(plan_inserter) {
        segment_type_listener.plan_inserter = plan_inserter;

    }
    // Private member ---------------------------------------------------------
    // Declare event listener function.
    function CalendarEvent() {
        $('table.scalendar td div:not([date=])').mouseup(function(element) {
            // Avoid doubly trigger
            var cell_set = $('table.scalendar td div:not([date=])');
            console.log(cell_set.length);
            var target = $(element.currentTarget);
            cell_set.find('div.active').remove();
            target.append(
                $('<div class="active"></div>').css({
                    width:'100%',
                    height:'100%',
                    backgroundColor:'#3399FF',
                    position:'absolute',
                    top:0,
                    left:0,
                    opacity:0.5
                }).attr('selected12','yes')
            );
//            $('#centerview').find('table.table.mainbody>tbody').empty();
            var date = $(element.currentTarget).attr('date');
            var crossroad = $(".crossroad option:selected").text();
            var segment_type = $(element.currentTarget).parent().attr("segment_type");
            console.log(segment_type);
            PaintButtonBackground(segment_type);
        } );
    }
    function ButtonEvent() {
        $('ul.segtype_tab li').mouseup(function(element){
            $('table.scalendar td div:not([date=])').find('div.active').remove();
            var segment_type = $(element.currentTarget).find("a").attr("segment_type");
            PaintButtonBackground(segment_type);
//            console.log($(this));
        });
    }
    function PaintButtonBackground(segment_type) {
        $('ul.segtype_tab li').find("a").css("backgroundColor", "#ffffff");
        var find_text = "a[segment_type=" + segment_type + "]";
        var target = $("ul.segtype_tab li").find(find_text);
        console.log(target);
        target.css({
            backgroundColor:'#70B8FF'
        });
        // Change expression of upload button

        var domain_upload_tc = $("button.timing_plan_upload[destination='tc']");
        var button_statement = '下傳 型態'+ segment_type +' 至控制器'
        domain_upload_tc.text(button_statement);

        // Add active attribute to convenient upload listener to check which segment type should send.
        // 1. remove active attribute that before constructed by.
        $('ul.segtype_tab li').find("a").attr("active", "false");
        target.attr("active", "true");
        // End -- add active attribute.
        TriggerInserter(segment_type);

    }
    function ListenResetButton() {
        var domain = $("span.icon-repeat.reset_button");
        domain.click(function(){
            var segment_type = GetCurrentSegmentType();
            TriggerInserter(segment_type);
        });

    }
    this.TriggerInserter = TriggerInserter;
    function TriggerInserter(segment_type) {
        var synchronize = new PlanSynchronize();
        synchronize.Unbind();
        // Insert
        if (typeof segment_type_listener.plan_inserter !== 'undefined');
        segment_type_listener.plan_inserter.Insert(segment_type);
        //
        synchronize.set_plan_insert(segment_type_listener.plan_inserter);
        synchronize.Synchronize();
    }

    this.GetCurrentSegmentType = GetCurrentSegmentType;
    function GetCurrentSegmentType() {
        var segment_type;
        var target;
        var button_set = $('ul.segtype_tab li').find("a");
        for (var button_index = 0; button_index < button_set.length; ++button_index) {
            target = $(button_set[button_index]);
            if ( target.attr("active") ==  "true") {
                segment_type = target.attr("segment_type");
                return segment_type;
            }
        }
        return -1;
    }

}
/**
 * Created by hong on 2014/3/3.
 */
function SegmentTypeEvent() {
    // Public member ----------------------------------------------------------
    this.Listen = Listen;
    function Listen(web_socket) {
        this.ListenCalendar(web_socket);
        this.ListenButton(web_socket);
    }
    this.ListenCalendar = ListenCalendar;
    function ListenCalendar(web_socket) {
        this.CalendarEvent(web_socket);
    }
    this.ListenButton = ListenButton;
    function ListenButton(web_socket) {
        this.ButtonEvent(web_socket);
    }
    // Declare event listener function.
    this.CalendarEvent = CalendarEvent;
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
                    backgroundColor:'#EFEFEF',
                    position:'absolute',
                    top:0,
                    left:0,
                    opacity:0.5
                }).attr('selected12','yes')
            );
            var date = $(element.currentTarget).attr('date');
            var crossroad = $(".crossroad option:selected").text();
            var segment_type = $(element.currentTarget).parent().attr("segment_type");
            console.log(segment_type);
            PaintButtonBackground(segment_type);
        } );
    }
    this.ButtonEvent = ButtonEvent;
    function ButtonEvent(web_socket) { // listen segtype button
        $('ul.segtype_tab li').mouseup(function(element){
            $('table.scalendar td div:not([date=])').find('div.active').remove();
            var segment_type = parseInt($(element.currentTarget).find("a").attr("segment_type"));
            var domain_select = $("select.intersection").find("option:selected");
            var int_id = parseInt(domain_select.attr("mark"));
       // Add active attribute to convenient upload listener to check which segment type should send.
       // 1. remove active attribute that before constructed by.
            PaintButtonBackground(segment_type);
       // 2-1. reset std plan collector
            StdPlanMethod.resetter();
            StdPlanBySegMethod.resetter();
       // 2-2. query priority data from tc (BF42) first
            RequestTodData(int_id, segment_type, web_socket);
        });
    }
    this.PaintButtonBackground = PaintButtonBackground;
    function PaintButtonBackground(segment_type) {
        $('ul.segtype_tab li').find("a").css("backgroundColor", "#ffffff");
        var find_text = "a[segment_type=" + segment_type + "]";
        var target = $("ul.segtype_tab li").find(find_text);
        // console.log(target);
        target.css({
            backgroundColor:'#EFEFEF'
        });

       $('ul.segtype_tab li').find("a").attr("active", "false");
       target.attr("active", "true");
    }

    function RequestTodData(int_id, segment_type, web_socket){
     var data_from = $('#data_from_form :input[name="data_from"]:checked').val();
         console.log(data_from);
         if(data_from === 'TC'){
          QueryBF42(int_id, segment_type, web_socket);
         }else if(data_from === 'DB'){
           RequestTod(int_id, segment_type, web_socket);
         }
      // RequestTod(int_id, segment_type, web_socket);
      function QueryBF42(int_id, segment_type, web_socket) { // query priority switch
        var query_json={};
        query_json.FunctionNo ='BF';
        query_json.MsgTypeNo ='42';
        query_json.LCN =int_id;
        query_json.MsgTime =TimeCreate.get_date_time();
        query_json.SegmentType =segment_type;
        console.log(query_json);
        web_socket.Send(query_json);
      }
      function RequestTod(int_id, segment_type, web_socket){
        var json_data={};
        json_data.FunctionNo ='request';
        json_data.MsgTypeNo ='todplan';
        json_data.LCN =int_id;
        json_data.SegmentType =segment_type;
        // var json = JSON.stringify(json_data);
        console.log(json_data);
        web_socket.Send(json_data);
      }
      $('#progress_plan').attr('style', 'width: 20%');
        CheckTimeout();

      function CheckTimeout(){
       setTimeout(function (){
           var success_count =$('#progress_seg')[0].attributes[6].value;
           if(success_count === 'width: 20%'){
            $('.progress').hide();
            $('#connect_fail').show();
               console.log('Time out: web socket');
           }else{}
       }, 90000);
      }
    }
}
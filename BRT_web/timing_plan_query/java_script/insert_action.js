/**
 * Created by CCT on 2014/3/4.
 */

function InsertAction() {
   this.Insert = Insert;
   function Insert(input_data, web_socket) {
      var domain_select = $("select.intersection").find("option:selected");
      var int_id = domain_select.attr("mark");
      var seg_selected = $('li a[active="true"]')[0].attributes.segment_type.value;
      var seg = parseInt(seg_selected);
      var lcn = parseInt(int_id);
      console.log(lcn+' '+seg);
      if(input_data.LCN === lcn && input_data.SegmentType === seg){
         for(var tod_index=0; tod_index < input_data.todList.length; ++tod_index){
            var current_tod = input_data.todList[tod_index];
            this.FillSpecificContent(tod_index, current_tod, web_socket);
         }
      }else{
         console.log('wrong container.');
      }
   }
   this.InsertTable = InsertTable;
   function InsertTable(result_content, web_socket){
      present_std_data(result_content, web_socket);
      // switch(data_type){
      //    case 'priorityplan':
      //       show_priorityplan(result_content);
      //       break;
      //    case 'stdplan':
      //       show_std(result_content);
      //       break;
      //    case 'phase':
      //       show_phase(result_content);
      //       break;
      //    default:
      //       break;
      // }
   }

   this.FillSpecificContent = FillSpecificContent;
   function FillSpecificContent(tod_index, tod_data, web_socket) {
      var domain_table_body = $('#plan_table');
      var str_tbody = '';
      str_tbody += '<tr mark="'+tod_data.plan_id+'">';
      if(tod_data.priority_switch ===1){
         str_tbody += '<td style="text-align:center;"><span class="label label-danger" style="font-size:12pt;font-weight:bold;">優</span></td>';
      }else if(tod_data.priority_switch ===0){
         str_tbody += '<td style="text-align:center;"><span class="label label-warning" style="font-size:12pt;font-weight:bold;">定</span></td>';
      }else{
         console.log('priority_switch is undefined: '+tod_data.priority_switch);
         str_tbody += '<td style="text-align:center;"><span class="label label-inverse" style="font-size:12pt;font-weight:bold;">無</span></td>';
      }
      str_tbody += '<td style="text-align:center;"><span class="btn btn-default" style="cursor:default;"><span class="glyphicon glyphicon-time"> '+tod_data.begin_time+'</span></td>';
      str_tbody += '<td style="text-align:center;"><span class="btn btn-info span_planid" title="查詢計畫內容" mark="'+tod_data.plan_id+'">'+tod_data.plan_id+'</span></td>';
      str_tbody += '<td id="td_phase" style="text-align:center;"> </td><td id="td_plan" style="padding:0px;"></td>';
      str_tbody += '</tr>';
      domain_table_body.append(str_tbody);
      var domain_tod_planid =$('tbody#plan_table tr td span.span_planid')[tod_index];
      domain_tod_planid.onclick = function () {

var data_from = $('#data_from_form :input[name="data_from"]:checked').val();
         console.log(data_from);
         $('.progress').show();
         $('#progress_plan').attr('style', 'width: 20%');
         // console.log(this);
         var mark = this.attributes.mark.value;
         var planid = parseInt(mark);
         var domain_select = $("select.intersection").find("option:selected");
         var int_id = domain_select.attr("mark");
         if(data_from === 'TC'){
         var query_plan_data = {};
         query_plan_data.FunctionNo = 'query';
         query_plan_data.MsgTypeNo = 'plan';
         query_plan_data.LCN = int_id;
         query_plan_data.plan_id = planid;
         // var data_json = JSON.stringify(query_plan_data);
         // console.log(data_json);
         web_socket.Send(query_plan_data); //**************
         var domain_td_phase = $('tr[mark ="'+planid+'"] td#td_phase');
         domain_td_phase.empty();
         var domain_td_plan = $('tr[mark ="'+planid+'"] td#td_plan');
         domain_td_plan.empty();
      QueryBF43(int_id, planid, web_socket);
      }else if(data_from === 'DB'){
         var request_stddata={};
        request_stddata.FunctionNo = 'request';
        request_stddata.MsgTypeNo = 'stddata_db';
        request_stddata.LCN = int_id;
        request_stddata.plan_id = planid;
       // request_stddata.phase_no = input_data.phase_no;
           web_socket.Send(request_stddata);
         var request_controldata={};
        request_controldata.FunctionNo = 'request';
        request_controldata.MsgTypeNo = 'controldata';
        request_controldata.LCN = int_id;
        request_controldata.priority_id = planid;
           web_socket.Send(request_controldata);
         }
      StdPlanMethod.resetter();
      function QueryBF43(int_id, planid, web_socket) { // query priority switch
        var query_json={};
        query_json.FunctionNo ='BF';
        query_json.MsgTypeNo ='43';
        query_json.LCN =int_id;
        query_json.PlanID = planid;
        query_json.MsgTime =TimeCreate.get_date_time();
        console.log(query_json);
        web_socket.Send(query_json);
      }
      };
   }

   function show_phase(result_content){
      $('.progress').hide();
      $('#progress_plan').attr('style', 'width: 0%');
      var plan_id = result_content.plan_id;
      var domain_td_phase = $('tr[mark ="'+plan_id+'"] td#td_phase');
      // domain_td_phase.empty();
      var str_td_phase = '';
      str_td_phase += '<button class="btn btn-default" title="分相數: '+result_content.phase_total+' 步階數: '+result_content.phase_step+'" style="cursor:default;">'+result_content.phase_no+' '+result_content.phase_name+'</button>';
      // str_td_phase += '<hr>分相數: '+result_content.phase_total+' 步階數: '+result_content.phase_step;
      domain_td_phase.append(str_td_phase);
   }

   function show_plan(result_content){
      var plan_id = result_content.plan_id;
      var domain_td_plan = $('tr[mark ="'+plan_id+'"] td#td_plan');
      var str_td_std ='';
      str_td_std += '<table style="width:100%; height:100%; margin:0px; font-weight:bold; text-align:center;"><thead><tr style="color: #DC0031; text-align:center;"><th class="display-btn"><span class="glyphicon glyphicon-list" style="color:black;cursor:pointer;" onclick="StdUIMethod.UnFold('+plan_id+', this)"></th>';
      str_td_std += '<th>分相</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>週期</th><th>時差</th></tr>';
      str_td_std += '<tr style="color: #008CC2; text-align:center;"><th colspan="2">秒數</th>';
      for(var total=1; total<9; ++total){
         if(total ===7){
            str_td_std += '<th>'+result_content.cycletime+'</th>';
         }else if(total ===8){
            str_td_std += '<th>'+result_content.time_offset+'</th>';
         }else{
            var red = 'allred'+total;
            var yellow = 'yellow'+total;
            var green = 'g'+total;
            var total_second = result_content[red] + result_content[yellow] + result_content[green];
            str_td_std += '<th>'+total_second+'</th>';
         }
      }
      str_td_std +='</tr></thead><tbody></tbody></table>';
      domain_td_plan.append(str_td_std);
   }

   function present_std_data(input_data, web_socket){
      $('.progress').hide();
      $('#progress_plan').attr('style', 'width: 0%');
      show_phase(input_data.phase);
      show_plan(input_data.stdplan);

      // show_std(input_data.stdplan);
      // show_priorityplan(input_data.priorityplan);

   }
}

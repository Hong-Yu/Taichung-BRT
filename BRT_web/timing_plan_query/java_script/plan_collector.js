/**
 * Created by hong on 2014/3/6.
 */

var StdPlanCollector = {
};

var StdPlanMethod = {
   setter: function(type, input){
      StdPlanCollector[type] = input;
   },
   getter: function() {
      return StdPlanCollector;
   },
   resetter: function(){
      for(p in StdPlanCollector){
         delete StdPlanCollector[p];
      }
      // StdPlanCollector = {};
   }
};

var StdPlanBySeg = [];
var StdPlanBySegMethod = {
   setter: function(plan_id, input){
      StdPlanBySeg[plan_id] = {};
      StdPlanBySeg[plan_id] = input;
   },
   getter: function(plan_id){
      return StdPlanBySeg[plan_id];
   },
   resetter: function() {
      StdPlanBySeg.length = 0; // clear array
   }
};

var StdUIMethod = {
   UnFold: function(id, th){
      var tbody = $(th).parent().parent().parent().parent().children('tbody');
      console.log(tbody);
      // tbody.empty();
      var str_tbody = '';
      var std_detail = StdPlanBySeg[id].stdplan;
      str_tbody += show_std(std_detail);
      var priority_data = StdPlanBySeg[id].priorityplan;
      str_tbody += show_priorityplan(priority_data);
      tbody.append(str_tbody);
      var icon = $(th).parent();
      icon.empty();
      icon.append('<span class="glyphicon glyphicon-minus" style="color:black;cursor:pointer;" onclick="StdUIMethod.Fold('+id+', this)">');
   },
   Fold: function(id, th){
      console.log(id);
      var tbody = $(th).parent().parent().parent().parent().children('tbody');
      console.log(tbody);
      tbody.empty();
      var icon = $(th).parent();
      icon.empty();
      icon.append('<span class="glyphicon glyphicon-list" style="color:black;cursor:pointer;" onclick="StdUIMethod.UnFold('+id+', this)">');
   }
};


   function show_std(result_content){
      var str_td_std_detail = '';
      var col_name = ['allred', 'g', 'yellow', 'pred', 'pgflash', 'ming', 'maxg'];
      var col_string = ['紅', '綠', '黃', '行人紅', '行綠閃', '最小綠', '最大綠'];
      for(var col_index=0; col_index<7; ++col_index){
         var pr_prefix = col_name[col_index];
         str_td_std_detail +='<tr style="color: #008080;"><th colspan="2">'+col_string[col_index]+'</th>';
         for(var std_index=0; std_index<6; ++std_index){
            var pr_name = pr_prefix + (std_index+1);
            str_td_std_detail += '<td>'+result_content[pr_name]+'</td>';
         }
         str_td_std_detail += '</tr>';
      }
      return str_td_std_detail;
   }

   function show_priorityplan(result_content){
      // var plan_id = result_content.priority_id;
      // var domain_td_plan = $('tr[mark ="'+plan_id+'"] td#td_plan');
      var str_td_std_prior ='';
      var col_name = ['past_east', 'past_west', 'percentage_east', 'percentage_west'];
      var col_string = ['通行 東向', '通行 西向', '折減比例 東向', '折減比例 西向'];
      var past_east = result_content.past_east.split("").reverse().join("");
      var new_past_east ='';
      if(past_east.length !==6){ // 轉換通行的六位數代表意思
         var num = (6 - past_east.length);
         var z = '';
         for(var i=0; i<num; ++i){
            z+='0';
         }
         new_past_east = past_east.concat("", z);
      }
      var past_west = result_content.past_west.split("").reverse().join("");
      var new_past_west ='';
      if(past_west.length !==6){ // 轉換通行的六位數代表意思
         var num = (6 - past_west.length);
         var z = '';
         for(var i=0; i<num; ++i){
            z+='0';
         }
         new_past_west = past_west.concat("", z);
      }

      for(var col_index=0; col_index<4; ++col_index){
         var pr_prefix = col_name[col_index];
         str_td_std_prior +='<tr style="color: #882AFF;"><th colspan="2">'+col_string[col_index]+'</th>';
         for(var std_index=0; std_index<6; ++std_index){
            if(col_index ===0){
               var bool = new_past_east.charAt(std_index);
               str_td_std_prior += (bool === '1' ? '<td>可行</td>' : '<td> - </td>');
            }else if(col_index ===1){
               var bool = new_past_west.charAt(std_index);
               str_td_std_prior += (bool === '1' ? '<td>可行</td>' : '<td> - </td>');
            }else{
               var pr_name = pr_prefix + (std_index+1);
               str_td_std_prior += '<td>'+result_content[pr_name]+'</td>';
            }
         }
         str_td_std_prior += '</tr>';
      }
      str_td_std_prior += '<tr><td colspan="2">車門觸動時間 上行: '+result_content.door_trigger_up+'</td>';
      str_td_std_prior += '<td colspan="2">車門觸動時間 下行: '+result_content.door_trigger_down+'</td>';
      str_td_std_prior += '<td colspan="2">落後班距 上行: '+result_content.headway_up+'</td>';
      str_td_std_prior += '<td colspan="2">落後班距 下行: '+result_content.headway_down+'</td>';
      str_td_std_prior += '<td colspan="2">低速門檻值: '+result_content.lowspeed+'</td>';
      str_td_std_prior += '</tr>';
      return str_td_std_prior;
   }



// function PlanTableCollector() {
//    // Public member ----------------------------------------------------------
//    this.Day = Day;
//    function Day() {
//       return this.CollectDay();
//    }
//    this.PlanSet = PlanSet;
//    function PlanSet() {
//       return this.CollectPlanSet();
//    }
//    this.PlanSpecific = PlanSpecific;
//    function PlanSpecific(table_index) {
//       return this.CollectPlanSpecific(table_index);
//    }
//    this.PrioritySet = PrioritySet;
//    function PrioritySet() {
//       return this.CollectPrioritySet();
//    }
//    this.PrioritySpecific = PrioritySpecific;
//    function PrioritySpecific(table_index) {
//       return this.CollectPrioritySpecific(table_index);
//    }

//    // Private member ---------------------------------------------------------
//    this.CollectDay = CollectDay;
//    function CollectDay() {
//       var result = [];
//       var result_index = 0;
//       // Define plan constructor function in order to create custom Plan() object later.
//       var Plan = function(priority_switch, begin_time, car_countdown, ped_countdown, plan_id, priority_id) {
//          this.priority_switch = priority_switch;
//          this.begin_time = begin_time;
//          this.car_countdown = car_countdown;
//          this.ped_countdown = ped_countdown;
//          this.plan_id = plan_id;
//          this.priority_id = priority_id;
//       }
//       for (var table_index = 0; table_index < 12; table_index++) {
//          var table_id = '#timing_plan_table' + (table_index + 1);
//          var domain = $(table_id);
//          if (domain.css("display") == 'none') continue; // Avoid table which on hind mode.
//          var priority_switch = domain.find("span.priority_switch").attr("value");
//          var domain_time = $(table_id).find('div.bootstrap-timepicker>input');
// //         console.log(domain_time);
//          var begin_time = domain_time.data("timepicker").getTime();
//          var car_countdown = domain.find("div.car_countdown").find(":selected").attr("value");;
//          var ped_countdown = domain.find("div.ped_countdown").find(":selected").attr("value");;
//          var plan_id = this.ExtractUnit(domain, 0);
//          // priority id follow plan id
//          var priority_id = plan_id;
//          result[result_index++] = new Plan(priority_switch, begin_time, car_countdown, ped_countdown, plan_id, priority_id);
//       }
// //       console.log(result);
//       return result;
//    }
//    this.CollectPlanSet = CollectPlanSet;
//    function CollectPlanSet() {
//       var result = [];
//       // Extract plan type information from plan table.
//       var plan_type_set = [];
//       for (var table_index = 0; table_index < 12; table_index++) {
//          var table_id = '#timing_plan_table' + (table_index + 1);
//          var domain = $(table_id);
//          if (domain.css("display") == 'none') continue; // Avoid table which on hind mode.
//          plan_type_set[table_index] = this.ExtractUnit(domain, 0);
//       }
//       // Copy
//       var unique_type_set = plan_type_set.slice(0);
//       // Remove identical value from plan type set.
//       this.UniqueElement(unique_type_set);
// //      console.log("plan type set = " + unique_type_set);
//       // Find table index which has plan type correspond with unique element.
//       var table_index_set = [];
//       var set_index = 0;
//       for (var unique_index = 0; unique_index < unique_type_set.length; unique_index++) {
//          for (var table_index = 0; table_index < plan_type_set.length; table_index++) {
//             if (unique_type_set[unique_index] == plan_type_set[table_index]){
//                table_index_set[set_index++] = table_index;
//                break;
//             }
//          }
//       }
//       for (var set_index = 0; set_index < table_index_set.length; set_index++) {
//          var table_index = table_index_set[set_index];
//          result[set_index] = this.CollectPlanSpecific(table_index);
//       }
//       return result;
//    }

//    this.CollectPlanSpecific = CollectPlanSpecific;
//    function CollectPlanSpecific(table_index) {
//       var result;
//       // Define plan constructor function in order to create custom Plan() object later.
//       var Plan = function(plan_id, phase_index, phase_no, phase_total, cycle, offset, red, yellow, green, green_p, green_p_flash, green_min, green_max) {
//          this.plan_id = plan_id;
//          this.phase_index = phase_index;
//          this.phase_no = phase_no;
//          this.phase_total = phase_total;
//          this.cycle = cycle;
//          this.offset = offset;
//          this.red = red;
//          this.yellow = yellow;
//          this.green = green;
//          this.green_p = green_p;
//          this.green_p_flash = green_p_flash;
//          this.green_min = green_min;
//          this.green_max = green_max;
//       };
//       var table_id = '#timing_plan_table' + (table_index + 1);
//       var domain = $(table_id);
//       var plan_id = this.ExtractUnit(domain, 0);
//       var phase_index = domain.find(":selected").attr("index");
//       var phase_no = domain.find(":selected").attr("no");
//       var phase_total = domain.find(":selected").attr("total");
//       var red           = this.ExtractSequence(domain, 9, 14);
//       var green         = this.ExtractSequence(domain, 15, 20);
//       var yellow        = this.ExtractSequence(domain, 21, 26);
//       var green_p       = this.ExtractSequence(domain, 27, 32);
//       var green_p_flash = this.ExtractSequence(domain, 33, 38);
//       var green_min     = this.ExtractSequence(domain, 39, 44);
//       var green_max     = this.ExtractSequence(domain, 45, 50);
//       var cycle = this.ExtractUnit(domain, 7);
//       var offset = this.ExtractUnit(domain, 8);
//       result = new Plan(plan_id, phase_index, phase_no, phase_total, cycle, offset, red, yellow, green, green_p, green_p_flash, green_min, green_max);
//       return result;
//    }

//    this.CollectPrioritySet = CollectPrioritySet;
//    function CollectPrioritySet() {
//       var result = [];
//       var table_index_set = this.ClassifyTableByPlan();
//       for (var set_index = 0; set_index < table_index_set.length; set_index++) {
//          var table_index = table_index_set[set_index];
//          result[set_index] = this.CollectPrioritySpecific(table_index);
//       }
//       return result;

//    }
//    this.CollectPrioritySpecific = CollectPrioritySpecific;
//    function CollectPrioritySpecific(table_index) {
//       var result;
//       // Define plan constructor function in order to create custom Structure() object later.
//       var Structure = function (priority_id, past_east, past_west, percentage_east, percentage_west, door_trigger_up, door_trigger_down, headway_up, headway_down, lowspeed) {
//          this.priority_id = priority_id;
//          this.past_east = past_east;
//          this.past_west = past_west;
//          this.percentage_east = percentage_east;
//          this.percentage_west = percentage_west;
//          this.door_trigger_up = door_trigger_up;
//          this.door_trigger_down = door_trigger_down;
//          this.headway_up = headway_up;
//          this.headway_down = headway_down;
//          this.lowspeed = lowspeed;
//       };

//       var table_id = '#timing_plan_table' + (table_index + 1);
//       var domain = $(table_id);
//       var priority_id = this.ExtractUnit(domain, 0);
//       var past_east = this.ExtractCheckbox(domain, "pass_east");
//       var past_west = this.ExtractCheckbox(domain, "pass_west");
//       var percentage_east = this.ExtractSequence(domain, 51, 56);
//       var percentage_west = this.ExtractSequence(domain, 57, 62);
//       var door_trigger_up = this.ExtractUnit(domain, 63);
//       var door_trigger_down = this.ExtractUnit(domain, 64);
//       var headway_up = this.ExtractUnit(domain, 65);
//       var headway_down = this.ExtractUnit(domain, 66);
//       var lowspeed = this.ExtractUnit(domain, 67);
//       result = new Structure(priority_id, past_east, past_west, percentage_east, percentage_west, door_trigger_up, door_trigger_down, headway_up, headway_down, lowspeed);
//       return result;
//    }
//    this.ExtractUnit = ExtractUnit;
//    function ExtractUnit(domain, index) {
//       var text_fine = "input[type=number]:eq(" + index + ")";
//       return domain.find(text_fine).val();
//    }
//    this.ExtractSequence = ExtractSequence;
//    function ExtractSequence(domain, start, end) {
//       var array = [];
//       var array_index = 0;
//       for (var index = start; index <= end; index++) {
//          var text_fine = "input[type=number]:eq(" + index + ")";
//          array[array_index++] = domain.find(text_fine).val();
//       }
//       return array.slice(0);
//    }
//    this.ExtractCheckbox = ExtractCheckbox;
//    function ExtractCheckbox(domain, label) {
//       var array = [];
//       for (var index = 0; index < 6; index++) {
//          var text_find = 'tr.' + label + " input[type=checkbox]:eq("+ index +")";
//          var checked = $(domain).find(text_find).prop('checked');
//          array[index] = checked;
//       }
//       return array;
//    }
//    // Return unique element from array.
//    this.UniqueElement = UniqueElement
//    function UniqueElement(array) {
//       array.sort();
//       var value = array[0];
//       for (var type_index = 1; type_index < array.length;) {
//          if (array[type_index] == value) {
//             array.splice(type_index, 1);
//             continue;
//          }
//          value = array[type_index];
//          ++type_index;
//       }
//       return array;
//    }
//    // Search all table to find how many plan type. return the table index
//    // that the distinct plan id first time used.
//    this.ClassifyTableByPlan = ClassifyTableByPlan;
//    function ClassifyTableByPlan() {
//       // Extract plan type information from plan table.
//       var plan_type_set = [];
//       for (var table_index = 0; table_index < 12; table_index++) {
//          var table_id = '#timing_plan_table' + (table_index + 1);
//          var domain = $(table_id);
//          if (domain.css("display") == 'none') continue; // Avoid table which on hind mode.
//          plan_type_set[table_index] = this.ExtractUnit(domain, 0);
//       }
//       // Copy
//       var unique_type_set = plan_type_set.slice(0);
//       // Remove identical value from plan type set.
//       this.UniqueElement(unique_type_set);
//       // Find table index which has plan type correspond with unique element.
//       var table_index_set = [];
//       var set_index = 0;
//       for (var unique_index = 0; unique_index < unique_type_set.length; unique_index++) {
//          for (var table_index = 0; table_index < plan_type_set.length; table_index++) {
//             if (unique_type_set[unique_index] == plan_type_set[table_index]){
//                table_index_set[set_index++] = table_index;
//                break;
//             }
//          }
//       }
//       return table_index_set;
//    }

// }

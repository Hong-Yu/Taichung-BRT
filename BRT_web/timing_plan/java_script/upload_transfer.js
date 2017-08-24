/**
 * Created by CCT on 2014/3/24.
 */

function TimingPlanUploadTransfer() {
   // Public member ----------------------------------------------------------
   this.Package = Package;
   function Package() {
      // Define plan constructor function in order to create custom Structure() object later.
      var Structure = function(FunctionNo, MsgTypeNo, day_segtype, tod_plan, std_plan, priority_control) {
         this.FunctionNo = FunctionNo;
         this.MsgTypeNo = MsgTypeNo;
         this.day_segtype = day_segtype;
         this.tod_plan = tod_plan;
         this.std_plan = std_plan;
         this.priority_control = priority_control;
      };
      var equipment_id = $("select.intersection").find("option:selected").attr("mark");;
//      console.log(web_socket);
      var day_segtype =  new Object();
      var tod_plan =  new Object();
      var std_plan =  new Object();
      var priority_control =  new Object();
      day_segtype.result =  this.SegmentType(equipment_id, this.segment_type_conjunct);
      tod_plan.result =  this.Tod(equipment_id);
      std_plan.result =  this.Std(equipment_id);
      priority_control.result =  this.Priority(equipment_id);
      var json_data = new Structure(2, 0, day_segtype, tod_plan, std_plan, priority_control);
       // Add user name as parameter.
       json_data.user_name = $(parent.document).find("div.user_name span").text();
      return json_data;
   }
   this.set_segment_type_conjunct = set_segment_type_conjunct;
   function set_segment_type_conjunct(segment_type_conjunct) {
      this.segment_type_conjunct = segment_type_conjunct;
   }
   // Private member ---------------------------------------------------------
   this.SegmentType = SegmentType;
   function SegmentType(equipment_id, segment_type_conjunct) {
      var result = [];
      result[0] = segment_type_conjunct.get_segment_type_data();
       result[0].equip_id = equipment_id;
      return result;
   }
   this.Tod = Tod;
   function Tod(equipment_id) {
      var result = [];
      // Define plan constructor function in order to create custom Structure() object later.
      var Structure = function(equip_id, seg_type, priority_switch, begin_time, ped_countdown, car_countdown, plan_id, priority_id) {
         this.equip_id = equip_id;
         this.seg_type = seg_type;
         this.priority_switch = priority_switch;
         this.begin_time = begin_time;
         this.ped_countdown = ped_countdown;
         this.car_countdown = car_countdown;
         this.plan_id = plan_id;
         this.priority_id = priority_id;
      };
      var equip_id = equipment_id; // equipment id
      var seg_type = this.GetCurrentSegmentType();
      var collector = new PlanTableCollector();
      var daily_data = collector.Day();
      for (var row_index = 0; row_index < daily_data.length; ++row_index) {
         var priority_switch = daily_data[row_index].priority_switch;
         var begin_time = daily_data[row_index].begin_time;
         var ped_countdown = daily_data[row_index].ped_countdown;
         var car_countdown = daily_data[row_index].car_countdown;
         var plan_id = daily_data[row_index].plan_id;
         var priority_id = daily_data[row_index].priority_id;
         result[row_index] = new Structure(equip_id, seg_type, priority_switch, begin_time, ped_countdown, car_countdown, plan_id, priority_id);
      }
      return result;
   }

   this.Std = Std;
   function Std(equipment_id) {
      var result = [];
      // Define plan constructor function in order to create custom Structure() object later.
      var Structure = function (equip_id, plan_id, phase_no, phase_name, phase_total, cycletime, time_offset) {
         this.equip_id = equip_id;
         this.plan_id = plan_id;
         this.phase_no = phase_no;
         this.phase_name = phase_name;
         this.phase_total = phase_total;
         this.cycletime = cycletime;
         this.time_offset = time_offset;
      };
      function ArrayToObject(data_array, name_object, data_object) {
         var current_name_object;
         for (var col_index = 0; col_index < data_array.length; ++col_index) {
            current_name_object = name_object + (col_index + 1);
            data_object[current_name_object] = data_array[col_index];
         }
      }
      //{"equip_id":20019,"plan_id":1,"phase_no":"0 ","phase_name":"普通二時相","phase_total":2,"allred1":2,"allred2":2,"allred3":0,"allred4":0,"allred5":0,"allred6":0,"allred7":0,"allred8":0,"yellow1":3,"yellow2":3,"yellow3":0,"yellow4":0,"yellow5":0,"yellow6":0,"yellow7":0,"yellow8":0,"g1":75,"g2":35,"g3":0,"g4":0,"g5":0,"g6":0,"g7":0,"g8":0,"pgreen1":75,"pgreen2":35,"pgreen3":0,"pgreen4":0,"pgreen5":0,"pgreen6":0,"pgreen7":0,"pgreen8":0,"pgflash1":3,"pgflash2":3,"pgflash3":0,"pgflash4":0,"pgflash5":0,"pgflash6":0,"pgflash7":0,"pgflash8":0,"pred1":2,"pred2":2,"pred3":0,"pred4":0,"pred5":0,"pred6":0,"pred7":0,"pred8":0,"ming1":25,"ming2":25,"ming3":0,"ming4":0,"ming5":0,"ming6":0,"ming7":0,"ming8":0,"maxg1":75,"m
      // axg2":35,"maxg3":0,"maxg4":0,"maxg5":0,"maxg6":0,"maxg7":0,"maxg8":0,"cycletime":120,"time_offset":10},
      var collector = new PlanTableCollector();
      var plan_set = collector.PlanSet();
      for (var plan_index = 0; plan_index < plan_set.length; ++plan_index) {
         var plan_source = plan_set[plan_index];
         var equip_id = equipment_id; // temp please check before
         var plan_id = plan_source.plan_id;
         var phase_no = plan_source.phase_no;
         var phase_total = plan_source.phase_total;
         var phase_name = "";
         var cycletime = plan_source.cycle;
         var time_offset = plan_source.offset;
         var plan_destination = new Structure(equip_id, plan_id, phase_no, phase_name, phase_total, cycletime, time_offset);
         ArrayToObject(plan_source.red, "allred", plan_destination);
         ArrayToObject(plan_source.yellow, "yellow", plan_destination);
         ArrayToObject(plan_source.green, "g", plan_destination);
         ArrayToObject(plan_source.green_p, "pred", plan_destination);
         ArrayToObject(plan_source.green_p_flash, "pgflash", plan_destination);
         ArrayToObject(plan_source.green_min, "ming", plan_destination);
         ArrayToObject(plan_source.green_max, "maxg", plan_destination);
         result[plan_index] = plan_destination;

      }
      return result;

   }
   this.Priority = Priority;
   function Priority(equipment_id) {
      var result = [];
       // Define plan constructor function in order to create custom Structure() object later.
       var Structure = function (equip_id, priority_id, door_trigger_up, door_trigger_down, headway_up, headway_down, lowspeed) {
           this.equip_id = equip_id;
           this.priority_id = priority_id;
           this.door_trigger_up = door_trigger_up;
           this.door_trigger_down = door_trigger_down;
           this.headway_up = headway_up;
           this.headway_down = headway_down;
           this.lowspeed = lowspeed;
       };
       function ArrayToObject(data_array, name_object, data_object) {
           var current_name_object;
           for (var col_index = 0; col_index < data_array.length; ++col_index) {
               current_name_object = name_object + (col_index + 1);
               data_object[current_name_object] = data_array[col_index];
           }
       }
      function ArrayToString(data_array, element_name, data_object) {
         var string = "";
         for (var col_index = 0; col_index < data_array.length; ++col_index) {
            if (data_array[col_index]) {
               string += "1";
            } else {
               string += "0";
            }
         }
         data_object[element_name] = string;
      }
       var collector = new PlanTableCollector();
       var priority_set = collector.PrioritySet();
//      console.log("priority set" + JSON.stringify(priority_set));
       for (var plan_index = 0; plan_index < priority_set.length; ++plan_index) {
           var priority_source = priority_set[plan_index];
           var equip_id = equipment_id; // equipment id
           var priority_id = priority_source.priority_id;
           var door_trigger_up = priority_source.door_trigger_up;
           var door_trigger_down = priority_source.door_trigger_down;
           var headway_up = priority_source.headway_up;
           var headway_down = priority_source.headway_down;
           var lowspeed = priority_source.lowspeed;
           var plan_destination = new Structure(equip_id, priority_id, door_trigger_up, door_trigger_down, headway_up, headway_down, lowspeed);
          ArrayToString(priority_source.past_east, "past_east", plan_destination);
          ArrayToString(priority_source.past_west, "past_west", plan_destination);
          ArrayToObject(priority_source.percentage_east, "percentage_east", plan_destination);
          ArrayToObject(priority_source.percentage_west, "percentage_west", plan_destination);
           result[plan_index] = plan_destination;
       }
//            console.log("priority upload" + JSON.stringify(result));
      return result;
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

// /**
//  * Created by hong on 2014/3/6.
//  */

// function TransferInputData() {
//    // Public member ----------------------------------------------------------
//    this.DayToSection = DayToSection;
//    function DayToSection(day_data) {
//       this.TodTransfer(day_data);
//       return this.data_modify.plan;
//    }
//    this.PlanToSection = PlanToSection;
//    function PlanToSection(plan_data) {
//       this.StandardTransfer(plan_data);
//       return this.data_modify.standard;
//    }
//    this.PhaseToSection = PhaseToSection;
//    function PhaseToSection(phase_data) {
//       return this.TransferPhaseList(phase_data);
//    }
//    this.PriorityToSection = PriorityToSection;
//    function PriorityToSection(priority_data) {
//       return this.PriorityTransfer(priority_data);
//    }
//    // Private member ---------------------------------------------------------
//    this.data_modify = new Object();

//    this.TodTransfer = TodTransfer;
//    function TodTransfer(plan_data) {
//       this.data_modify.plan = [];
//       var type_set = this.CountType(plan_data, "seg_type");
//       // Transfer information to plan object from result set.
//       // Define plan constructor function in order to create custom Plan() object later.
//       var Plan = function(priority_switch, begin_time, ped_countdown, car_countdown, plan_id, priority_id) {
// //         this.begin_time = begin_time;
// //         this.plan_id = plan_id;
// //         this.priority_id = priority_id;
//          this.priority_switch = priority_switch;
//          this.begin_time = begin_time;
//          this.ped_countdown = ped_countdown;
//          this.car_countdown = car_countdown;
//          this.plan_id = plan_id;
//          this.priority_id = priority_id;
//       }
//       for (var type_index = 0; type_index < type_set.length; ++type_index) {
//          var segment_type_current = type_set[type_index];
//          var plan_set = [];
//          var plan_count = 0;
//          var data_current;
//          for (var data_index = 0; data_index < plan_data.length; ++data_index) {
//             if (plan_data[data_index].seg_type != segment_type_current) continue;
//             data_current = plan_data[data_index];
//             var priority_switch = data_current.priority_switch;
//             var begin_time = data_current.begin_time;
//             var ped_countdown = data_current.ped_countdown;
//             var car_countdown = data_current.car_countdown;
//             var plan_id = data_current.plan_id;
//             var priority_id = data_current.priority_id;
//             plan_set[plan_count++] = new Plan(priority_switch, begin_time, ped_countdown, car_countdown, plan_id, priority_id);
//          }
//          this.data_modify.plan[segment_type_current -1] = plan_set;
//       }
// //        console.log("TOD data transition completely.");
// //        console.log(this.data_modify.plan[0][0].begin_time);

//    }
//    this.StandardTransfer = StandardTransfer;
//    function StandardTransfer(standard_data) {
//       this.data_modify.standard = [];
//       var type_set = this.CountType(standard_data, "plan_id");
//       // Transfer information to plan object from result set.
//       // Define plan constructor function in order to create custom Plan() object later.
//       var Plan = function(plan_id, phase_no, offset, red, yellow, green, green_p, green_p_flash, green_min, green_max) {
//          this.plan_id = plan_id;
//          this.phase_no = phase_no;
//          this.offset = offset;
//          this.red = red;
//          this.yellow = yellow;
//          this.green = green;
//          this.green_p = green_p;
//          this.green_p_flash = green_p_flash;
//          this.green_min = green_min;
//          this.green_max = green_max;
//       }
//       for (var type_index = 0; type_index < type_set.length; ++type_index) {
//          var segment_type_current = type_set[type_index];
//          var plan_set;
//          var data_current;
//          for (var data_index = 0; data_index < standard_data.length; ++data_index) {
//             if (standard_data[data_index].plan_id != segment_type_current) continue;
//             data_current = standard_data[data_index];
//             var red = ExtractDuration(data_current, "allred");
//             var yellow = ExtractDuration(data_current, "yellow");
//             var green = ExtractDuration(data_current, "g");
//             var green_p = ExtractDuration(data_current, "pred");
//             var green_p_flash = ExtractDuration(data_current, "pgflash");
//             var green_min = ExtractDuration(data_current, "ming");
//             var green_max = ExtractDuration(data_current, "maxg");
// //                var  = ExtractDuration(data_current, "");
//             plan_set = new Plan(data_current.plan_id, data_current.phase_no, data_current.time_offset, red, yellow, green, green_p, green_p_flash, green_min, green_max);
//             break;
//          }
//          this.data_modify.standard[data_current.plan_id] = plan_set;
//       }
//       // Declare extract function for traffic light duration.
//       function ExtractDuration(source_object, child_name) {
//          var result_set = [];
//          var serial_num;
//          var child_name_current;
//          for (var index = 0; index < 8; ++index) {
//             serial_num = index + 1;
//             child_name_current = child_name + serial_num;
//             result_set[index] = source_object[child_name_current];
//          }
//          return result_set;
//       }
// //        console.log(this.data_modify.standard);
//    }

//    this.PriorityTransfer = PriorityTransfer;
//    function PriorityTransfer(priority_data) {
//       var result = [];
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
//       //      {"equip_id":1234,"priority_id":"2","past_east":"110000","past_west":"110000","door_trigger_up":"2","door_trigger_down":"0","headway_up":"50",
// //         "headway_down":"0","lowspeed":"5","percentage_east1":"1","percentage_east2":"1","percentage_east3":"2","percentage_east4":"2","percentage_east5":
// //         "3","percentage_east6":"3","percentage_west1":"1","percentage_west2":"1","percentage_west3":"2","percentage_west4":"2","percentage_west5":"3",
// //         "percentage_west6":"5"}]}};
//       for (var data_index = 0; data_index < priority_data.length; ++data_index) {
//          var current_data = priority_data[data_index];
//          var priority_id = current_data.priority_id;
//          var past_east = ExtractBooleanFromString(current_data, "past_east");
//          var past_west = ExtractBooleanFromString(current_data, "past_west");
//          var percentage_east = ExtractDuration(current_data, "percentage_east");
//          var percentage_west = ExtractDuration(current_data, "percentage_west");
//          var door_trigger_up = current_data.door_trigger_up;
//          var door_trigger_down = current_data.door_trigger_down;
//          var headway_up = current_data.headway_up;
//          var headway_down = current_data.headway_down;
//          var lowspeed = current_data.lowspeed;
//          result[priority_id] = new Structure(priority_id, past_east, past_west, percentage_east, percentage_west, door_trigger_up, door_trigger_down, headway_up, headway_down, lowspeed);
//       }
//       // Extract value data to an array from several column.
//       function ExtractDuration(source_object, child_name) {
//          var array = [];
//          var serial_num;
//          var child_name_current;
//          for (var index = 0; index < 6; ++index) {
//             serial_num = index + 1;
//             child_name_current = child_name + serial_num;
//             array[index] = source_object[child_name_current];
//          }
//          return array;
//       }
//       // Extract boolean data type from string form.
//       function ExtractBooleanFromString(source_object, child_name) {
//          var array = [];
//          var string = source_object[child_name];
//          for (var index = 0; index < string.length; ++index) {
//             if (string.charAt(index) == 1) {
//                array[index] = true;
//             } else {
//                array[index] = false;
//             }
//          }
//          return array;
//       }
// //      console.log("priority transfer :" + JSON.stringify(result));
//       return result;
//    }

//    this.TransferPhaseList = TransferPhaseList;
//    function TransferPhaseList(phase_data) {
//       var result = [];
//       // phase_name, phase_total;
//       var PhaseList = function(no, name, total) {
//          this.no = no;
//          this.name = name;
//          this.total = total;
//       }
//       var data_current;
//       for (var phase_index = 0; phase_index < phase_data.length; ++phase_index) {
//          data_current = phase_data[phase_index];
//          result[phase_index] = new PhaseList(data_current.phase_no, data_current.phase_name, data_current.phase_total);
//       }
//       return result;
//    }



//    this.CountType = CountType;
//    function CountType(source_array, child_name) {
//       // Extract segment type information from result set.
//       var plan_type_set = [];
//       for (var plan_index = 0; plan_index < source_array.length; ++plan_index) {
//          plan_type_set[plan_index] = source_array[plan_index][child_name];
//       }
//       // Count how many segment type in result set.
//       var type_index = 0;
//       var type_set = [];
//       type_set[type_index] = plan_type_set[0];
//       for (var day_index = 1; day_index < plan_type_set.length; ++day_index) {
//          if (plan_type_set[day_index] != type_set[type_index]) {
//             type_set[++type_index] = plan_type_set[day_index];
//          }
//       }
//       return type_set.slice(0);
//    }
// }

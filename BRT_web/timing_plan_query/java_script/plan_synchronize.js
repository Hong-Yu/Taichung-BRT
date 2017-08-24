// /**
//  * Created by CCT on 2014/3/19.
//  */
// var synchronize = new Object();
// function PlanSynchronize() {
//     // Public member ----------------------------------------------------------
//     this.set_plan_insert = set_plan_insert;
//     function set_plan_insert(plan_insert) {
//         synchronize.plan_insert = plan_insert;
//     }
//     this.Synchronize = Synchronize;
//     function Synchronize() {
//         console.log("Plan synchronize start");
//         this.PlanListener();
//     }
//     this.Unbind = Unbind;
//     function Unbind() {
//         console.log("Plan synchronize off");
//         for (var table_index = 0; table_index < 12; ++table_index) {
//             var table_id = '#timing_plan_table' + (table_index + 1);
//             var domain = $(table_id);
//             domain.find("th.plan_id").unbind("change");
//             domain.find("td.plan_content").unbind("change");
//         }


//     }
//     // Private member ---------------------------------------------------------
//     this.PlanListener = PlanListener;
//     function PlanListener() {
//         for (var table_index = 0; table_index < 12; ++table_index) {
//             var table_id = '#timing_plan_table' + (table_index + 1);
//             // Listen plan id.
//             var domain = $(table_id).find("th.plan_id");
//             domain.change(function(element) {
//                 console.log("plan id auto-complete");
//                 var table_mark = $(this).parent().attr("mark");
//                 var collector = new PlanTableCollector();
//                 var tod_data = collector.Day();
//                 var insert = synchronize.plan_insert;
//                 insert.set_specific_tod_data(tod_data);
//                 insert.InsertTOD(table_mark - 1);
//             });
//             // Listen plan content
//             var domain_content = $(table_id).find("td.plan_content");
//             domain_content.change(function(element) {
//                 var table_mark = $(this).parent().attr("mark");
//                 console.log("change content" + table_mark);
//                 console.log(this);
//                 var collector = new PlanTableCollector();
//                 var tod_data = collector.Day();
//                 var std_data = collector.PlanSpecific(table_mark - 1);
//                 var priority_data = collector.PrioritySpecific(table_mark - 1);
//                 var insert = synchronize.plan_insert;
//                 insert.set_specific_tod_data(tod_data);
//                 insert.set_specific_std_data(std_data);
//                 insert.set_specific_priority_data(priority_data);

//                 insert.InsertSpecificPlanContent(table_mark - 1);

//             });


//         }

// //      var domain_main=$('#centerview');
// //      domain_main.find('table.table.mainbody>tbody').change(function(element) {
// //         console.log("change");
// //         var collector = new PlanTableCollector();
// //         var tod_data = collector.Day();
// //         var std_data = collector.PlanSet();
// //         var insert = synchronize.plan_insert;
// //         insert.set_specific_tod_data(tod_data);
// //         insert.set_specific_std_data(std_data);
// //         insert.SpecificInsert();
// //
// //
// //      });


//     }

// }

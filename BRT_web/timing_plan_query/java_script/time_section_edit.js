// /**
//  * Created by hong on 2014/3/21.
//  */

// function TimeSectionEdit() {
//     // Public member ----------------------------------------------------------
//     this.Add = Add;
//     function Add() {
//         this.ListenAddButton();

//     }
//     this.Delete = Delete;
//     function Delete() {
//         this.ListenDeleteButton();

//     }
//     // Private member ---------------------------------------------------------
//     this.ListenAddButton = ListenAddButton;
//     function ListenAddButton() {
//         $("#time_section_add").bind("click", this.AddLast);
//     }
//     this.ListenDeleteButton = ListenDeleteButton;
//     function ListenDeleteButton() {
//         $("#time_section_delete").bind("click", this.DeleteSelect);
//     }
//     this.AddLast = AddLast;
//     function AddLast() {
//         console.log("time section: add");
//         // Find last display none table
//         var first_hide_index = 0;
//         for (var table_index = 0; table_index < 32; table_index++) {
//             var table_id = '#timing_plan_table' + (table_index + 1);
//             var domain = $(table_id);
//             if (domain.css("display") == 'none') {
//                 first_hide_index = table_index;
//                 break;
//             }
//         }
//         // Show last display none table
//         var table_id = '#timing_plan_table' + (first_hide_index + 1);
//         var domain = $(table_id);
//         domain.css("display", "");
//     }
//     this.DeleteSelect = DeleteSelect;
//     function DeleteSelect() {
//         console.log("time section: delete");
//         for (var table_index = 0; table_index < 32; table_index++) {
//             var table_id = '#timing_plan_table' + (table_index + 1);
//             var domain = $(table_id);
//             if (domain.length == 0) continue;
//             if (domain.css("display") == 'none') continue;
//             if (domain.find("input[type=checkbox]").prop('checked') == false) continue;
//             console.log(table_index);
//             domain.css("display", "none");

//         }


//     }

// }

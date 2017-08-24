/**
 * Created by hong on 2014/3/2.
 */
//將時段型態填入日曆與按鈕
function PaintSegmentType() {
   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize(data_input) {
      this.Transfer(data_input);
   }
   this.Paint = Paint;
   function Paint() {
      this.ColorCalendarNormal(this.data_modify.type_normal);
      this.ColorCalendarSpecial(this.data_modify.type_spe_i, this.data_modify.type_spe_f);
      this.CreateButton(this.data_modify.type_normal);
   }
   this.PaintCalendar = PaintCalendar;
   function PaintCalendar() {
      this.ColorCalendarNormal(this.data_modify.type_normal);
      this.ColorCalendarSpecial(this.data_modify.type_spe_i, this.data_modify.type_spe_f);
   }
   this.Show = Show;
   function Show() {
      var result = this.data_modify;
      console.log(result);
   }
   // Private member ---------------------------------------------------------
   this.Transfer =  function(data_input) {
      this.data_modify = new Object();
      this.data_modify.type_normal = [];
      var type_normal = this.data_modify.type_normal;
      var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      var variable_name = "";
      for (var index = 0; index < 14; ++index) {
         variable_name = days[index];
         if (index >= 7) {
            variable_name = "even_" + days[index - 7];
         }
         type_normal[index] = data_input[variable_name];
      }
      this.data_modify.type_spe_i = [];
      this.data_modify.type_spe_f = [];
      var type_spe_i = this.data_modify.type_spe_i;
      var type_spe_f = this.data_modify.type_spe_f;
      for (var index = 0; index <= 12; ++index) {
         var name_index = index + 1;
         var name = "spc" + name_index + "_startdate" ;
         type_spe_i[index] = data_input[name];
      }
      for (var index = 0; index <= 12; ++index) {
         var name_index = index + 1;
         var name = "spc" + name_index + "_enddate" ;
         type_spe_f[index] = data_input[name];
      }
   }
   this.ColorCalendarNormal = ColorCalendarNormal;
   function ColorCalendarNormal(type_info) {
       console.log('color normal day');
      var domain_name = "table.scalendar";
      var mark = 0;
      var segment_type = 0;
      for (var day_index = 0; day_index < 14; ++day_index) {
         segment_type = type_info[day_index];
         mark = "td.d" + day_index;
         this.TypeByCellMark(domain_name, mark, segment_type);
      }
   }
   this.ColorCalendarSpecial = ColorCalendarSpecial;
   function ColorCalendarSpecial(days_i, days_f) {
      var domain_name = "table.scalendar";
      var date_manager = new DateManager();
      for (var day_index = 0; day_index <= 12; ++day_index) {
         var day_set = date_manager.ConjunctDay(days_i[day_index], days_f[day_index]);
         TypeByDate(domain_name, day_set, day_index + 8);
      }
   }

   this.TypeByCellMark = TypeByCellMark;
   function TypeByCellMark(domain_name, mark, segment_type) {
      var element_set=$(domain_name).find(mark);
      var color = get_color(segment_type);
      for (var element_index = 0; element_index < element_set.length; ++element_index) {
         if ($(element_set[element_index]).find('div').text() == "") { continue; }
         $(element_set[element_index]).attr("segment_type", segment_type);
         $(element_set[element_index]).css({color: color});
         // Add segment type label to calendar cell.
//         var mark_dir = document.createElement('div');
//         mark_dir.className = "segment_type_mark";
//         mark_dir.innerHTML = ""+ segment_type;
//         $(element_set[element_index]).append(mark_dir);
      }
   }
   function TypeByDate(domain_name, day_set, segment_type) {
      var color = get_color(0);
      var mark = "";
      for (var day_index = 0; day_index <= day_set.length; ++day_index) {
         mark = "div[date=" + day_set[day_index] + "]";
         var element = $(domain_name).find("td").find(mark).parent();
         $(element).attr("segment_type", segment_type);
         $(element).css({color: color});
      }
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

   this.CreateButton = CreateButton;
   function CreateButton(type_normal) {
      // Refresh button
      $(".segtype_tab").empty();
      var normal_set = type_normal.slice();
      normal_set.sort();
      var type_index = 0;
      var type_set = [];
      type_set[type_index] = normal_set[0];
      for (var day_index = 1; day_index < type_normal.length; ++day_index) {
         if (normal_set[day_index] != type_set[type_index]) {
            type_set[++type_index] = normal_set[day_index];
         }
      }
      // Create the button set to choose normal segment type.
      var mark_name = "";
      for (var type_index = 0; type_index < type_set.length; ++type_index) {
         mark_name = "型態 " + type_set[type_index];
         AppendButton(mark_name, type_set[type_index]);
      }
      // Create the button set to choose special segment type.
      for (var type_index = 8; type_index < 21; ++type_index) {
         mark_name = "型態 " + type_index;
         AppendButton(mark_name, type_index);
      }
//      AppendManagerButton();
      ColorButton();
   }

   function AppendButton(text, segment_type) {
      var text_li = "<li class=''><a style='cursor: pointer;' segment_type=" + segment_type + "><span>" + text + "</span></a></li>";
      //<span style="color:#303030;">平日(6)</span>
      $(".segtype_tab").append(
         $(text_li)
      );
   }

//   function AppendManagerButton() {
//      var strVar="";
//      strVar += "<li style=\"float:right;\">";
//      strVar += "<button class=\"btn btn-primary btn-lg\" data-toggle=\"modal\" data-target=\"#create_segment_type_modal\" style=\"font-size:12pt;\">";
//      strVar += "------";
//      strVar += "<\/button>";
//      $(".segtype_tab").append(
//         $(strVar)
//      );
//   }

   function ColorButton() {
      var element_set = $(".segtype_tab").find("a").find("span");
      var segment_type = 0;
      var color;
      for (var index = 0; index < element_set.length; ++index) {
         segment_type = $(element_set[index]).parent().attr("segment_type");
         if (segment_type >= 8) segment_type = 0;
         color = get_color(segment_type);
         $(element_set[index]).css("color", color);
      }
   }

}

//// Declare append segment type
//function AppendSegmentTypeButton(text, segment_type) {
//    var text_li = "<li class=''><a style='cursor: pointer;' segment_type=" + segment_type + "><span>" + text + "</span></a></li>";
//    //<span style="color:#303030;">平日(6)</span>
//    $(".segtype_tab").append(
//        $(text_li)
//    );
//}
//function DrawSegmentTypeButton() {
//    var find = $(".segtype_tab").find("a").find("span");
//    for (var index = 0; index < find.length; ++index) {
//        var color = SegmentTypeColor(index);
//        $(find[index]).css("color", color);
//
//    }
//}
//function DrawNormalCalendarColor(day_index, type_index, segment_type) {
//    var element_set=$('table.scalendar').find('td');
//    var mark = "d" + day_index;
//    var color = SegmentTypeColor(type_index);
//    for (var element_index = 0; element_index < element_set.length; ++element_index) {
//        if ($(element_set[element_index]).find('div').text() == "") { continue; }
//        if ($(element_set[element_index]).attr('class') != mark) { continue; }
//        $(element_set[element_index]).attr("segment_type", segment_type);
//        $(element_set[element_index]).css({color: color});
//    }
//}
//
//function DrawSpecialCalendarColor(day_string, type_index, segment_type) {
//    var element_set=$('table.scalendar').find('td');
//    //console.log($('table.scalendar'));
//    var color = SegmentTypeColor(type_index);
//    for (var element_index = 0; element_index < element_set.length; ++element_index) {
//        if ($(element_set[element_index]).find('div').text() == "") { continue; }
//        if ($(element_set[element_index]).find('div').attr('date') != day_string) { continue; }
//        $(element_set[element_index]).attr("segment_type", segment_type);
//        $(element_set[element_index]).css({color: color});
//    }
//}
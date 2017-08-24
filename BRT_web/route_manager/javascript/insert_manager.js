/**
 * Created by hong on 2014/4/18.
 */

function InsertManager() {
   // Public member ----------------------------------------------------------
   this.set_input_data = set_input_data;
   function set_input_data(input_data) {
      this.input_data = input_data;
   }
   this.RouteMap = RouteMap;
   function RouteMap() {
//        this.input_data = input_data;
      this.DrawRouteMap(this.input_data.route);
      this.InsertIntList(this.input_data.intersection);
       InsertTitle(this.input_data.route_intersection);
      this.InsertIntSelected(this.input_data.route_intersection);
   }
   this.SectionList = SectionList;
   function SectionList() {
      this.InsertIntList(this.input_data.intersection);
   }
   // Private member ----------------------------------------------------------
   this.InsertIntList = InsertIntList;
   function InsertIntList(intersection_data) {
//        intersection_data.name;
//        intersection_data.intersection_id;
      var domain_select = $("div.route_map").find("select.crossroad_select");
      console.log(domain_select.length);
      for (var select_index = 0; select_index < domain_select.length; ++select_index) {
         var target = domain_select[select_index];
         for (var section_index = 0; section_index < intersection_data.length; ++section_index) {
            var name = intersection_data[section_index].name
            var id = intersection_data[section_index].intersection_id;
            var option_text = "<option mark='" + id + "'>" + name + "</option>"
//            if (section_index  == select_index)
//               option_text = "<option selected='selected' mark='" + id + ">" + name + "</option>"
            $(target).append(option_text);
         }
      }
   }

   this.InsertIntSelected = InsertIntSelected;
   function InsertIntSelected(int_data) {
      var domain_select = $("div.route_map").find("select.crossroad_select");
      for (var int_index = 0; int_index < int_data.length; ++int_index) {
         var current_int_id = int_data[int_index].intersection_id;
         var target_select = domain_select[int_index];
         var option_mark = "option[mark=" + current_int_id + "]";
         $(target_select).find(option_mark).attr("selected", true);
      }
   }

   this.DrawRouteMap = DrawRouteMap;
   function DrawRouteMap(route_info) {
      var section_number = route_info.intersection_max;
      var color = route_info.color;
      var name = route_info.name;
      var route_manager = new RouteMapManager();
      route_manager.RouteMap(section_number);
      $(".fill").css("background-color", color);
      var domain_route= $("form.add_route");
      domain_route.find("input.name").val(name);
      domain_route.find("input.color").val(color);
      domain_route.find("input.section_number").val(section_number);
   }

    function InsertTitle(input_data) {
        var domain_select = $("div.route_map").find("div.crossroad_title");
        for (var int_index = 0; int_index < input_data.length; ++int_index) {
//            var current_int_id = input_data[int_index].intersection_id;
            var target_select = domain_select[int_index];
//            var option_mark = "option[mark=" + current_int_id + "]";
            $(target_select).text(input_data[int_index].name);
        }


    }

}

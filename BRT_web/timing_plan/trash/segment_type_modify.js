/**
 * Created by CCT on 2014/6/5.
 */

function SegmentTypeModify() {
   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize(input_data) {
      $("div.segment_type_modify table.special_type input").bind("change", SpeicalDate);
      Display(input_data);
      Update(input_data);

   }
   // Private member ---------------------------------------------------------
   function SpeicalDate(event) {
      var target = $(event.currentTarget);
      console.log(target.val());
   }
   function Display(input_data) {
      var domain_special = $("div.segment_type_modify table.special_type");
      for (var type_index = 1; type_index <= 13; ++type_index) {
         var name_start = 'spc' + type_index + '_startdate';
         var name_end = 'spc' + type_index + '_enddate';
         var segment_index = type_index + 7;
         var html = "";
         html += '<tr class="'+ type_index +'">';
         html += '<td>時段'+ segment_index +'</td>';
         html += '<td><input class="start" type="date" value="'+ input_data[name_start] +'"></td>';
         html += '<td><input class="end" type="date" value="'+ input_data[name_end] +'"></td>';
         html += "</tr>";
         domain_special.append(html);
      }

   }
   function Update(input_data) {
      $("div.segment_type_modify button.update").bind("click", {segment_data:input_data}, ModifyData);
   }
   function ModifyData(event) {
      var input_data = event.data.segment_data;
      var domain_special = $("div.segment_type_modify table.special_type");
      for (var type_index = 1; type_index <= 13; ++type_index) {
         var name_start = 'spc' + type_index + '_startdate';
         var name_end = 'spc' + type_index + '_enddate';
         var segment_index = type_index + 7;
         input_data[name_start] = domain_special.find("tr."+ type_index).find("input.start").val();
         input_data[name_end] = domain_special.find("tr."+ type_index).find("input.end").val();
      }

      var paint_segment_type = new PaintSegmentType();
      paint_segment_type.Initialize(input_data);
      paint_segment_type.Show();
      paint_segment_type.Paint();
      $("div.segment_type_modify").modal('hide');

   }

}

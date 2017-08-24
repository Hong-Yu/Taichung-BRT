/**
 * Created by hong on 2014/6/4.
 */
function PhaseAdd() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
       var str_html="";
       str_html += "<tr id='1'>";
       str_html += '<th style=\"text-align:right;\"><input class="phase_no"    type="text" placeholder="時相編號" value="" required><\/th>';
       str_html += '<td><input class="phase_name"  type="text" placeholder="時相名稱" value=""><\/td>';
       str_html += '<td><input class="phase_total" type="number" placeholder="分相數" value=""><\/td>';
       str_html += '<td><input class="phase_step"  type="number" placeholder="步階數" value=""><\/td>';
       str_html += "<\/tr>";
       $("tr.phase_add").before(str_html);
       $("span.phase_add").bind("click", AddPhase);
       $('span.phase_minus').bind('click', CancelAddPhase);
       $('tbody.phase_add').attr('id', 1);
    }
// Private member ---------------------------------------------------------
    function AddPhase() {
        var domain = $("tbody.phase_add");
        var phase_max = parseInt(domain.attr("id"));
        domain.attr("id", phase_max + 1);

        var str_html="";
        str_html += "<tr id='"+(phase_max+1)+"'>";
//        str_html += "<th style=\"text-align:right;\">" + phase_index + "<\/th>";
        str_html += '<th style=\"text-align:right;\"><input class="phase_no"    type="text" placeholder="時相編號" value="" required><\/th>';
        str_html += '<td><input class="phase_name"  type="text" placeholder="時相名稱" value=""><\/td>';
        str_html += '<td><input class="phase_total" type="number" placeholder="分相數" value="" min="1"><\/td>';
        str_html += '<td><input class="phase_step"  type="number" placeholder="步階數" value="" min="1"><\/td>';
//        str_html += "<td>";
//        str_html += '<span class=\"btn btn-danger btn-sm\" onclick="PhaseRemove.Delete(this);">刪除<\/span>';
//        str_html += "<\/td>";
        str_html += "<\/tr>";
        $("tr.phase_add").before(str_html);

    }
   function CancelAddPhase(){
      var domain = $("tbody.phase_add");
      var phase_max = parseInt(domain.attr("id"));
      if(phase_max>1){
         $('tr[id='+phase_max+']').remove();
         domain.attr("id", phase_max - 1);
      }
      else{
         console.log('stop minus phase');
      }
   }
}
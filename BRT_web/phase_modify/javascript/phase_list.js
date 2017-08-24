/**
 * Created by CCT on 2014/5/14.
 */
function PhaseList() {
   // Public member ----------------------------------------------------------
   this.Listing = Listing;
   function Listing() {
      Requesting();
   }
   this.Reload = Reload;
   function Reload() {
      $("tbody.phase_list").empty();
      Requesting();
   }
   // Private member ---------------------------------------------------------
   function Requesting() {
      var post_data = new Object;
      post_data.requesting = "please give me the phase list";
      $.post( "http://192.168.1.2:8888/phase?type=list", post_data )
         .done(function( data ) {
            if(data.successful)
               Success(data.phase);
            else
               Error();
         });
      function Error() {
         console.log("account list error");
//         domain.find("div.authenticated_error").show();
      }
      function Success(phase) {
         console.log("account list success" + phase);
         var current_data;
         for (var row = 0; row < phase.length; ++row) {
             current_data = phase[row];
            AppendInfo(row + 1, current_data);
         }
          // Phase add function
          var str_html= '<tr class="phase_add"><th colspan="6"><span class="glyphicon glyphicon-plus phase_add"></span>' + '  '+
             '<span class="glyphicon glyphicon-minus phase_minus"></span><button class="btn btn-success btn-sm upload">新增時相至資料庫</button></th></tr>';
          $("tbody.phase_add").append(str_html);
          var phase_add = new PhaseAdd();
          phase_add.Initialize();
         var phase_new = new PhaseUpload();
         phase_new.Initialize();

      }
   }
   function AppendInfo(index, input_data) {
      var th =$('th.operation');
         th[0].innerHTML="修改 / 刪除";
      var domain = $("tbody.phase_list");
       domain.attr("phase_max", index);
      var str_html="";
      str_html += "<tr>";
      str_html += "<th style=\"text-align:center;\">" + index + "<\/th>";
       str_html += '<td class="phase_no">' + input_data.phase_no +'<\/td>';
       str_html += '<td class="phase_name">' + input_data.phase_name + '<\/td>';
       str_html += '<td class="phase_total">' + input_data.phase_total + '<\/td>';
       str_html += '<td class="phase_step">' + input_data.phase_step + '<\/td>';
      str_html += "<td style='text-align:center;'>";
       str_html += '<span class=\"btn btn-warning btn-sm\" onclick="PhaseRemove.Revise(this);" title="'+ input_data.phase_no +'"><span class="glyphicon glyphicon-pencil" title="修改時相"></span><\/span>';
      str_html += " ";
      str_html += '<span class=\"btn btn-danger btn-sm\" onclick="PhaseRemove.Delete(this);" title="'+ input_data.phase_no +'"><span class="glyphicon glyphicon-trash" title="刪除時相"></span><\/span>';
      str_html += "<\/td>";
      str_html += "<\/tr>";
      domain.append(str_html);
   }
}

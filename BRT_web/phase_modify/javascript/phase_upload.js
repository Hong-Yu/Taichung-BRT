/**
 * Created by hong on 2014/6/4.
 */

function PhaseUpload() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
   function Initialize() {
      $('button.upload').bind('click', UploadData);
   }
   function UploadData() {
        var output_data = [];
        function Structure(phase_no, phase_name, phase_total, phase_step) {
            this.phase_no = phase_no;
            this.phase_name = phase_name;
            this.phase_total = phase_total;
           this.phase_step = phase_step;
        }
        var domain = $("tbody.phase_add");
        var domain_set = domain.find("tr");
       var phase_max = parseInt(domain.attr("id"));

        var phase_no, phase_name, phase_total, phase_step;
        for (var phase_index = 0; phase_index < phase_max; ++phase_index) {
            var domain_current = $(domain_set[phase_index]);
           if(domain_current[0].cells[0].childNodes[0].value !="" && domain_current[0].cells[1].childNodes[0].value !="" && domain_current[0].cells[2].childNodes[0].value !=null && domain_current[0].cells[3].childNodes[0].value !=null){
              phase_no = domain_current[0].cells[0].childNodes[0].value;
              phase_name = domain_current[0].cells[1].childNodes[0].value;
              phase_total = parseInt(domain_current[0].cells[2].childNodes[0].value);
              phase_step = parseInt(domain_current[0].cells[3].childNodes[0].value);
              output_data[phase_index] = new Structure(phase_no, phase_name, phase_total, phase_step);
           }else{
              alert('請勿有空白欄位');
              this.parents().preventDefault();
           }
        }
         var post_data = new Object();
        post_data.phase = output_data;
       console.log(JSON.stringify(post_data));

       $.post( "http://192.168.1.2:8888/phase?type=update", post_data).done(function( data ) {
          if(data.successful){
             var info =$('div.Info2').empty();
             var str_alert ="";
             str_alert +='<div class="alert alert-success" role="alert"><strong>新增 '+post_data.phase.length+' 個時相至資料庫成功</strong></div>';
             str_alert +='<div class="alert alert-warning" role="alert"><strong>提醒! 新時相點燈請至時相步階設定</strong></div>';
             info.append(str_alert);

             var list_reload = new PhaseList();
             list_reload.Reload();
          }
          else{
             var err_info =$('div.Info2').empty();
             var str_alert_err ="";
             str_alert_err +='<div class="alert alert-danger" role="alert"><strong>新增時相失敗</strong></div>';
             err_info.append(str_alert_err);
             var list_reload = new PhaseList();
             list_reload.Reload();
          }
       });
       domain.empty();
    }
}

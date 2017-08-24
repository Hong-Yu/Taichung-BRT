/**
 * Created by CCT on 2014/8/29.
 */
function InfoMain(){
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   $.get("intersection_info/sub_page/main.html", function(data) {
      domain_main.prepend(data);
      PrimaryDataProcess();
   });
   function PrimaryDataProcess() {
      var post_data = new Object;
      post_data.requesting = "please give me data";
      $.post( "http://192.168.1.2:8888/intersection?type=list", post_data )
         .done(function( data ) {
            if(data.successful){
               load_select_list(data.message);
               list_event();
            }
            else{
               var err_info =$('.select_list').empty();
               var str_alert_err ="";
               str_alert_err +='<div class="alert alert-danger" role="alert"><strong>清單載入失敗</strong></div>';
               err_info.append(str_alert_err);
            }
         });
      function load_select_list(inputdata){
         var domain_intersection = $("#intersection_list");
         var str_opt = "<option disabled selected>請選擇路口</option>";
         domain_intersection.append(str_opt);
         var option_dir = "";
         for (var data_index = 0; data_index < inputdata.length; ++data_index) {
            var current_data = inputdata[data_index];
            option_dir = document.createElement('option');
            option_dir.innerHTML =current_data.intersection_id+ "　" + current_data.name;
            option_dir.setAttribute("title", "路口編號 "+current_data.intersection_id);
            option_dir.setAttribute("mark", current_data.intersection_id);
            domain_intersection.append(option_dir);
         }
      }
      function list_event(){
         var domain_intersection = $("#intersection_list");
         var div_list = $('.list');
         domain_intersection.bind('change', event);
         function event(event){
            div_list.empty();
            var target = event.currentTarget;
            var domain_select = $(target).find("option:selected");
            var id = domain_select.attr('mark');
            var str_err = "";
            var str_pdf = "";
            str_pdf += '<object width="850" height="1200" data="/BRT_web/intersection_info/images/'+id+'.pdf"></object>';
            $.ajax({url:'/BRT_web/intersection_info/images/'+id+'.pdf',success:function(result){
               div_list.append(str_pdf);
            }, error:function(xhr){
//               str_err += "<h3>"+xhr.status +" "+ xhr.statusText +"</h3>";
               str_err += "<h3 style='text-align: center; color: #F36826; font-weight: bold'>--路口目前未有資訊檔案--</h3>";
               div_list.append(str_err);
            }});
         }
      }
   }
}
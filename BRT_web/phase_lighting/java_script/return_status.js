/**
 * Created by CCT on 2014/8/26.
 */
function returnStatus() {
   this.Initialize = Initialize;
   function Initialize() {
   }
   this.updateDB = updateDB;
   function updateDB(){
      update_DB_status();
   }
   this.updateTC = updateTC;
   function updateTC(inputdata){
           update_TC_status(inputdata);
   }
   function update_DB_status(){
      var success_info =$('.status').empty();
      var str_alert ="";
      str_alert +='<div class="alert alert-info" role="alert"><strong>已成功更新資料庫</strong></div>';
      success_info.append(str_alert);
   }
   function update_TC_status(inputdata){
       var phase =  $("select.phase")[0].value;
       if(inputdata.key =='0F80'){
           $('#p_bar_width').attr('style', 'width: 100%');
           $('#p_bar').remove();
           $('.phase').append('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert">' +
               '<span aria-hidden="true">&times;</span><span class="sr-only"></span></button><strong>下傳時相 '+phase+'至路口 '+inputdata.LCN+' 已成功!</strong></div>');
       }
       if(inputdata.key !='0F80'){
           $('#p_bar_width').attr('style', 'width: 100%');
           $('#p_bar').remove();
           $('.phase').append('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert">' +
               '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button<strong>下傳時相 '+phase+'至路口 '+inputdata.LCN+' 失敗!</strong> 路口回傳封包 '+inputdata.key+'</div>');
       }
   }
}
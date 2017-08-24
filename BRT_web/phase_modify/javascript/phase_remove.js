/**
 * Created by CCT on 2014/6/5.
 */

var PhaseRemove = {
   Delete: function(target) {
//      console.log(target);
      DeletePhase(target);
   },
   Revise: function(target){
      RevisePhase(target);
   },
   Cancel: function(target){
      CancelChange(target);
   },
   Update: function(target){
      UpdatePhase(target);
   }
}

function DeletePhase(target) {
   var r = confirm('真的要刪除嗎?');
   if (r == true) {
      $(target).parent().parent().remove();
      var output_data = $(target).attr('title');
      var post_data = new Object();
      post_data.phase_no = output_data;
      console.log(JSON.stringify(post_data.phase_no));
      $.post( "http://192.168.1.2:8888/phase?type=delete", post_data).done(function( data ) {
         if(data.successful){
            var info =$('div.Info0').empty();
            var str_alert ="";
            str_alert +='<div class="alert alert-info" role="alert"><strong>已刪除時相</strong></div>';
            info.append(str_alert);
         }
         else{
            var err_info =$('div.Info0').empty();
            var str_alert_err ="";
            str_alert_err +='<div class="alert alert-danger" role="alert"><strong>刪除時相失敗</strong></div>';
            err_info.append(str_alert_err);
         }
      });
   } else {
      console.log("已取消刪除");
   }
}

function RevisePhase(target){
   var phaseno = $(target).attr('title');
   var target_parents = $(target).parents();
   var tr_text = [];
   tr_text[0] = target_parents[1].cells[0].innerText;
   tr_text[1] = target_parents[1].cells[1].innerText;
   tr_text[2] = target_parents[1].cells[2].innerText;
   tr_text[3] = target_parents[1].cells[3].innerText;
   tr_text[4] = target_parents[1].cells[4].innerText;
   var th =$('th.operation');
   th[0].innerHTML="取消 / 更新";
   var str_html="";
   str_html += "<tr class='revise'>";
   str_html += "<th style=\"text-align:center;\">*<\/th>";
   str_html += '<td>'+phaseno+'<\/td>';
   str_html += '<td><input class="phase_name"  type="text"   value="' +tr_text[2]+ '"><\/td>';
   str_html += '<td><input class="phase_total" type="number" value="' +tr_text[3]+ '" min="1" max="20"><\/td>';
   str_html += '<td><input class="phase_step"  type="number" value="' +tr_text[4]+ '" min="1" max="100"><\/td>';
   str_html += "<td style='text-align:center;'>";
   str_html += '<span id="' +tr_text+ '" class="btn btn-warning btn-sm" onclick="PhaseRemove.Cancel(this);" ><span class="glyphicon glyphicon-remove" title="取消修改"></span></span>';
   str_html += " ";
   str_html += '<span id="' +tr_text+ '" class="btn btn-danger btn-sm" onclick="PhaseRemove.Update(this);" ><span class="glyphicon glyphicon-ok" title="更新時相上傳資料庫"></span></span>';
   str_html += "<\/td>";
   str_html += "<\/tr>";

   $(target).parent().parent().replaceWith(str_html);
}

function CancelChange(target){
   var tr_text = $(target).attr('id');
   var tr_text_array =tr_text.split(",");
   var th =$('th.operation');
   th[0].innerHTML="修改 / 刪除";
   var str_html="";
   str_html += "<tr>";
   str_html += "<th style=\"text-align:center;\">"+tr_text_array[0]+"<\/th>";
   str_html += '<td>'+tr_text_array[1]+'<\/td>';
   str_html += '<td>' +tr_text_array[2]+ '<\/td>';
   str_html += '<td>' +tr_text_array[3]+ '<\/td>';
   str_html += '<td>' +tr_text_array[4]+ '<\/td>';
   str_html += "<td style='text-align:center;'>";
   str_html += '<span class=\"btn btn-warning btn-sm\" onclick="PhaseRemove.Revise(this);" title="'+ tr_text_array[1] +'"><span class="glyphicon glyphicon-pencil" title="修改時相"></span><\/span>';
   str_html += " ";
   str_html += '<span class=\"btn btn-danger btn-sm\" onclick="PhaseRemove.Delete(this);" title="'+ tr_text_array[1] +'"><span class="glyphicon glyphicon-trash" title="刪除時相"></span><\/span>';
   str_html += "<\/td>";
   str_html += "<\/tr>";

   $(target).parent().parent().replaceWith(str_html);
}

function UpdatePhase(target){
   var tr_text = $(target).attr('id');
   var tr_text_array =tr_text.split(",");
   var target_parents = $(target).parents();
   var tr_text_new=[];
   tr_text_new[0] = tr_text_array[0];
   tr_text_new[1] = tr_text_array[1];
   tr_text_new[2] = target_parents[1].cells[2].firstChild.value;
   tr_text_new[3] = target_parents[1].cells[3].firstChild.value;
   tr_text_new[4] = target_parents[1].cells[4].firstChild.value;

      if(tr_text_new[3] != tr_text_array[3] || tr_text_new[4] != tr_text_array[4]){
         var post_data = new Object();
         post_data.phase_data = tr_text_new;
         console.log(JSON.stringify(post_data.phase_data));
         $.post( "http://192.168.1.2:8888/phase?type=renew_with_steps", post_data).done(function( data ) {
                if(data.successful){
                   var info = $('div.Info');
                   var str_alert ="";
                   str_alert +='<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert">' +
                      '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>提醒! 請至時相步階設定重新為時相: '+post_data.phase_data[1]+' '+post_data.phase_data[2]+' 點燈</strong></div>';
                   info.append(str_alert);
                   var info =$('div.Info0').empty();
                   var str_alert ="";
                   str_alert +='<div class="alert alert-info" role="alert"><strong>已更新時相</strong></div>';
                   info.append(str_alert);
                }
                else{
                   var err_info =$('div.Info0').empty();
                   var str_alert_err ="";
                   str_alert_err +='<div class="alert alert-danger" role="alert"><strong>更新時相失敗</strong></div>';
                   err_info.append(str_alert_err);
                }
            });
      }
      else{
         var post_data = new Object();
         post_data.phase_data = tr_text_new;
         console.log(JSON.stringify(post_data.phase_data));
         $.post( "http://192.168.1.2:8888/phase?type=renew", post_data).done(function( data ) {
            if(data.successful){
               var info =$('div.Info0').empty();
               var str_alert ="";
               str_alert +='<div class="alert alert-info" role="alert"><strong>已更新時相名稱</strong></div>';
               info.append(str_alert);
            }
            else{
               var err_info =$('div.Info0').empty();
               var str_alert_err ="";
               str_alert_err +='<div class="alert alert-danger" role="alert"><strong>更新時相失敗</strong></div>';
               err_info.append(str_alert_err);
            }
         });
      }
   var th =$('th.operation');
   th[0].innerHTML="修改 / 刪除";
   var str_html="";
   str_html += "<tr>";
   str_html += "<th style=\"text-align:center;\">"+tr_text_new[0]+"<\/th>";
   str_html += '<td>'+tr_text_new[1]+'<\/td>';
   str_html += '<td>' +tr_text_new[2]+ '<\/td>';
   str_html += '<td>' +tr_text_new[3]+ '<\/td>';
   str_html += '<td>' +tr_text_new[4]+ '<\/td>';
   str_html += "<td style='text-align:center;'>";
   str_html += '<span class=\"btn btn-warning btn-sm\" onclick="PhaseRemove.Revise(this);" title="'+ tr_text_new[1] +'"><span class="glyphicon glyphicon-pencil" title="修改時相"></span><\/span>';
   str_html += " ";
   str_html += '<span class=\"btn btn-danger btn-sm\" onclick="PhaseRemove.Delete(this);" title="'+ tr_text_new[1] +'"><span class="glyphicon glyphicon-trash" title="刪除時相"></span><\/span>';
   str_html += "<\/td>";
   str_html += "<\/tr>";
   $(target).parent().parent().replaceWith(str_html);
}
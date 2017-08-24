/**
 * Created by CCT on 2014/8/26.
 */
function returnStatus() {
   this.Initialize = Initialize;
   function Initialize() {
   }
   this.downStatus = downStatus;
   function downStatus(inputdata){
      success_fail(inputdata);
   }
   this.queryStatus = queryStatus;
   function queryStatus(key, inputdata){
      show_result(key, inputdata);
   }
   function success_fail(inputdata){
      var status_info =$('.status');
       var str_control="";
       switch (inputdata.CommandID){
           case 'BF11':
               str_control+="優先號誌";
               break;
           case '5014':
               str_control+="行人倒數";
               break;
           case '5015':
               str_control+="行車倒數";
               break;
           case '0F10':
               str_control+="重啟設備";
               break;
           case '0F15':
               str_control+="設備密碼";
               break;
           case '0F12':
               str_control+="設備日期時間";
               break;
           case '0F92':
               str_control+="設備日期時間";
               break;
           case '0F14':
               str_control+="設備周期";
               break;
           case '5F10':
               str_control+="設備模式";
               break;
           case '5F3F':
               str_control+="燈態步階周期";
               break;
           case '0F91':
               str_control+="通訊裝置";
               if(inputdata.MsgTypeNo ===8){
                 inputdata.key = '0F80';
               }else{
                 inputdata.key = '0F81';
               }
               break;
           default :
               str_control+=inputdata.CommandID;
               break;
       }
       if(inputdata.key == '0F80'){
           var str_alert ="";
           str_alert +='<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert">' +
               '<span aria-hidden="true">&times;</span><span class="sr-only"></span></button><strong>設定 '+str_control+' 至路口 '+inputdata.LCN+' 已成功！</strong></div>';
           status_info.append(str_alert);
       }if(inputdata.key == '0F81'){
           var str_alert ="";
           str_alert +='<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert">' +
               '<span aria-hidden="true">&times;</span><span class="sr-only"></span></button><strong>設定 '+str_control+' 至路口 '+inputdata.LCN+' 失敗。</strong>(請確認下傳內容。)</div>';
           status_info.append(str_alert);
           console.log('0F81 @returnStatus');
       }
   }
   function show_result(key, inputdata){
    var query_result = $('#query_result');
    var str_query ='<div class="col-sm-3 col-md-3"><span><span class="label label-info">';
    switch(key){
      case '0FC5':
      str_query +='密碼</span></br></span><span>'+inputdata.Password;
      break;
      case '0FC2':
      str_query +='日期時間</span></br></span><span>民國 '+inputdata.Year+'/'+inputdata.Month+'/'+inputdata.Day+' '+inputdata.Hour+':'+inputdata.Min+':'+inputdata.Sec;
      break;
      case '5FC0':
      str_query +='模式查詢</span></br></span><span>';
      str_query +='<strong>控制策略: </strong>'+inputdata.ControlStrategy+'<br>';
      str_query +='<strong>策略有效時間: </strong>'+inputdata.EffectTime+'分<br>';
      str_query +='(策略代碼請查詢V3協定)';
      break;
      case '0FC3':
      str_query +='韌體查詢</span></br></span><span>';
      str_query +='<strong>日期: </strong>'+inputdata.Year+'/'+inputdata.Month+'/'+inputdata.Day+'<br>';
      str_query +='<strong>訊息等級: </strong>'+inputdata.CommandSet+'<br>';
      str_query +='<strong>公司名稱: </strong>'+inputdata.CompanyID+'<br>';
      str_query +='<strong>韌體版本: </strong>'+inputdata.Version;
      break;
      case '0FC0':
      str_query +='設備編號</span></br></span><span>'+inputdata.result[0].EquipmentID;
      break;
      case '50C5':
      str_query +='行車倒數狀態</span></br></span><span>'+(inputdata.SetOnOff===0 ? '<strong>開</strong>':'<strong>關</strong>');
      break;
      case '50C4':
      str_query +='行人倒數狀態</span></br></span><span>'+(inputdata.SetOnOff===0 ? '<strong>開</strong>':'<strong>關</strong>');
      break;
      case '5FEF':
      var cycle = cycle_txt(inputdata.TransmitCycle);
      if(inputdata.TransmitType ===1){
      str_query +='燈態回傳週期</span></br></span><span><strong>'+cycle+'</strong>';
      }else{
      str_query +='步階回傳週期</span></br></span><span><strong>'+cycle+'</strong>';
      }
      break;
      case '0FC4':
      var hardwarecycle = parseInt(inputdata.HardwareCycle)
      var txt = cycle_txt(hardwarecycle);
      str_query +='設備回傳週期</span></br></span><span><strong>'+txt+'</strong>';
      break;
      default:
      console.log('Data not be assign @ query_result.');
      break;
    }
    function cycle_txt(cycle){
      var str_cycle='';
      switch(cycle){
        case 1:
        str_cycle ='1秒';
        break;
        case 2:
        str_cycle ='2秒';
        break;
        case 3:
        str_cycle ='5秒';
        break;
        case 4:
        str_cycle ='1分鐘';
        break;
        case 5:
        str_cycle ='5分鐘';
        break;
        default:
        str_cycle ='00 error @returnStatus cycle_txt';
        break;
      }
      return str_cycle;
    }
    str_query +='</span></div>';
    query_result.append(str_query);
   }
}
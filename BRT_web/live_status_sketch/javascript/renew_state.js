/**
* Created by hong on 2014/4/17.
*/

function RenewState() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
       this.dir_flag = 0;
       var flag= $('#check')[0].attributes[3].value;
       if(flag == '0'){
          this.dir_flag =0;
       }else if(flag == '1'){
           this.dir_flag =1;
       }else{
           console.log('Dir Error renew_state.js');
       }
    }
    this.busData = busData;
    function busData(inpudata) {
       dataProcess(inpudata, this.dir_flag);
        var lcn_original = String(inpudata.LCN);
        var lcn = parseInt(lcn_original.substr(2,2));
        TableData.InputData[lcn] = inpudata;
    }

   function dataProcess(inpudata, flag){
      var lcn = inpudata.LCN;
      var busid = inpudata.BRTID;
      var layer = Math.ceil(lcn/4);
      var domain_bus =$('div.divmap');
      var x = $('#circle'+lcn).offset().left;
      var y = $('#circle'+lcn).offset().top;
      var str_img = "";
      if(flag ==0){
         if(inpudata.Point >=0 && inpudata.Point <8){ // 0~7
            if(inpudata.DIR ==0){
               if(layer%2 !=0){
                  var img_src0="live_status_sketch/images/bus_0.png";
                  switch (inpudata.Point){
                     case 0:
                        str_img+='<img src='+img_src0+' class="'+busid+'01" title="BUS_id: '+inpudata.BRTID+' 接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-130) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'01').remove();
                        domain_bus.append(str_img);
                        break;
                     case 1:
                        str_img+='<img src='+img_src0+' class="'+busid+'01" title="BUS_id: '+inpudata.BRTID+' 接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-110) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'01').remove();
                        domain_bus.append(str_img);
                        break;
                     case 2:
                        str_img+='<img src='+img_src0+' class="'+busid+'01" title="BUS_id: '+inpudata.BRTID+'接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-90) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'01').remove();
                        domain_bus.append(str_img);
                        break;
                     case 3:
                        str_img+='<img src='+img_src0+' class="'+busid+'01" title="BUS_id: '+inpudata.BRTID+'接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-75) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'01').remove();
                        domain_bus.append(str_img);
                        break;
                     case 4:
                        str_img+='<img src='+img_src0+' class="'+busid+'01" title="BUS_id: '+inpudata.BRTID+'即將通過路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-50) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'01').remove();
                        domain_bus.append(str_img);
                        break;
                     case 5:
                        str_img+='<img src='+img_src0+' class="'+busid+'01" title="BUS_id: '+inpudata.BRTID+'通過路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-30) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'01').remove();
                        domain_bus.append(str_img);
                        break;
                     case 6:
                        str_img+='<img src='+img_src0+' class="'+busid+'01" title="BUS_id: '+inpudata.BRTID+'已通過路口 '+lcn+' @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x+0) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'01').remove();
                        domain_bus.append(str_img);
                        break;
                     case 7:
                        $('.'+busid+'01').remove();
                        break;
                  }
               }
               else if(layer%2 ==0){
                  var img_src0="live_status_sketch/images/bus_1.png";
                  switch (inpudata.Point){
                     case 0:
                        str_img+='<img src='+img_src0+' class="'+busid+'01" title="BUS_id: '+inpudata.BRTID+' 接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x+100) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'01').remove();
                        domain_bus.append(str_img);
                        break;
                     case 1:
                        str_img+='<img src='+img_src0+' class="'+busid+'01" title="BUS_id: '+inpudata.BRTID+' 接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x+80) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'01').remove();
                        domain_bus.append(str_img);
                        break;
                     case 2:
                        str_img+='<img src='+img_src0+' class="'+busid+'01" title="BUS_id: '+inpudata.BRTID+'接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x+65) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'01').remove();
                        domain_bus.append(str_img);
                        break;
                     case 3:
                        str_img+='<img src='+img_src0+' class="'+busid+'01" title="BUS_id: '+inpudata.BRTID+'接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x+40) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'01').remove();
                        domain_bus.append(str_img);
                        break;
                     case 4:
                        str_img+='<img src='+img_src0+' class="'+busid+'01" title="BUS_id: '+inpudata.BRTID+'即將通過路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x+10) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'01').remove();
                        domain_bus.append(str_img);
                        break;
                     case 5:
                        str_img+='<img src='+img_src0+' class="'+busid+'01" title="BUS_id: '+inpudata.BRTID+'通過路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-15) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'01').remove();
                        domain_bus.append(str_img);
                        break;
                     case 6:
                        str_img+='<img src='+img_src0+' class="'+busid+'01" title="BUS_id: '+inpudata.BRTID+'已通過路口 '+lcn+' @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-30) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'01').remove();
                        domain_bus.append(str_img);
                        break;
                     case 7:
                        $('.'+busid+'01').remove();
                        break;
                  }
               }
            }
            else if(inpudata.DIR ==1){}
            else{
               console.log('異常 -- DIR != 0 || 1 -- '+lcn);
            }
         }else{ // 8
            if(inpudata.Point ==8){
               console.log('異常 Point =8 -- 路口: '+lcn);
            }else{
               console.log('異常 Point !=0~8 -- 路口: '+lcn);
            }
         }
      }
      else if(flag ==1){
         if(inpudata.Point >=0 && inpudata.Point <8){ // 0~7
            if(inpudata.DIR ==0){}
            else if(inpudata.DIR ==1){
               if(layer%2 !=0){
                  var img_src1="live_status_sketch/images/bus_1.png";
                  switch (inpudata.Point){
                     case 0:
                        str_img+='<img src='+img_src1+' class="'+busid+'02" title="BUS_id: '+inpudata.BRTID+' 接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x+100) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'02').remove();
                        domain_bus.append(str_img);
                        break;
                     case 1:
                        str_img+='<img src='+img_src1+' class="'+busid+'02" title="BUS_id: '+inpudata.BRTID+' 接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x+80) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'02').remove();
                        domain_bus.append(str_img);
                        break;
                     case 2:
                        str_img+='<img src='+img_src1+' class="'+busid+'02" title="BUS_id: '+inpudata.BRTID+'接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x+65) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'02').remove();
                        domain_bus.append(str_img);
                        break;
                     case 3:
                        str_img+='<img src='+img_src1+' class="'+busid+'02" title="BUS_id: '+inpudata.BRTID+'接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x+40) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'02').remove();
                        domain_bus.append(str_img);
                        break;
                     case 4:
                        str_img+='<img src='+img_src1+' class="'+busid+'02" title="BUS_id: '+inpudata.BRTID+'即將通過路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x+10) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'02').remove();
                        domain_bus.append(str_img);
                        break;
                     case 5:
                        str_img+='<img src='+img_src1+' class="'+busid+'02" title="BUS_id: '+inpudata.BRTID+'通過路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-15) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'02').remove();
                        domain_bus.append(str_img);
                        break;
                     case 6:
                        str_img+='<img src='+img_src1+' class="'+busid+'02" title="BUS_id: '+inpudata.BRTID+'已通過路口 '+lcn+' @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-30) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'02').remove();
                        domain_bus.append(str_img);
                        break;
                     case 7:
                        $('.'+busid+'02').remove();
                        break;
                  }
               }
               else if(layer%2 ==0){
                  var img_src1="live_status_sketch/images/bus_0.png";
                  switch (inpudata.Point){
                     case 0:
                        str_img+='<img src='+img_src1+' class="'+busid+'02" title="BUS_id: '+inpudata.BRTID+' 接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-130) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'02').remove();
                        domain_bus.append(str_img);
                        break;
                     case 1:
                        str_img+='<img src='+img_src1+' class="'+busid+'02" title="BUS_id: '+inpudata.BRTID+' 接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-110) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'02').remove();
                        domain_bus.append(str_img);
                        break;
                     case 2:
                        str_img+='<img src='+img_src1+' class="'+busid+'02" title="BUS_id: '+inpudata.BRTID+'接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-90) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'02').remove();
                        domain_bus.append(str_img);
                        break;
                     case 3:
                        str_img+='<img src='+img_src1+' class="'+busid+'02" title="BUS_id: '+inpudata.BRTID+'接近路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-75) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'02').remove();
                        domain_bus.append(str_img);
                        break;
                     case 4:
                        str_img+='<img src='+img_src1+' class="'+busid+'02" title="BUS_id: '+inpudata.BRTID+'即將通過路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-50) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'02').remove();
                        domain_bus.append(str_img);
                        break;
                     case 5:
                        str_img+='<img src='+img_src1+' class="'+busid+'02" title="BUS_id: '+inpudata.BRTID+'通過路口 '+lcn+'中 @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x-30) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'02').remove();
                        domain_bus.append(str_img);
                        break;
                     case 6:
                        str_img+='<img src='+img_src1+' class="'+busid+'02" title="BUS_id: '+inpudata.BRTID+'已通過路口 '+lcn+' @Point '+inpudata.Point+'" style="position: absolute; left: '+ (x+0) +'px; top: '+ (y-40) +'px">';
                        $('.'+busid+'02').remove();
                        domain_bus.append(str_img);
                        break;
                     case 7:
                        $('.'+busid+'02').remove();
                        break;
                  }
               }
            }
            else{
               console.log('異常 -- DIR != 0 || 1 -- '+lcn);
            }
         }else{ // 8
            if(inpudata.Point ==8){
               console.log('異常 Point =8 -- 路口: '+lcn);
            }else{
               console.log('異常 Point !=0~8 -- 路口: '+lcn);
            }
         }
      }
      else{
          console.log('異常 flag not defined');}
   }
}
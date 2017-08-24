/**
 * Created by CCT on 2014/8/5.
 */
function CanvasDraw(){
   this.Initialize = Initialize;
   function Initialize() {
   }
   this.setCanvas=setCanvas;
   function setCanvas(intersection, dir, tsd_data, distance_data){
      set_sub_phase(dir, tsd_data, intersection, distance_data);
   }

   function loadhead(intersection){
      var domain_t = $('.panel-title');
      domain_t.empty();
      var select_time = $('#tsd_select')[0].selectedOptions[0].innerHTML;
      var str_t = "";
      str_t += intersection[0].intersection_id+" "+intersection[0].name+" 時空圖";
      str_t += "<h5 style='text-align: right'>"+select_time+"</h5>";
      domain_t.append(str_t);
   }

   function set_sub_phase(dir, tsd_data, intersection, distance_data){
      var t =0;
      for(var i=0; i<dir.length; i+=2){
         if(dir[i].sub_phase == dir[i+1].sub_phase){
            tsd_data[t].sub_phase = dir[i].sub_phase;
            ++t;
         }
      }if(t==3){
           setArray(intersection, tsd_data, distance_data);
//         diagramDraw(intersection, tsd_data, distance_data);
         loadhead(intersection);
      }else{
         var domain_d = $('div.diagram');
         domain_d.empty();
         var str_fail = "<h3>無法繪製雙向時空圖</h3>";
         domain_d.append(str_fail);
      }
   }

   function setArray(intersection, tsd_data, distance_data){
// set distance;
       console.log(distance_data);

       var sum_distance=0;
       for(var d=0; d<distance_data.length; ++d) {
           sum_distance += distance_data[d].length_distance;
       }
       console.log('SUM: '+sum_distance);

       var important_x = 0;
       if(sum_distance <=350){
           important_x =1;
       }else if(sum_distance >350 && sum_distance <=1050){
           important_x =3;
       }else{ // >1200
           important_x =5;
       }
       var dis =[];
       var d_height = [];
       var d_assum = [];
       var d_original = [];
       for(var d=0; d<=distance_data.length; ++d){
           if(d===0){
               dis[d] = 0;
               d_height[d] = 400;
               d_assum[d] = 0;
               d_original[d] =0;
           }else{
               dis[d] = Math.round((distance_data[d-1].length_distance)/important_x);
               d_height[d] = Math.round(d_height[d-1]-((distance_data[d-1].length_distance)/important_x));
               d_assum[d] = 400 - d_height[d];
               d_original[d] = d_original[d-1] + distance_data[d-1].length_distance;
           }
       }
       console.log('X: '+important_x);

       diagramDraw(intersection, tsd_data, dis, d_height, d_assum, d_original, important_x);

   }

   function diagramDraw(int_order, tsd_data, dis, d_height, d_assum, d_original, important_x){
      var domain_d = $('div.diagram');
      domain_d.empty();
      var str_d = "";
      str_d += "<canvas id='myCanvas' width='800px' height='460px'></canvas>";
      domain_d.append(str_d);

      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");

// set diagram;
      ctx.textAlign="end";
      ctx.font = "bold 20px Arial";
      ctx.fillText("distance", 100, 20);
      ctx.fillText("time", 800, 420);
      ctx.strokeStyle="black";
      ctx.lineWidth=3;
      ctx.moveTo(100, 400);
      ctx.lineTo(100, 0);
      ctx.moveTo(100, 400);
      ctx.lineTo(800, 400);
      ctx.stroke();
      ctx.beginPath(); // arrow
      ctx.lineWidth=3;
      ctx.lineJoin="miter";
      ctx.miterLimit=5;
      ctx.moveTo(780,410);
      ctx.lineTo(800,400);
      ctx.lineTo(780,390);
      ctx.moveTo(90,20);
      ctx.lineTo(100,0);
      ctx.lineTo(110,20);
      ctx.stroke();


// set intersection name;
      // var fv = 290;
      ctx.textAlign="center";
      ctx.font = "bold 16px Arial";
      var str_intersec = "";
      for(var font_index =0; font_index<3; ++font_index){
         var currentf = int_order[font_index].name;
         str_intersec += currentf;
         var fv = d_height[font_index] - 10;
         ctx.fillText(str_intersec,110,fv);
         // fv-=100;
         str_intersec = "";
      }
// set unit;
ctx.textAlign="center";
ctx.font = "12px Arial";
       for(var font=0; font<3; ++font){
           var ac_m = d_original[font];
           ctx.fillText(ac_m+'m', 80, d_height[font]+5);
       }
//       ctx.fillText("600m", 80, 200);
//       ctx.fillText("120m", 80, 360);
//       ctx.fillText("360m", 80, 280);
//       ctx.fillText("900m", 80, 100);

       ctx.fillText("100s", 250, 420);
       ctx.fillText("200s", 350, 420);
       ctx.fillText("300s", 450, 420);
       ctx.fillText("400s", 550, 420);
       ctx.fillText("500s", 650, 420);
       ctx.fillText("600s", 750, 420);


// check cycle_time;
      ctx.textAlign="end";
      ctx.font = "bold 20px Arial";
         if(tsd_data[0].cycletime == tsd_data[1].cycletime && tsd_data[0].cycletime == tsd_data[2].cycletime){
            var c_t_f = "路口週期相同: ";
            c_t_f += tsd_data[0].cycletime + " 秒";
            ctx.fillText(c_t_f ,780, 30);
         }
         else{
            ctx.fillText("!路口週期不相同",450, 140);
         }

// set green yellow red array for intersection;
      var g=[];
      var ye=[];
      var r=[];
      var offset=[];
      for(var tsd_index=0; tsd_index<3; ++tsd_index){
         var current_data = tsd_data[tsd_index];
         offset[tsd_index] = current_data.time_offset;
         switch (current_data.sub_phase){
            case 1:
               g[tsd_index] = current_data.g1;
               ye[tsd_index] = current_data.yellow1;
               r[tsd_index] = current_data.allred1 + current_data.allred2 + current_data.yellow2 + current_data.g2 +
                   current_data.allred3 + current_data.yellow3 + current_data.g3 +
                   current_data.allred4 + current_data.yellow4 + current_data.g4 +
                   current_data.allred5 + current_data.yellow5 + current_data.g5 +
                   current_data.allred6 + current_data.yellow6 + current_data.g6 +
                   current_data.allred7 + current_data.yellow7 + current_data.g7 +
                   current_data.allred8 + current_data.yellow8 + current_data.g8;
               break;
            case 2:
               g[tsd_index] = current_data.g2;
               ye[tsd_index] = current_data.yellow2;
               r[tsd_index] = current_data.allred1 + current_data.allred2 + current_data.g1 + current_data.yellow1 +
                  current_data.allred3 + current_data.yellow3 + current_data.g3 +
                  current_data.allred4 + current_data.yellow4 + current_data.g4 +
                  current_data.allred5 + current_data.yellow5 + current_data.g5 +
                  current_data.allred6 + current_data.yellow6 + current_data.g6 +
                  current_data.allred7 + current_data.yellow7 + current_data.g7 +
                  current_data.allred8 + current_data.yellow8 + current_data.g8;
               break;
            case 3:
               g[tsd_index] = current_data.g3;
               ye[tsd_index] = current_data.yellow3;
               r[tsd_index] = current_data.allred1 + current_data.allred2 + current_data.yellow2 + current_data.g2 +
                  current_data.allred3 + current_data.g1 + current_data.yellow1 +
                  current_data.allred4 + current_data.yellow4 + current_data.g4 +
                  current_data.allred5 + current_data.yellow5 + current_data.g5 +
                  current_data.allred6 + current_data.yellow6 + current_data.g6 +
                  current_data.allred7 + current_data.yellow7 + current_data.g7 +
                  current_data.allred8 + current_data.yellow8 + current_data.g8;
               break;
            case 4:
               g[tsd_index] = current_data.g4;
               ye[tsd_index] = current_data.yellow4;
               r[tsd_index] = current_data.allred1 + current_data.allred2 + current_data.yellow2 + current_data.g2 +
                  current_data.allred3 + current_data.yellow3 + current_data.g3 +
                  current_data.allred4 + current_data.g1 + current_data.yellow1 +
                  current_data.allred5 + current_data.yellow5 + current_data.g5 +
                  current_data.allred6 + current_data.yellow6 + current_data.g6 +
                  current_data.allred7 + current_data.yellow7 + current_data.g7 +
                  current_data.allred8 + current_data.yellow8 + current_data.g8;
               break;
            case 5:
               g[tsd_index] = current_data.g5;
               ye[tsd_index] = current_data.yellow5;
               r[tsd_index] = current_data.allred1 + current_data.allred2 + current_data.yellow2 + current_data.g2 +
                  current_data.allred3 + current_data.yellow3 + current_data.g3 +
                  current_data.allred4 + current_data.yellow4 + current_data.g4 +
                  current_data.allred5 + current_data.g1 + current_data.yellow1 +
                  current_data.allred6 + current_data.yellow6 + current_data.g6 +
                  current_data.allred7 + current_data.yellow7 + current_data.g7 +
                  current_data.allred8 + current_data.yellow8 + current_data.g8;
               break;
            case 6:
               g[tsd_index] = current_data.g6;
               ye[tsd_index] = current_data.yellow6;
               r[tsd_index] = current_data.allred1 + current_data.allred2 + current_data.yellow2 + current_data.g2 +
                  current_data.allred3 + current_data.yellow3 + current_data.g3 +
                  current_data.allred4 + current_data.yellow4 + current_data.g4 +
                  current_data.allred5 + current_data.yellow5 + current_data.g5 +
                  current_data.allred6 + current_data.g1 + current_data.yellow1 +
                  current_data.allred7 + current_data.yellow7 + current_data.g7 +
                  current_data.allred8 + current_data.yellow8 + current_data.g8;
               break;
            case 7:
               g[tsd_index] = current_data.g7;
               ye[tsd_index] = current_data.yellow7;
               r[tsd_index] = current_data.allred1 + current_data.allred2 + current_data.yellow2 + current_data.g2 +
                  current_data.allred3 + current_data.yellow3 + current_data.g3 +
                  current_data.allred4 + current_data.yellow4 + current_data.g4 +
                  current_data.allred5 + current_data.yellow5 + current_data.g5 +
                  current_data.allred6 + current_data.yellow6 + current_data.g6 +
                  current_data.allred7 + current_data.g1 + current_data.yellow1 +
                  current_data.allred8 + current_data.yellow8 + current_data.g8;
               break;
            case 8:
               g[tsd_index] = current_data.g8;
               ye[tsd_index] = current_data.yellow8;
               r[tsd_index] = current_data.allred1 + current_data.allred2 + current_data.yellow2 + current_data.g2 +
                  current_data.allred3 + current_data.yellow3 + current_data.g3 +
                  current_data.allred4 + current_data.yellow4 + current_data.g4 +
                  current_data.allred5 + current_data.yellow5 + current_data.g5 +
                  current_data.allred6 + current_data.yellow6 + current_data.g6 +
                  current_data.allred7 + current_data.yellow7 + current_data.g7 +
                  current_data.allred8 + current_data.g1 + current_data.yellow1 ;
               break;
            default :
               console.log('sub_phase err - tsd canvasDraw');
               break;
         }
      }
//      offset[0] = 0;
// red & green draw
      var left=[];
      var right=[];
      var offsetn = 0;
      // var v = 400;
      for(var j=0; j<3; ++j){
         var gn = (g[j]*1.5);
         var yn = (ye[j]*1.5);
         var rn = (r[j]*1.5);
         offsetn = offset[j]*1.5;
         var s = 100+offsetn;
         left[j] = (offsetn+rn)/1.5;
                     var v = d_height[j];
         for(var i=0; i<5; ++i){
            ctx.beginPath();
            ctx.strokeStyle="#DC143C";
            ctx.lineWidth=12;
            ctx.moveTo(s, v);
            ctx.lineTo((s+rn), v);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle="#32CD32";
            ctx.lineWidth=12;
            ctx.moveTo(s+rn, v);
            ctx.lineTo((s+rn+gn), v);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle="#FFD700";
            ctx.lineWidth=12;
            ctx.moveTo((s+rn+gn), v);
            ctx.lineTo((s+rn+gn+yn), v);
            ctx.stroke();
            s += rn+gn+yn;
         }
         // console.log(s);
         // console.log(rn);
         // console.log(gn);
         // console.log(yn);
         right[j] = ((rn+gn+yn)/1.5)+ (offsetn/1.5);
         // right[j] = ((rn+gn+yn)/3);
         // right[j] = (s-(rn+gn+yn))/3;
//         right_interval[j] = ((s-100)/3 - g[j]);
         ctx.beginPath();
         ctx.strokeStyle="#808080";
         ctx.lineWidth=12;
         ctx.moveTo(100, v);
         ctx.lineTo((100+offsetn), v);
         ctx.stroke();
         // v -= 100;
      }
var dir_gwidth = {
  d0:0,
  d1:0
};
// speed line draw direction_0
// 300m = 100px; 1sec = 1.5px;
// speed: 12 m/sec
// y = 12x + b
// (y/3) = 12x*1.5 + a

      // for left line;
      // var dis[l]=0;
      var currentx=[];
      var max=0;
      var a = 0;
      for(var l=0; l<3; ++l){
         var b=0;
         b= d_assum[l] - (left[l]*12);
         currentx[l]= (400 - b)/12;
         if(l!==0){
            if(currentx[l] > max){
               max= currentx[l];
               a= Math.round(b);
            }
         }
         if(l===0){
            max= currentx[0];
            a= Math.round(b);
         }
         // y+=100;
      }
      // y=0;
      var check_max=[];
      for(var m=0; m<3; ++m){
         var y = d_assum[m];
         check_max[m] = (y- a)/12;
         // y+=100;
      }

      // for right line
      // y=0;
      var currentx_r=[];
      var min=0;
      var a2 = 0;
      for(var rf=0; rf<3; ++rf){
         var b2=0;
         b2= d_assum[rf] - (right[rf]*12);
         currentx_r[rf]= (400 - b2)/12;
         // y+=100;
         if(rf===0){
            min= currentx_r[rf];
            a2= Math.round(b2);
         }
         else if(rf!==0 && currentx_r[rf] < min){
               min= currentx_r[rf];
               a2= Math.round(b2);
         }
      }

      // y=0;
      var check_min=[];
      for(var m=0; m<3; ++m){
         var y = d_assum[m];
         check_min[m] = (y- a2)/12;
         // y+=100;
      }

      if(check_max[0]>=right[0]||check_max[1]>=right[1]||check_max[2]>=right[2]){
         ctx.font = "22px Arial";
         ctx.textAlign="center";
         ctx.fillText("一次通過機會較低",400,70);
      }else{
         ctx.beginPath();
         ctx.strokeStyle="#0000FF";
         ctx.lineWidth=3;
         var xa= (0- a)/12;
         ctx.moveTo((100+max*1.5), 0);
         ctx.lineTo((100+xa*1.5), 400);
         ctx.stroke();
         ctx.font = "italic 16px Arial bold";
         ctx.textAlign="end";
         ctx.fillText("速率: 43.2 km/hr",780,50);
          ctx.font = "italic 12px Arial bold";
          ctx.textAlign="start";
          ctx.fillText("比例: 1pixel:"+important_x+"m, 1.5pixel:1second",10,450);
          if(check_min[0]<=left[0]||check_min[1]<=left[1]||check_min[2]<=left[2]){
            ctx.font = "22px Arial";
            ctx.textAlign="center";
            ctx.fillText("無法繪製另一條線",400,90);
         }else{
            ctx.beginPath();
            ctx.strokeStyle="#0000FF";
            ctx.lineWidth=3;
            var xb= (0- a2)/12;
            ctx.moveTo((100+min*1.5), 0);
            ctx.lineTo((100+xb*1.5), 400);
            ctx.stroke();
            ctx.font = "14px Arial bold";
            ctx.textAlign="end";
            dir_gwidth.d0 = Math.abs(max-min);

            // speed line draw direction_1
            // for left line;
            // var y=0;
            // d_assum.reverse();
            var currentx=[];
            var max=0;
            var a = 0;
            for(var l=0; l<3; ++l){
               var b=0;
               var y = d_assum[l];
               b= (-y) - (left[l]*12);
               currentx[l]= (0 - b)/12;
               if(l!=0){
                  if(currentx[l] > max){
                     max= currentx[l];
                     a= Math.round(b);
                  }
               }
               if(l==0){
                  max= currentx[0];
                  a= Math.round(b);
               }
               // y+=100;
            }

            // for right line
            // y=0;
            var currentx_r=[];
            var min=0;
            var a2 = 0;
            for(var rf=0; rf<3; ++rf){
               var b2=0;
               var y = d_assum[rf];
               b2= (-y) - (right[rf]*12);
               currentx_r[rf]= (0 - b2)/12;
               // y+=100;
               if(rf===0){
                  min= currentx_r[rf];
                  a2= Math.round(b2);
               }
               else{
                  if (currentx_r[rf]<min) {
                  min= currentx_r[rf];
                  a2= Math.round(b2);
                  }
               }
               console.log(b2);
               console.log(y);
               console.log(currentx_r[rf]);
            }

            ctx.beginPath();
            ctx.strokeStyle="#1E90FF";
            ctx.lineWidth=3;
            var xa= (-400- a)/12;
            ctx.moveTo((100+max*1.5), 400);
            ctx.lineTo((100+xa*1.5), 0);
            ctx.stroke();
            ctx.font = "14px Arial bold";
            ctx.textAlign="end";

            ctx.beginPath();
            ctx.strokeStyle="#1E90FF";
            ctx.lineWidth=3;
            var xb= (-400- a2)/12;
            ctx.moveTo((100+min*1.5), 400);
            ctx.lineTo((100+xb*1.5), 0);
            ctx.stroke();
            ctx.font = "14px Arial bold";
            ctx.textAlign="end";
            dir_gwidth.d1 = Math.abs(max-min);
         }
         }

      tableDraw(int_order, tsd_data, g, ye, r, offset, d_original, dir_gwidth);
   }

   function tableDraw(intersection, tsd_data, g, ye, r, offset, d_original, dir_gwidth){
      var domain_i = $('div.fortable');
      domain_i.empty();
      var str_table="";
      str_table +='<table class="table table-striped table-bordered" style="text-align: center">';
      str_table +='<thead><tr><th>路口</th><th>與選擇之路口間距</th><th>週期</th><th>分相</th><th>時差(灰線)</th><th>紅燈秒數(紅線)</th><th>可行走秒數(綠+黃線)</th></tr></thead>';
      str_table +='<tbody><tr><td>'+intersection[0].name+'</td><td>　- </td><td>'+tsd_data[0].cycletime+'</td><td>'+tsd_data[0].sub_phase+'</td><td>'+offset[0]+'</td><td>'+r[0]+'</td><td>'+(g[0]+ye[0])+'</td></tr>';
      str_table +='<tr><td>下一路口: '+intersection[1].name+'</td><td>'+(d_original[1])+' m</td><td>'+tsd_data[1].cycletime+'</td><td>'+tsd_data[1].sub_phase+'</td><td>'+offset[1]+'</td><td>'+r[1]+'</td><td>'+(g[1]+ye[1])+'</td></tr>';
      str_table +='<tr><td>下二路口: '+intersection[2].name+'</td><td>'+(d_original[2])+' m</td><td>'+tsd_data[2].cycletime+'</td><td>'+tsd_data[2].sub_phase+'</td><td>'+offset[2]+'</td><td>'+r[2]+'</td><td>'+(g[2]+ye[2])+'</td></tr>';
      str_table +='<tr><th>往靜宜方向綠寬帶秒數(藍線)</th><td colspan="2">'+Math.floor(dir_gwidth.d0)+'</td><th colspan="3">往台中火車站方向綠寬帶秒數(淺藍線)</th><td colspan="2">'+Math.floor(dir_gwidth.d1)+'</td></tr>';
      str_table +='</tbody></table>';

      domain_i.append(str_table);
   }
      $('#result').attr('class', 'bs-callout2');
}
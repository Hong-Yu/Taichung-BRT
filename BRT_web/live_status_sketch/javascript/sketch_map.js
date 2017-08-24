/**
 * Created by CCT on 2014/3/18.
 * Modified by Jia on 2014/7/20.
 * Draw Route_Map_SVG.
 */
function SketchMap() {
   this.SketchInitial = SketchInitial;
   function SketchInitial(){

   }
   this.set_web_socket = set_web_socket;
   function set_web_socket(ws) {
      this.web_socket = ws;
   }
   this.DrawMap = DrawMap;
   function DrawMap(input_data){
      this.DrawMapSVG(input_data);
   }

   this.DrawMapSVG = DrawMapSVG;
   function DrawMapSVG(input_data){
      var str_table="";
      var domain_map = $('.route_map');
      domain_map.empty();
      var domain_info = $('div.info');
      domain_info.empty();

      //init
      str_table += '<svg class="svgmap" viewbox = "0 0 800 1800">';
      str_table += '<text x="0" y="100" dy="30" fill="black" style="font-size: 18px;">火車站</text>';
      str_table += '<circle cx="20" cy="100" r="10" stroke="black" stroke-width="5" fill="gray" ></circle>';

      //line sketch
      str_table += '<g stroke =' + input_data.route_list[0].color + ' stroke-width="7">';
      str_table += '<path d="M 30 100 H 120 Z"/>';
      str_table += LineDrawer(input_data.route_list[0].intersection_max);
      str_table += '</g>';

      //circle sketch
      str_table += '<g stroke ="black" stroke-width="5" fill="white" >';
      str_table += CircleDrawer(input_data.route_list[0].intersection_max, input_data.equipment_order);
      str_table += '</g>';

      //text sketch
      str_table += '<g fill="black" style="font-size: 16px; text-anchor: middle;">';
      str_table += TextDrawer(input_data.int_order, input_data.equipment_order);
      str_table += '</g>';


      function LineDrawer(intersection_max){
         var str_table_line ="";
         var numline = Math.floor(intersection_max / 4);
         var numcircle = (intersection_max % 4);
         var x = 50;
         var y = 100;
         var r = 120 + 570 + 70;
         HLine(x, y, r, numline, numcircle);
         VLine(x, y, r, numline);

         function HLine(x, y, r, ln, d){
            var line_distance = (190 * d)+70;
            for(var i = 0; i< ln; ++i){
            str_table_line +='<path d="M '+ x +' '+ y +' H '+r+' Z"/>';
            y += 110;
         }
//            if(ln ==1){
//               str_table_line +='<path d="M '+ r +' '+ y +' H '+(r-(line_distance))+' Z"/>';
//            }
            if(ln % 2 ==0 && ln !=1){
               if(d == 0){
//                  str_table_line +='<path d="M '+ x +' '+ (y-100) +' H '+(x - 150)+' Z"/>';
               }
               else{
                  str_table_line +='<path d="M '+ x +' '+ y +' H '+(x+line_distance)+' Z"/>';
               }
            }
            else if(ln % 2 != 0){
               if(d == 0){
//                  str_table_line +='<path d="M '+ x +' '+ (y-100) +' H '+(x+450+150)+' Z"/>';
               }
               else{
                  str_table_line +='<path d="M '+ r +' '+ y +' H '+(r-(line_distance))+' Z"/>';
               }
            }
         }

         function VLine(x, y, r, f){
            for(var v = 1; v<=f; ++v){
               if(v == 1){
                  str_table_line +='<path d="M '+ r +' '+ y +' V '+(y+110) +' Z"/>';
               }
               if(v % 2 == 0 && v!=1){
                  str_table_line +='<path d="M '+ x +' '+ y +' V '+(y+110) +' Z"/>';
               }
               else{
                  str_table_line +='<path d="M '+ r +' '+ y +' V '+(y+110) +' Z"/>';
               }
               y +=110;
            }
         }
         return str_table_line;
      }


      function CircleDrawer(intersection_max, lcn){
         var circle = lcn.length;
         var Lcn = [];
         var c = Math.floor(circle / 4);
         var d = (circle % 4);
         var cx = 120;
         var cy = 100;
         var cxr = 120+570;
         var str_table_circle ="";
         // new order
         for (var h = 1; h<=c; ++h){
            if(h % 2 !=0){
               var ch = h*4 - 4;
               for(var left=0; left<4; ++left){
                  Lcn[ch] = parseInt(lcn[ch].intersection_id);
                  ch+=1;
               }
            }if(h % 2 ==0){
               var r = h*4 -4;
               var ch = h*4 - 1;
               for(var right=0; right<4; ++right){
                  Lcn[r] = parseInt(lcn[ch].intersection_id);
                  r+=1;
                  ch-=1;
               }
            }
         }
         if(d !=0){
            if(c%2 != 0){
               var r = c*4;
               var ch = c*4 + (d-1);
               for(var mod_lcn=0; mod_lcn<d; ++mod_lcn){
                  Lcn[r] = parseInt(lcn[ch].intersection_id);
                  r+=1;
                  ch-=1;
               }
         }if(c%2 == 0){
               var ch = c*4;
               for(var mod_lcn=0; mod_lcn<d; ++mod_lcn){
                  Lcn[ch] = parseInt(lcn[ch].intersection_id);
                  ch+=1;
               }
            }
         }
         for(var i = 1; i<=c; ++i){
            var lcn_index = i*4 -4;
            str_table_circle +='<circle id="circle'+Lcn[lcn_index]+'" cx= '+ cx + ' cy= '+ cy +' r="12" fill="white"></circle>';
            str_table_circle +='<circle id="circle'+Lcn[lcn_index+1]+'" cx= '+ (cx+190) + ' cy= '+ cy +' r="12" fill="white"></circle>';
            str_table_circle +='<circle id="circle'+Lcn[lcn_index+2]+'" cx= '+ (cx+380) + ' cy= '+ cy +' r="12" fill="white"></circle>';
            str_table_circle +='<circle id="circle'+Lcn[lcn_index+3]+'" cx= '+ (cx+570) + ' cy= '+ cy +' r="12" fill="white"></circle>';
            cy+= 110;
         }
         if(c % 2 == 0){
            if(d == 0){
               cy +=0;
            }
            else{
               for(var s = 0; s<d; ++s){
                  var lcn_index = c*4;
                  str_table_circle +='<circle id="circle'+Lcn[lcn_index]+'" cx= '+ cx + ' cy= '+ cy +' r="12" fill="white"></circle>';
                  lcn_index+=1;
                  cx += 190;
               }
            }
         }
         else if(c % 2 !=0){
            if(d == 0){
               cx = cxr;
            }
            else{
               for(var s = 0; s<d; ++s){
                  var lcn_index = c*4;
                  str_table_circle +='<circle id="circle'+Lcn[lcn_index]+'" cx= '+ cxr + ' cy= '+ cy +' r="12" fill="white"></circle>';
                  lcn_index+=1;
                  cxr -= 190;
               }
               cx = cxr;
               cxr = 690;
            }
         }
         str_table_circle +='<circle cx= '+ cx + ' cy= '+cy+' r="10" fill="gray"></circle>';
         return str_table_circle;
      }


      function TextDrawer(inputdata, equip){
         var text = inputdata;
         var ntext = text.length;
         var lntext = Math.floor(ntext/4);
         var dtext = (ntext % 4);
         var tx = 120;
         var txr = 690;
         var ty = 100;
         var t_index = 0;
         var str_table_text ="";
         for(var a = 1; a<= lntext;  ++a){
            for(var b = 1; b<= 4; ++b){
               var current_name = text[t_index].name;
               var corrid = 0;
               for(var c = 0; c< equip.length; ++c){
                  if(text[t_index].intersection_id == equip[c].intersection_id){
                     corrid = equip[c].intersection_id;
                  }
               }
               if(a % 2 ==0 && a!=1){
                  str_table_text +='<text id='+corrid+' x= '+txr+' y= '+ty+' dy="35" mark="0">'+ current_name +'</text>';
                  t_index +=1;
                  txr-=190;
               }
               else{
                  str_table_text +='<text id='+corrid+' x= '+tx+' y= '+ty+' dy="35" mark="0">'+ current_name +'</text>';
                  t_index +=1;
                  tx+=190;
               }
            }
            ty += 110;
            tx = 120;
            txr = 690;
         }
         if(lntext % 2 == 0 || lntext ==0){
            if(dtext == 0){
               tx = 120;
            }
            else{
               for(var s = 0; s<dtext; ++s){
                  var current_name = text[t_index].name;
                  var corrid = 0;
                  for(var c = 0; c< equip.length; ++c){
                     if(text[t_index].intersection_id == equip[c].intersection_id){
                        corrid = equip[c].intersection_id;
                     }
                  }
                  str_table_text +='<text id='+corrid+' x= '+tx+' y= '+ty+' dy="35" mark="0">'+ current_name +'</text>';
                  t_index +=1;
                  tx+=190;
               }
            }
         }
         else if(lntext % 2 !=0){
            if(dtext == 0){
               tx = 690;
            }
            else{
               for(var s = 0; s<dtext; ++s){
                  var current_name = text[t_index].name;
                  var corrid = 0;
                  for(var c = 0; c< equip.length; ++c){
                     if(text[t_index].intersection_id == equip[c].intersection_id){
                        corrid = equip[c].intersection_id;
                     }
                  }
                  str_table_text +='<text id='+corrid+' x= '+txr+' y= '+ty+' dy="35" mark="0">'+ current_name +'</text>';
                  t_index +=1;
                  txr-=190;
               }
               tx = txr;
            }
         }
         str_table_text +='<text x= '+tx+' y= '+ty+' dy="30" style="font-size: 18px; text-anchor: middle;">靜宜大學端</text>';
         return str_table_text;
      }


      str_table += ' </svg>';
      domain_map.append(str_table);
       addTextOnClick();
      function addTextOnClick(){
          var domain_t = $('svg g text');
          domain_t.hover(
              function(){
                  $(this).css({"cursor":"pointer", "fill": "SeaGreen"});
              },
              function(){
                  $(this).css({"fill":"black"});
              });
          domain_t.attr('onclick', 'TableDataInsert.TableInfo(this)');
      }
      console.log('map is ready, start push live data. send 400-7 & 400-9 -- @ sketch_map.js');
      // Start Request when map is ready
      RequestLiveData(this.web_socket);
      RequestLightStatus(this.web_socket);
      function RequestLiveData(web_socket){
         var json_data = {};
         json_data.FunctionNo = 400;
         json_data.MsgTypeNo = 7;
         var json = JSON.stringify(json_data);
         web_socket.Send(json);
      }
      function RequestLightStatus(web_socket) {
         var json_data = new Object;
         json_data.FunctionNo = 400;
         json_data.MsgTypeNo = 9;
         var json = JSON.stringify(json_data);
         web_socket.Send(json);
      }
   }//end DrawMapSVG
}//end sketch_map.js
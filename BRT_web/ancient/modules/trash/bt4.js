var bt4=function(){

   $('.bottomInfo').empty();
   // 基本版型
   $('ul.nav').empty()
      .append('<li class="active"><a href="#">首頁</a></li>')
      .append('<li class="active"><a href="#">排程</a></li>')
      .append('<li class="active"><a href="#">路口參數</a></li>');

   $('table td.bottomInfo').hide();//.css('height','0px');
   qmap=$('#centerview').empty().css('background-color','transparent');
   qmap.append('\
			<div style="position:relative;z-index:1;">\
			<span class="btn btn-success" style="float:left;margin:3px;font-size:12pt;">新增時段</span>\
			<!--span class="btn btn-success lcn_calculate" style="float:right;margin:3px;font-size:12pt;" data-toggle="button">行事曆</span-->\
			<ul class="nav nav-tabs segtype_tab">\
				<li class="active">\
					<a style="cursor: pointer;" onclick="$(this).parent().parent().find(\'li\').attr(\'class\',\'\');$(this).parent().attr(\'class\',\'active\');"><span style="color:#303030;">平日(6)</span></a>\
				</li>\
				<li>\
					<a style="cursor: pointer;" onclick="$(this).parent().parent().find(\'li\').attr(\'class\',\'\');$(this).parent().attr(\'class\',\'active\');"><span style="color:orangered;">例假日(7)</span></a>\
				</li>\
				<li>\
					<a style="cursor: pointer;" onclick="$(this).parent().parent().find(\'li\').attr(\'class\',\'\');$(this).parent().attr(\'class\',\'active\');"><span style="color:brown;">特別日 1(8)</span></a>\
				</li>\
				<li>\
					<a style="cursor: pointer;" onclick="$(this).parent().parent().find(\'li\').attr(\'class\',\'\');$(this).parent().attr(\'class\',\'active\');"><span style="color:darkgreen;">特別日 2(9)</span></a>\
				</li>\
			</ul>\
			<div style="position:absolute;right:0px;top:0px;">\
				<select class="span3" style="margin:2px;font-size:12pt;font-weight:bold;width:150px;">\
					<option>忠明路口</option>\
					<option>英才路口</option>\
					<option>五權路口</option>\
				</select>\
			</div>\
			</div>\
		');

   qmap.append(
      '<div style="height:100%;padding:10px;padding-top:10px;">\
          <a class="calender_insert_pointer" style="display:none;"></a>\
          <a class="data_header_insert_point" style="display:none;"></a>\
          \
          <div style="height:100px;text-align:right;clear:both;">\
              <span class="btn btn-large btn-inverse update_1">更新</span>\
              <span class="btn btn-large btn-inverse abc">放棄</span>\
              <span class="btn btn-large btn-inverse">保存</span>\
          </div>\
      </div>'
   );


   qmap.find('span.update_1').click(function(e){
      var PORT_client_tc = 8888;
      var HOST_client_tc = '192.168.1.228';

      var dgram_client_tc = require('dgram');
      var server = dgram_client_tc.createSocket('udp4');

      server.on('listening', function () {
         var address = server.address();
         console.log('UDP Server listening on ' + address.address + ":" + address.port);
      });

      server.on('message', function (message, remote) {
         console.log(remote.address + ':' + remote.port +' - ' + message);
         //io.sockets.emit('show','Client From TC_TCP', String(message));
      });
      server.bind(PORT_client_tc, HOST_client_tc);
//           //var socket = io.connect('http://192.168.1.205:8081');
//           var socket = io.connect('http://192.168.1.228:8888');
//           socket.on('connect', function() {
//              //socket.emit('connectsuccess');
//              var order;
//              socket.emit('sendData',order)
//           });
//           socket.on('getData', function(data_json) {
//              console.log(data_json);
//              //var cycle_val = JSON.parse(data_json).cycle;
//              //var delay_val = JSON.parse(data_json).delay;
//
//              //var myObject =  JSON.parse(data_json).green_phase;
//              console.log(myObject[0].phase);
//              $('table.mainbody').find('input[type=number]:eq(1)').val(myObject[0].phase);
//              $('table.mainbody').find('input[type=number]:eq(2)').val(myObject[1].phase);
      $('table.mainbody').find('input[type=number]:eq(3)').val(myObject[2].phase);
//              $('table.mainbody').find('input[type=number]:eq(4)').val(myObject[3].phase);
//              $('table.mainbody').find('input[type=number]:eq(5)').val(myObject[4].phase);
//              $('table.mainbody').find('input[type=number]:eq(6)').val(myObject[5].phase);
//              $('table.mainbody').find('input[type=number]:eq(7)').val(cycle_val);
//              $('table.mainbody').find('input[type=number]:eq(8)').val(delay_val);
//              for (var pajse_index = 0; pajse_index < 6; ++pajse_index) {
//                 console.log(pajse_index);

      //var value = myObject[pajse_index].phase;
      //console.log(value);

      //}

      //});

   });



   $('\
			<div style="clear:both;text-align:right;margin:5px;">\
				<span class="btn btn-deltime">刪除選取</span>\
				<span class="btn btn-addtime">新增時間</span>\
			</div>\
		').insertBefore(qmap.find('a.data_header_insert_point'));		// 插入點;

   $('\
			<table class="table table-bordered mainbody" id="timer_plan">\
				<thead>\
					<tr class="header">\
						<th style="color:blue;text-align:center;font-size:12pt;font-weight:bold;cursor:pointer;" class="display-btn"><span class="btn-icon icon-plus"></span></th>\
						<th style="color:blue;text-align:center;font-size:12pt;font-weight:bold;width:174px;" colspan="3">計畫編號與起始時間</th>\
						<th style="color:blue;text-align:center;font-size:12pt;font-weight:bold;width:630px;" colspan="2">時制設定</th>\
					</tr>\
				</thead>\
				<tbody></tbody>\
			</table>\
		').insertAfter(qmap.find('a.data_header_insert_point'));		// 插入點;

   qmap.find('ul.segtype_tab li').contextmenu(function(e){
      $(document).unbind('click');$(document).click(function(){$('div.segtype_popmenu').remove();})
      $('div.segtype_popmenu').remove();
      var popmenu=$('\
			<div class="segtype_popmenu">\
				<div class="btn">改變顏色</div>\
			</div>\
			').css({
            position:'absolute',
            left:e.pageX,
            top:e.pageY+20,
            zIndex:1000,
            width:100,
         }).appendTo($('body'));

      return false;
   });

   // 萬年曆,萬年曆的資料填寫程式
   var create_calendar_ui=function(){
      var calendar_container=$('<div class="calendar_container" oncontextmenu="return false;" style="-webkit-user-select: none;clear:both;width:100%;position:relative;height:220px;margin-bottom:10px;"></div>');
      calendar_container.append('\
			<table class="table-bordered table table-hover scalendar sc1" style="width: 49%;height:220px;float:left;margin-left:0px;border-collapse:collapse"><tbody>\
				<tr><th class="btn-info cleft" style="cursor:pointer;"><span class="icon-backward" style="width:20px;height:20px;"></span></th><th colspan="6" class="theader btn-warning"></th></tr>\
				<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>\
				<tr><td class="d0"></td><td class="d1"></td><td class="d2"></td><td class="d3"></td><td class="d4"></td><td class="d5"></td><td class="d6"></td></tr>\
				<tr><td class="d0"></td><td class="d1"></td><td class="d2"></td><td class="d3"></td><td class="d4"></td><td class="d5"></td><td class="d6"></td></tr>\
				<tr><td class="d0"></td><td class="d1"></td><td class="d2"></td><td class="d3"></td><td class="d4"></td><td class="d5"></td><td class="d6"></td></tr>\
				<tr><td class="d0"></td><td class="d1"></td><td class="d2"></td><td class="d3"></td><td class="d4"></td><td class="d5"></td><td class="d6"></td></tr>\
				<tr><td class="d0"></td><td class="d1"></td><td class="d2"></td><td class="d3"></td><td class="d4"></td><td class="d5"></td><td class="d6"></td></tr>\
				<tr><td class="d0"></td><td class="d1"></td><td class="d2"></td><td class="d3"></td><td class="d4"></td><td class="d5"></td><td class="d6"></td></tr>\
			</tbody></table>\
		');
      calendar_container.append('\
			<table class="table-bordered table table-hover scalendar sc2" style="width: 49%;height:200px;float:right;margin-right:0px;border-collapse:collapse"><tbody>\
				<tr><th colspan="6" class="theader btn-warning"></th><th class="btn-info cright" style="cursor:pointer;"><span class="icon-forward" style="width:20px;height:20px;"></span></th></tr>\
				<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>\
				<tr><td class="d0"></td><td class="d1"></td><td class="d2"></td><td class="d3"></td><td class="d4"></td><td class="d5"></td><td class="d6"></td></tr>\
				<tr><td class="d0"></td><td class="d1"></td><td class="d2"></td><td class="d3"></td><td class="d4"></td><td class="d5"></td><td class="d6"></td></tr>\
				<tr><td class="d0"></td><td class="d1"></td><td class="d2"></td><td class="d3"></td><td class="d4"></td><td class="d5"></td><td class="d6"></td></tr>\
				<tr><td class="d0"></td><td class="d1"></td><td class="d2"></td><td class="d3"></td><td class="d4"></td><td class="d5"></td><td class="d6"></td></tr>\
				<tr><td class="d0"></td><td class="d1"></td><td class="d2"></td><td class="d3"></td><td class="d4"></td><td class="d5"></td><td class="d6"></td></tr>\
				<tr><td class="d0"></td><td class="d1"></td><td class="d2"></td><td class="d3"></td><td class="d4"></td><td class="d5"></td><td class="d6"></td></tr>\
			</tbody></table>\
		');
      calendar_container.find('td').append($('<div></div>'));

      calendar_container.find('th.cleft').click(function(e){
         bt4.year_mon.month-=1;
         if(bt4.year_mon.month<=0){
            bt4.year_mon.month=12;
            bt4.year_mon.year-=1;
         }
         create_calendar_ui.create_calendar(bt4.year_mon.year,bt4.year_mon.month);
      });

      calendar_container.find('th.cright').click(function(e){
         bt4.year_mon.month+=1;
         if(bt4.year_mon.month>=13){
            bt4.year_mon.month=1;
            bt4.year_mon.year+=1;
         }
         create_calendar_ui.create_calendar(bt4.year_mon.year,bt4.year_mon.month);
      });

      return calendar_container;
   };
   create_calendar_ui.create_calendar=function(year,m){
      var cell_index=0;
      var cal=getYearFirstDate(year,m,1);
      var cal_tds=$('table.scalendar.sc1').find('td').find('div').empty().attr('date','').attr('index','').css('padding','0px').css('position','relative');
      var day=1;
      for(var i=0;i<cal_tds.length;i++){
         if($(cal_tds[i]).parent().attr('class')=='d'+cal.firstDay && day==1){
            $(cal_tds[i])
               .attr('date',year+'-'+( m<10 ? '0'+m : m )+'-'+( day<10 ? '0'+day : day ) )
               .attr('index',cell_index)
               .text(day);
            day+=1;
            cell_index+=1;
         }
         else if(day>1){
            $(cal_tds[i])
               .attr('date',year+'-'+( m<10 ? '0'+m : m )+'-'+( day<10 ? '0'+day : day ) )
               .attr('index',cell_index)
               .text(day);
            day+=1;
            cell_index+=1;
         }

         if(day>cal.monthDays) break;
      };

      $('table.scalendar.sc1').find('th.theader').text(year+'-'+( m<10 ? '0'+m : m) );

      var _m = ( m+1>12 ? m+1-12 : m+1 );
      var _year= ( m+1>12 ? year+1 : year );

      var cal=getYearFirstDate(_year,_m,1);
      var cal_tds=$('table.scalendar.sc2').find('td').find('div').empty().attr('date','').attr('index','').css('padding','0px').css('position','relative');
      var day=1;
      for(var i=0;i<cal_tds.length;i++){
         if($(cal_tds[i]).parent().attr('class')=='d'+cal.firstDay && day==1){
            $(cal_tds[i])
               .attr('date',year+'-'+( m<10 ? '0'+m : m )+'-'+( day<10 ? '0'+day : day ) )
               .attr('index',cell_index)
               .text(day);
            day+=1;
            cell_index+=1;
         }
         else if(day>1){
            $(cal_tds[i])
               .attr('date',year+'-'+( m<10 ? '0'+m : m )+'-'+( day<10 ? '0'+day : day ) )
               .attr('index',cell_index)
               .text(day);
            day+=1;
            cell_index+=1;
         }

         if(day>cal.monthDays) break;
      };

      $('table.scalendar.sc2').find('th.theader').text(_year+'-'+(_m<10 ? '0'+_m : _m) );

      // 紀錄 flag, 之後要用來操作用
      bt4.year_mon={ year:year, month:m };

      // 當顯示日期建立好後, 設定日期拉選的 Script
      // 可能要改成加在 div>div底部
      $('table.scalendar td div:not([date=])').css('position','relative').unbind('mousedown');		// 要取消之前的, 不然會重複觸發
      $('table.scalendar td div:not([date=])').mousedown(function(e){
         var start_idx,end_idx;
         start_idx=parseInt($(e.currentTarget).attr('index'));

         $('table.scalendar td div:not([date=])').unbind('mouseup');

         var _hh;$('table.scalendar td div:not([date=])').mouseup(_hh=function(ee){

            end_idx=parseInt( $(ee.currentTarget).hasClass('active') ? $(ee.currentTarget).parent().attr('index') : $(ee.currentTarget).attr('index') );

            _hh ? $('table.scalendar td div:not([date=])').unbind('mouseup',_hh) : undefined;

            var tmp;if(start_idx>end_idx){
               tmp=start_idx;
               start_idx=end_idx;
               end_idx=tmp;
            };

            // 設定日期, 刪除底部 Div>Div 的標示
            if(ee.button==0){
               for(var i=start_idx;i<=end_idx;i++){
                  var _t=$('table.scalendar td div[index='+i+']:not([date=])');
                  if(_t.find('div.active').length>0) _t.find('div.active').remove();
                  _t.append(
                     $('<div class="active"></div>').css({
                        width:'100%',
                        height:'100%',
                        backgroundColor:'yellow',
                        position:'absolute',
                        top:0,
                        left:0,
                        opacity:0.5
                     }).attr('selected12','yes')
                  );
               }
            }
            else if(ee.button==2){
               for(var i=start_idx;i<=end_idx;i++) $('table.scalendar td div[index='+i+']:not([date=])').find('div.active').remove();
            }
         });
      });
   };window.create_calendar=create_calendar_ui.create_calendar;

   // 日曆插入點
   create_calendar_ui().insertAfter(qmap.find('a.calender_insert_pointer'));

   // UI設計的按鈕 Script 展開(單獨抽出來)
   var btn_collapsed=function(e){
      if($(this).find('span').hasClass('icon-plus')){
         $(this).find('span').removeClass('icon-plus').addClass('icon-list');
         $(this).parent().parent().parent().find('tbody tr.phase_details').hide();
         $(this).parent().parent().parent().find('tbody tr.phase_details.phase_details-showMaxGandMinG').show(150);
      }
      else if($(this).find('span').hasClass('icon-list')){
         $(this).find('span').removeClass('icon-list').addClass('icon-minus');
         $(this).parent().parent().parent().find('tbody tr.phase_details').show(150);
      }
      else if($(this).find('span').hasClass('icon-minus')){
         $(this).find('span').removeClass('icon-minus').addClass('icon-plus');
         $(this).parent().parent().parent().find('tbody tr.phase_details').hide(150);
      }

      return $(this).text();
   };

   // 資料列的 UI 設計
   var create_tr_ui=function(data){
      var ui=$('\
			<tr>\
				<th style="width:20px;text-align:center;padding-top:24px;"><input type="checkbox" style="margin:2px;" /></th>\
				<th style="width:20px;text-align:center;padding-top:20px;"><span class="btn btn-warning btn-operation">定</span></th>\
				<th style="color:#505050;font-size:18pt;font-weight:bold;vertical-align:top;padding-top:20px;width:40px;">\
					<div class="input-append bootstrap-timepicker">\
						<input type="text" class="input-small" style="width:50px;">\
						<span class="add-on"><i class="icon-time"></i></span>\
					</div>\
				</th>\
				<th style="width:20px;text-align:center;padding-top:22px;"><input type="number" style="width:15px;height:18px;" value=1 /></th>\
				<td style="color:#505050;font-size:18pt;font-weight:bold;vertical-align:top;width:150px;padding-top:20px;text-align:center;">\
					<select style="width:130px;font-size:12pt;font-weight:bold;">\
						<option selected="selected">普通二時相</option>\
						<option>閃黃燈</option>\
					</select>\
				</td>\
				<td style="padding:0px;">\
					<table style="width:100%;margin:0px;height:100%;">\
						<thead>\
							<tr>\
								<th class="display-btn" style="cursor:pointer;width:10px;text-align:center"><span class="btn-icon icon-plus"></span></th>\
								<th style="text-align:center;color:red !important;width:30px !important;">分相</th>\
								<th style="text-align:center;color:red !important;">1</th>\
								<th style="text-align:center;color:red !important;">2</th>\
								<th style="text-align:center;color:red !important;">3</th>\
								<th style="text-align:center;color:red !important;">4</th>\
								<th style="text-align:center;color:red !important;">5</th>\
								<th style="text-align:center;color:red !important;">6</th>\
								<!--\
								<th style="text-align:center;color:red !important;">7</th>\
								<th style="text-align:center;color:red !important;">8</th>\
								-->\
								<th style="text-align:center;color:red !important;">週期</th>\
								<th style="text-align:center;color:red !important;">時差</th>\
							</tr>\
							<!--總攬-->\
							<tr class="phase_overview">\
								<td colspan=2 style="color:#0080FF;font-weight:bold;font-size:8pt;padding-left:0px;padding-right:0px;text-align:center;">秒數</td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;"" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;"" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;"" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;"" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;"" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;"" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;"" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;"" /></td>\
								<!--\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;"" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;"" /></td>\
								-->\
							</tr>\
						</thead>\
						<tbody>\
							<!--細項-->\
							<tr class="phase_details">\
								<th colspan=2 style="font-weight:bold;font-size:8pt;padding-left:0px;padding-right:0px;text-align:center;">紅</th>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<!--\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								-->\
							</tr>\
							<!--細項-->\
							<tr class="phase_details">\
								<th colspan=2 style="font-weight:bold;font-size:8pt;padding-left:0px;padding-right:0px;text-align:center;">綠</th>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<!--\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								-->\
							</tr>\
							<tr class="phase_details">\
								<th colspan=2 style="font-weight:bold;font-size:8pt;padding-left:0px;padding-right:0px;text-align:center;">黃</th>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<!--\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								-->\
							</tr>\
							<tr class="phase_details">\
								<th colspan=2 style="font-weight:bold;font-size:8pt;padding-left:0px;padding-right:0px;text-align:center;">行綠</th>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<!--\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								-->\
							</tr>\
							<tr class="phase_details">\
								<th colspan=2 style="font-weight:bold;font-size:8pt;padding-left:0px;padding-right:0px;text-align:center;">行綠閃</th>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<!--\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								-->\
							</tr>\
							<tr class="phase_details phase_details-showMaxGandMinG">\
								<th colspan=2 style="font-weight:bold;font-size:8pt;padding-left:0px;padding-right:0px;text-align:center;">最小綠</th>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<!--\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								-->\
							</tr>\
							<tr class="phase_details phase_details-showMaxGandMinG">\
								<th colspan=2 style="font-weight:bold;font-size:8pt;padding-left:0px;padding-right:0px;text-align:center;">最大綠</th>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<!--\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								-->\
							</tr>\
							<tr class="phase_details phase_details-showMaxGandMinG">\
								<th colspan=2 style="font-weight:bold;font-size:8pt;padding-left:0px;padding-right:0px;text-align:center;">折減比例</th>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<th colspan=2 style="font-weight:bold;font-size:8pt;padding-left:0px;padding-right:0px;text-align:center;">低速門檻值</th>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<th colspan=2 style="font-weight:bold;font-size:8pt;padding-left:0px;padding-right:0px;text-align:center;">車門觸動時間</th>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<!--\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								-->\
								<!--\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								-->\
							</tr>\
							<tr class="phase_details phase_details-showMaxGandMinG">\
								<!--\
								<th colspan=2 style="font-weight:bold;font-size:8pt;padding-left:0px;padding-right:0px;text-align:center;">低速門檻值</th>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								-->\
								<!--\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								-->\
							</tr>\
							<tr class="phase_details phase_details-showMaxGandMinG">\
								<!--\
								<th colspan=2 style="font-weight:bold;font-size:8pt;padding-left:0px;padding-right:0px;text-align:center;">車門觸動時間</th>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								-->\
								<!--\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								<td style="padding:0px;"><input type="number" style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;" /></td>\
								-->\
							</tr>\
						</tbody>\
					</table>\
					\
				</td>\
			</tr>\
		');

      // 檢查是不是手機
      if(mobilecheck()){
         var option=$('<select style="padding:0px;margin:0px;width:100%;border-width:0px;height:100%;font-size:14pt;font-weight:bold;"></select>');
         option.css({
            '-webkit-appearance':'none',
            '-moz-appearance':'none',
            'appearance':'none',
            'border':'none',
            fontSize:'13pt',
            color:'blue'
         });
         for(var i=0;i<=200;i++) $('<option style="color:blue;" value='+i+' >'+i+'</option>').appendTo(option);
         ui.find('table td input[type=number]').parent().append(option).find('input[type=number]').remove();
      }
      else{
         //
      }

      ui.find('.btn-operation').click(function(e){
         switch(e.target.textContent){
            case '定':
               $(e.target).text('優').removeClass('btn-warning').addClass('btn-danger');
               break;
            case '優':
               $(e.target).text('定').removeClass('btn-danger').addClass('btn-warning');
               break;
            default:
               break;
         }
      });

      // // script

      // ui.find('input[type=number]').click(function(e){ // 當 input:number 被點選的時候
      // 	// console.log(e);
      // 	$('div.bottom_spinner').remove();
      // 	var spinner=$('<div class="bottom_spinner"></div>').css({
      // 		width:'100%',
      // 		height:'200px',
      // 		position:'fixed',
      // 		bottom:0,
      // 		left:0,
      // 		backgroundColor:'#303030',
      // 		zIndex:101,
      // 	});

      // 	var close_bt=$('<div>X</div>').css({
      // 		borderRadius:35,
      // 		position:'absolute',
      // 		backgroundColor:'white',
      // 		width:50,
      // 		height:50,
      // 		textAlign:'center',
      // 		lineHeight:'50px',
      // 		boxShadow:'#303030 0px 0px 10px inset',
      // 		border:'5px solid #303030',
      // 		right:25,
      // 		top:-25,
      // 		cursor:'pointer'
      // 	}).click(function(e){
      // 		$(this).parent().animate({
      // 			bottom:-200
      // 		},300,'swing',function(ee){
      // 			$('div.top_stretch').css('height',0);
      // 			$('hr.bottom_stretch').css({borderWidth:0});
      // 			$(this).remove();
      // 		});
      // 	}).hover(function(e){
      // 		$(e.target).css('background-color','yellow');
      // 	},function(e){
      // 		$(e.target).css('background-color','white');
      // 	});

      // 	close_bt.appendTo(spinner);

      // 	//spinner.append();

      // 	spinner.css('bottom','-200px').insertAfter($('a.bottom_modal_point')).animate({
      // 		bottom:0
      // 	},300,'swing',function(ee){
      // 		$('div.top_stretch').css('height','100%');
      // 		$('hr.bottom_stretch').css({borderWidth:80});
      // 	});
      // });


      var tp=ui.find('div.bootstrap-timepicker>input').css('font-size','14pt').timepicker({
         minuteStep: 10,
         showSeconds: false,
         showMeridian: false,
         defaultTime: 'current'
      });
      if(data && data.setTime) tp.timepicker('setTime',data.setTime);
      ui.find('tr.phase_details>td>input').val(0);
      ui.find('tr.phase_overview>td>input').css({backgroundColor:'#f9f9f9'}).val(0);
      ui.find('th').css({fontWeight:'bold',color:'darkgreen'});
      ui.find('.phase_overview input').css({textAlign:'center',color:'#0080FF'});
      ui.find('.phase_details input').css({textAlign:'center',color:'#008080'});
      ui.find('.display-btn').click(btn_collapsed);

      return ui;
   };
   create_tr_ui.create_and_insert=function(data,after_target){
      if(after_target==undefined){
         create_tr_ui(data).appendTo(qmap.find('table.table.mainbody>tbody'));
      }
      else{
         create_tr_ui(data).insertAfter(after_target);
      }
   };

   // 新增時間按鈕 script
   qmap.find('.btn-addtime').click(function(e){
      var item=qmap.find('tbody>tr>th>input[type=checkbox]:checked:last').parent().parent();
      if(item.length!=0) create_tr_ui.create_and_insert(undefined,item);
      else create_tr_ui.create_and_insert(undefined);
   });

   // 刪除時間按鈕 script
   qmap.find('.btn-deltime').click(function(e){
      var items=qmap.find('tbody>tr>th>input[type=checkbox]:checked');
      for(var i=0;i<items.length;i++){
         $(items[i]).parent().parent().remove();
      }
   });

   // // 分項設定全部展開
   var tbt=qmap.find('table.table.table-bordered.mainbody>thead>tr.header>th.display-btn');
   tbt.click(function(e){
      var class_string=tbt.find('span.btn-icon').attr('class');
      var target_btns=$('table table th.display-btn');
      target_btns.find('span.btn-icon').attr('class',class_string);
      for(var i=0;i<target_btns.length;i++) btn_collapsed.call(target_btns[i]);
   });

   // 展示資料(可以刪除)
   // var i=0;
   for(var i=0;i<6;i++){
      create_tr_ui.create_and_insert( { setTime: i<10 ? '0'+i+':00' : i+':00' } );
   };

   // 展示資料(假定日曆時間)
   create_calendar_ui.create_calendar(
      (new Date).getFullYear(),
      (new Date).getMonth()+1
   );

   // 假定手操的元件(亂數) - for Demo
   var _hbtns=$('.btn-operation');_hbtns.hidx=parseInt(Math.random()*_hbtns.length);for(var i=0;i<_hbtns.length;i++){
      if(i==_hbtns.hidx){
         $(_hbtns[i]).removeClass('btn-warning').removeClass('btn-danger').addClass('btn-inverse').html('手');
      }
   };

   // 樣式&特效
   $('table.table td').css({textAlign:'center'});
   $('table.table th').css({textAlign:'center'});
   $('table.table tr.phase_details th').css({
      textAlign:'center',
      backgroundColor: '#f9f9f9',
      fontWeight:'bold',
      fontSize:'8pt',
      paddingLeft:0,
      paddingRight:0
   });
   $('#centerview').hide().fadeIn(300);
};
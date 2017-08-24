var bt9=function(){
	$('.bottomInfo').empty();
	$('ul.nav').empty()
	.append('<li class="active"><a href="#">後台</a></li>')
	.append('<li class="active"><a href="#">歷史資料查詢</a></li>');

	$('table td.bottomInfo').hide();//.css('height','200px');
	qmap=$('#centerview').empty().append($('<div style="padding: 10px;"></div>'));

	$('\
		<div class="alert"></div>\
	').css({margin:10}).appendTo(qmap.find('div:eq(0)'));

	
	/*<div class="span4 btn" type="button">GPS歷史資料</div>\ <div class="span4 btn" type="button">車牌辨識器歷史資料</div>\*/
	$('\
		<div class="btn-group btn-group-div-margin" style="width:100%;">\
			<div class="row-fluid" data-toggle="buttons-checkbox">\
				<div class="span4 btn" type="button">號誌控制器時制運作紀錄</div>\
				<div class="span5 btn" type="button">號誌控制器與優先號誌運作狀態歷史資料</div>\
				<div class="span3 btn" type="button">觸發點歷史資料</div>\
			</div>\
			<div class="row-fluid" data-toggle="buttons-checkbox">\
				<div class="span4 btn" type="button">BRT車輛旅行時間歷史資料</div>\
				<div class="span4 btn" type="button">一般車輛旅行時間歷史資料</div>\
				<div class="span4 btn" type="button">車輛偵測器歷史資料</div>\
    	</div>\
	').appendTo('#centerview div.alert:eq(0)');

	var topbutton=$('\
		<div style="text-align:right;margin-bottom:10px;height:30px;">\
			<span class="btn-info" style="border-radius:5px;padding:5px;">時間範圍</span>\
			<select class="span3" style="margin:2px;font-size:12pt;font-weight:bold;width:150px;">\
				<option>2013-09-27</option>\
				<option>2013-09-26</option>\
				<option>2013-09-25</option>\
				<option>2013-09-24</option>\
				<option>2013-09-23</option>\
				<option>2013-09-22</option>\
				<option>2013-09-21</option>\
				<option>2013-09-20</option>\
				<option>2013-09-19</option>\
				<option>2013-09-18</option>\
				<option>2013-09-17</option>\
			</select>\
			<select class="span3" style="margin:2px;font-size:12pt;font-weight:bold;width:150px;">\
				<option>全天</option>\
				<option>00:00:00</option>\
				<option>00:01:00</option>\
				<option>00:02:00</option>\
				<option>00:03:00</option>\
				<option>00:04:00</option>\
				<option>00:05:00</option>\
				<option>00:06:00</option>\
				<option>00:07:00</option>\
				<option>00:08:00</option>\
				<option>00:09:00</option>\
				<option>00:10:00</option>\
			</select>\
			<span>到</span>\
			<select class="span3" style="margin:2px;font-size:12pt;font-weight:bold;width:150px;">\
				<option>2013-09-27</option>\
				<option>2013-09-26</option>\
				<option>2013-09-25</option>\
				<option>2013-09-24</option>\
				<option>2013-09-23</option>\
				<option>2013-09-22</option>\
				<option>2013-09-21</option>\
				<option>2013-09-20</option>\
				<option>2013-09-19</option>\
				<option>2013-09-18</option>\
				<option>2013-09-17</option>\
			</select>\
			<select class="span3" style="margin:2px;font-size:12pt;font-weight:bold;width:150px;">\
				<option>全天</option>\
				<option>00:00:00</option>\
				<option>00:01:00</option>\
				<option>00:02:00</option>\
				<option>00:03:00</option>\
				<option>00:04:00</option>\
				<option>00:05:00</option>\
				<option>00:06:00</option>\
				<option>00:07:00</option>\
				<option>00:08:00</option>\
				<option>00:09:00</option>\
				<option>00:10:00</option>\
			</select>\
			<span class="btn btn-primary btn-search">查　　詢</span>\
		</div>\
	').appendTo(qmap.find('div:first'));

	$('<hr class="before_data" style="height:20px;margin:0px;margin-left:25px;margin-right:25px;" /><div style="padding: 10px;" class="div_after_hr"></div>').appendTo($('#centerview'));

	var datagrid=$('\
		<table class="table table-bordered table-hover">\
			<thead>\
				<tr><td colspan="4" style="background-color:white !important;"><img src="demo_chart.png" style="height:250px;"></img></td></tr>\
				<tr>\
					<th style="width:80px;text-align:center;font-weight:bold;">時間</th>\
					<th style="width:80px;text-align:center;font-weight:bold;">巴士站(起)</th>\
					<th style="width:80px;text-align:center;font-weight:bold;">巴士站(迄)</th>\
					<th style="width:80px;text-align:center;font-weight:bold;">平均旅行時間</th>\
				</tr>\
			</thead>\
			<tbody>\
				<tr>\
					<td style="width:80px;text-align:center;">2013-09-27 00:00:00</td>\
					<td style="width:80px;text-align:center;">A站</td>\
					<td style="width:80px;text-align:center;">B站</td>\
					<td style="width:80px;text-align:center;">00:10:00</td>\
				</tr>\
				<tr>\
					<td style="width:80px;text-align:center;">2013-09-27 00:00:00</td>\
					<td style="width:80px;text-align:center;">B站</td>\
					<td style="width:80px;text-align:center;">C站</td>\
					<td style="width:80px;text-align:center;">00:15:00</td>\
				</tr>\
				<tr>\
					<td style="width:80px;text-align:center;">2013-09-27 00:00:00</td>\
					<td style="width:80px;text-align:center;">C站</td>\
					<td style="width:80px;text-align:center;">D站</td>\
					<td style="width:80px;text-align:center;">00:15:00</td>\
				</tr>\
				<tr>\
					<td style="width:80px;text-align:center;">2013-09-27 00:00:00</td>\
					<td style="width:80px;text-align:center;">D站</td>\
					<td style="width:80px;text-align:center;">E站</td>\
					<td style="width:80px;text-align:center;">00:15:00</td>\
				</tr>\
				<tr>\
					<td style="width:80px;text-align:center;">2013-09-27 00:00:00</td>\
					<td style="width:80px;text-align:center;">E站</td>\
					<td style="width:80px;text-align:center;">F站</td>\
					<td style="width:80px;text-align:center;">00:15:00</td>\
				</tr>\
			</tbody>\
		</table>\
		<div style="text-align:right;">\
			<span class="btn">列印</span>\
		</div>\
	').hide().appendTo(qmap.find('div.div_after_hr'));

	// 查詢
	qmap.find('span.btn.btn-search').click(function(e){
		datagrid.toggle(250);
	});
}
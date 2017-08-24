var bt5=function(){
	$('.bottomInfo').empty();
	// 基本版頭
		$('ul.nav').empty()
		.append('<li class="active"><a href="#">首頁</a></li>')
		.append('<li class="active"><a href="#">排程</a></li>')
		.append('<li class="active"><a href="#">路口排程</a></li>');

		$('table td.bottomInfo').hide();
		qmap=$('#centerview').empty().css('background-color','transparent');
		qmap.append('\
			<div style="position:relative;z-index:1;" class="tab-topc">\
			<!--span class="btn btn-success" style="float:left;margin:3px;font-size:12pt;">新增時間</span-->\
			<ul class="nav nav-tabs">\
				<li class="active"><a href="#" onclick="$(this).parent().parent().find(\'li\').attr(\'class\',\'\');$(this).parent().attr(\'class\',\'active\');">平日</a></li>\
				<li><a style="cursor:pointer;" onclick="$(this).parent().parent().find(\'li\').attr(\'class\',\'\');$(this).parent().attr(\'class\',\'active\');">例假日</a></li>\
				<li><a style="cursor:pointer;" onclick="$(this).parent().parent().find(\'li\').attr(\'class\',\'\');$(this).parent().attr(\'class\',\'active\');">特別日 1</a></li>\
				<li><a style="cursor:pointer;" onclick="$(this).parent().parent().find(\'li\').attr(\'class\',\'\');$(this).parent().attr(\'class\',\'active\');">特別日 2</a></li>\
			</ul>\
			</div>\
		');

		$('<div class="alert"></div>').css({margin:10}).insertAfter('#centerview div.tab-topc');
		$('<label class="checkbox inline">忠明路<input type="checkbox" value="1" checked/></label>').appendTo('#centerview>.alert');
		$('<label class="checkbox inline">英才路<input type="checkbox" value="1" checked/></label>').appendTo('#centerview>.alert');
		$('<label class="checkbox inline">五明路<input type="checkbox" value="1" checked/></label>').appendTo('#centerview>.alert');

	// 展示資料(可以刪除)
		qmap.append(
			'<div style="height:100%;padding:10px;padding-top:10px;">\
				<!--label style="font-size:14pt;font-weight:bold;">日　　期　<input type="date" value="2013-09-12" style="font-size:14pt;font-weight:bold;" /></label-->\
				<table class="table table-striped table-bordered schedule_table">\
					<tbody>\
						<tr>\
							<th><div style="position:relative;height:40px;"><b style="position:absolute;top:0px;right:0px;">控制策略</b><b style="position:absolute;bottom:0px;left:0px;">起始時間</b></div></th>\
							<th style="vertical-align:middle;font-size:14pt;font-weight:bold;">忠明路</th>\
							<th style="vertical-align:middle;font-size:14pt;font-weight:bold;">英才路</th>\
							<th style="vertical-align:middle;font-size:14pt;font-weight:bold;">五明路</th>\
						</tr>\
					</tbody>\
				</table>\
				<div style="height:100px;text-align:right">\
					<span class="btn btn-large btn-inverse">放棄</span>\
					<span class="btn btn-large btn-inverse">保存</span>\
				</div>\
			</div>\
		');

		var st=qmap.find('table.schedule_table tbody');
		for(var i=0;i<24;i++){
			st.append('\
				<tr>\
					<th style="color:#505050;font-size:18pt;font-weight:bold;vertical-align:middle;">'+( i<10 ? '0'+i : i )+':00</th>\
					<td>'+(Math.random() > 0.5 ? '<span class="btn btn-warning">定時時制</span>' : '<span class="btn btn-danger">優先號誌</span>')+'</td>\
					<td>'+(Math.random() > 0.5 ? '<span class="btn btn-inverse">路口手操</span>' : '<span class="btn btn-danger">優先號誌</span>')+'</td>\
					<td>'+(Math.random() > 0.5 ? '<span class="btn btn-warning">定時時制</span>' : '<span class="btn btn-danger">優先號誌</span>')+'</td>\
				</tr>\
			');
		};

	// 按鈕切換
		$('table.table td span.btn').click(function(e){
			switch($(e.target).text()){
				case '定時時制':
					$(e.target).text('優先號誌').attr('class','btn btn-danger');
					break;
				case '優先號誌':
					$(e.target).text('定時時制').attr('class','btn btn-warning');
					break;
			};
		});

	// 樣式&特效
		$('table.table td').css({textAlign:'center'});
		$('table.table th').css({textAlign:'center'});
		$('#centerview').hide().fadeIn(300);
};
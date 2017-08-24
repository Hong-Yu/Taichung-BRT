var bt10=function(){
	$('ul.nav').empty()
	.append('<li class="active"><a href="#">後台</a></li>')
	.append('<li class="active"><a href="#">系統帳號管理</a></li>');

	$('table td.bottomInfo').hide();//.css('height','200px');
	qmap=$('#centerview').empty().append($('<div style="padding: 10px;"></div>'));

	var topbutton=$('\
		<div style="text-align:right;margin-bottom:10px;height:30px;">\
			<span class="btn btn-inverse">新增使用者</span>\
		</div>\
	').appendTo(qmap.find('div:first'));

	var datagrid=$('\
		<table class="table table-bordered table-hover table-usergrid">\
			<thead>\
				<tr>\
					<th style="width:40px;text-align:center;">編號</th>\
					<th style="text-align:center;">帳號</th>\
					<th style="width:120px;text-align:center;">管理</th>\
				</tr>\
			</thead>\
			<tbody>\
				<tr>\
					<th style="text-align:right;">1</th>\
					<td>user1@brt.com</td>\
					<td style="text-align:center;">\
						<span class="btn btn-modify" data-toggle="modal" data-target="#userDetails" style="width:30px;">修改</span>\
						<span class="btn btn-danger" style="width:30px;">刪除</span>\
					</td>\
				</tr>\
				<tr>\
					<th style="text-align:right;">2</th>\
					<td>user2@brt.com</td>\
					<td style="text-align:center;">\
						<span class="btn btn-modify" data-toggle="modal" data-target="#userDetails" style="width:30px;">修改</span>\
						<span class="btn btn-danger" style="width:30px;">刪除</span>\
					</td>\
				</tr>\
				<tr>\
					<th style="text-align:right;">3</th>\
					<td>user3@brt.com</td>\
					<td style="text-align:center;">\
						<span class="btn btn-modify" data-toggle="modal" data-target="#userDetails" style="width:30px;">修改</span>\
						<span class="btn btn-danger" style="width:30px;">刪除</span>\
					</td>\
				</tr>\
			</tbody>\
		</table>\
	').appendTo(qmap.find('div:first'));

	datagrid.find('.btn-modify').click(function(e){

		console.log(e);

		//
		var ui='\
			<!-- Modal -->\
			<div id="userDetails" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:300px;margin-left:-180px !important;">\
				<div class="modal-header">\
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\
					<h3 id="myModalLabel">使用者帳號修改</h3>\
				</div>\
				<div class="modal-body">\
					<form style="padding-left:25px;">\
						<label>帳號</label>\
						<input type="text" placeholder="user1@brt.com">\
						<label>密碼</label>\
						<input type="text" placeholder="**********">\
						<label>權限</label>\
						<div class="btn-group" style="height:75px;">\
							<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">選擇<span class="caret"></span></a>\
							<ul class="dropdown-menu" style="position:absolute;top:30px;">\
								<!-- dropdown menu links -->\
								<li><a href="#">一般使用者</a></li>\
								<li><a href="#">系統管理員</a></li>\
							</ul>\
						</div>\
					</form>\
				</div>\
				<div class="modal-footer">\
					<button class="btn" data-dismiss="modal" aria-hidden="true">關閉</button>\
					<button class="btn btn-primary">儲存</button>\
				</div>\
			</div>\
		';

		var cp=$(ui);
		cp.appendTo(qmap.find('div:first'));
	});

	$('#centerview').hide().fadeIn(300);
}
var bt3=function(){
	$('.bottomInfo').empty();
	$('ul.nav').empty()
	.append('<li class="active"><a href="#">首頁</a></li>')
	.append('<li class="active"><a href="#">控制設備資訊</a></li>');

	$('table td.bottomInfo').show().css('height','200px');
	qmap=$('#centerview').empty().css('background-color','transparent').append($('<div class="_gmap"></div>'));
	qmap.map=qmap.find('._gmap').buildGoogleMap().addInfo(
		'<div class="btn-group btn-group-vertical" style="width:100%;">\
			<div class="btn btn-success">正常</div>\
			<div class="btn btn-success">異常</div>\
			<div class="btn btn-success">BRT路線</div>\
			<div class="btn btn-success">快捷巴士</div>\
		</div>',
		google.maps.ControlPosition.RIGHT_BOTTOM,
		{
			backgroundColor:'silver',
			width: 130,
			marginBottom:5,
			marginRight:5
		}
	);

	$('#centerview').hide().fadeIn(300);
};
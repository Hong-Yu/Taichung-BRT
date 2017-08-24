var bt8=function(){
	$('.bottomInfo').empty();
	$('ul.nav').empty()
	.append('<li class="active"><a href="#">後台</a></li>')
	.append('<li class="active"><a href="#">事故建立</a></li>');

	$('table td.bottomInfo').css('height','200px');
	qmap=$('#centerview').empty().css('background-color','transparent').append($('<div class="_gmap"></div>'));
	qmap.map=qmap.find('._gmap').buildGoogleMap();

	qmap.map.addInfo(
		'<div class="btn-group" style="width:100%;">\
			<div class="btn btn-danger">事故建立</div>\
		</div>',
		google.maps.ControlPosition.RIGHT_TOP,
		{
			backgroundColor:'silver',
			marginTop:5,
			marginRight:5
		}
	);

	// 監看經緯度(位置)
	google.maps.event.addListener(qmap.map.map, 'click', function(e) {
		//console.log(e.latLng);
		console.log(123);


	});
	
	$('#centerview').hide().fadeIn(300);
};
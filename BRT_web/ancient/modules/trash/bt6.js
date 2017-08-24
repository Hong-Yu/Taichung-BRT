var bt6=function(){
	$('.bottomInfo').empty();
	$('ul.nav').empty()
	.append('<li class="active"><a href="#">首頁</a></li>')
	.append('<li class="active"><a href="#">BRT績效</a></li>');

	$('table td.bottomInfo').show().css('height','200px');
	qmap=$('#centerview').empty().css('background-color','transparent').append($('<div class="_gmap"></div>'));
	qmap.map=qmap.find('._gmap').buildGoogleMap();
	
	$('#centerview').hide().fadeIn(300);
};
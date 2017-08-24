var qmap;

bt0();

// 表關聯
var buttonsTable={
	登入:bt0,
	即時狀態:bt1,
	號誌控制邏輯:bt2,
	控制設備資訊:bt3,
	路口參數:bt4,
	路口排程:bt5,
	BRT績效:bt6,
	事故顯示:bt7,
};

// init
$(document).ready(function(e){
	buttonsTable['即時狀態'].call(this);
});

// draw polyline
$(document).ready(function(e){
	qmap.map.add_section_polyline_by_array(appDB.demo_path);
});
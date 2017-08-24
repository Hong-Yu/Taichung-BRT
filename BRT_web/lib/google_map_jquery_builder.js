// 所有有關 Google Map 的用途應該寫在這

// Extend JQuery with Google Map
$.prototype.buildGoogleMap=function createMap(myOptions) {
	var map_map=this;		// 直接操作的 handle
	this.sections_infowindow=new Object;		// 採 update 方式
	this.sections_polyline=new Object;			// 採 update 方式 ( 兩層[邊框也是一層] )
	this.markers=new Object;					// 採 update 方式 ( vd marker )
	this.controls=new Object;

	this.css('min-height','400px');
	this.css('height','600px');
	var myOptions = myOptions ? myOptions:{
		// maxZoom: 12,
		// minZoom: 11,
		zoom: 15,
		center: new google.maps.LatLng(24.136806496426946, 120.68498611450195),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	};
	for(var i=0;i<this.length;i++){
		var map = new google.maps.Map(this[i],myOptions);
		this.map=map;
	};

	// 在地圖上加上GIS UI的 VD 位置
	this.addMark=function(dir,Latlng,targetvdid,upvd,downvd,markhandle){
		this.marks?undefined:this.marks=[];

		Latlng ? undefined : Latlng=[24.830, 121.7];

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(Latlng[0],Latlng[1]),
			map: this.map,
			title: targetvdid,
			icon: (dir=='N')?'/images/vd.gif':'/images/vd2.gif'
		});

		//如果有定義Mark的行為才會執行
		google.maps.event.addListener(marker, 'click', function() {
			console.log(targetvdid,upvd,downvd);
			markhandle?markhandle(targetvdid,upvd,downvd):undefined;
		});

		this.markers[targetvdid]=marker;

		return this;
	};

	this.addMark_only_show=function(dir,Latlng,targetvdid,markhandle){
		this.marks?undefined:this.marks=[];

		dir = dir.replace(' ','');

		Latlng?undefined:Latlng=[24.830, 121.7]

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(Latlng[0],Latlng[1]),
			map: this.map,
			title: targetvdid,
			icon: (dir=='N')?'/images/vd.gif':'/images/vd2.gif'
		});

		//如果有定義Mark的行為才會執行
		google.maps.event.addListener(marker, 'click', function() {
			markhandle?markhandle(targetvdid):undefined;
		});

		this.markers[targetvdid]=marker;

		return this;
	}

	// 增加左下角的 Info
	this.addInfo=function(html_string,map_control,css_hash){
		var map_control=map_control || google.maps.ControlPosition.BOTTOM_LEFT;
		this.infos?undefined:this.infos=[];

		html_string?html_string=html_string:html_string='南下為<span style="color:red;">紅色</span>，北上為<span style="color:blue;">藍色</span>';

		var ui = $('<div>'+html_string+'</div>');

		if(css_hash){
			ui.css(css_hash);
		}
		else{
			ui.css('background-color','lightblue')
			.css('margin-bottom','40px')
			.css('padding','5px')
			.css('border-radius','10px')
			.css('color','#303030')
			.css('font-weight','bold')
			.css('margin-left','-50px');
		};

		for(var i=0;i<ui.length;i++){
			this.map.controls[map_control].push(ui[i]);
			ui[i].destroy=function(){
				map_map.map.controls[map_control].removeAt( map_map.map.controls[map_control].b.indexOf(this) );
			};
			this.controls[i]=ui[i];
		};

		return this;
	};

	// 建立客製化的首頁的路段資訊(採 Hash)
	this.add_section_infowindow=function(record,y,x){
		var content=$.prototype.buildGoogleMap.label_html( record );

		var myOptions = {
			content: content,
			position: new google.maps.LatLng(y,x),
			maxWidth: 0,
			boxStyle: { 
				minWidth: "190px"
			},
			closeBoxURL: "", // 隱藏右上角的 X
			disableAutoPan:true,
			zIndex:-10
		};

		var ib = new InfoBox(myOptions);
		ib.section_id=record.raw.id;
		
		ib.open(this.map,null);
		ib.hide();

		ib.moveTo=function(x,y){
			ib.setPosition(new google.maps.LatLng(y,x));
		};

		// 加入參考
		ib.section_id=record.raw.id;
		this.sections_infowindow['section_id_'+record.raw.id]=ib;
		return ib;
	}

	// 建立客製化的首頁的路段線段(採 Hash)
	this.add_section_polyline=function(record,color){
		var stpl=new Object;

		// 線條連續經緯度
		var myPaths=[];for(var i in record.data.path_list){myPaths.push(new google.maps.LatLng(record.data.path_list[i].y,record.data.path_list[i].x));};

		// Section 畫邊框
		var section_line_border = new google.maps.Polyline({
			path: myPaths,
			strokeColor: "#000000",
			strokeOpacity: 1,
			strokeWeight: 6,
			zIndex: 1
		});

		// 畫線段
		var section_line = new google.maps.Polyline({
			path: myPaths,
			strokeColor: color || $.prototype.buildGoogleMap.getColor(record.raw.getSectionSpeed),
			strokeOpacity: 1,
			strokeWeight: 5,
			zIndex: 2
		});

		stpl.section_body=section_line;
		stpl.section_border=section_line_border;

		// 加入參考
		stpl.section_id=record.raw.id;
		this.sections_polyline['section_id_'+record.raw.id]=stpl;
		return stpl;
	};

	// 建立客製化的首頁的路段線段(採 Array)
	this.add_section_polyline_by_array=function(path,color,draw_it_right_now){
		if(draw_it_right_now==undefined) draw_it_right_now=true;
		var color=color || 'lightgreen';
		var stpl=new Object;

		// 線條連續經緯度
		var myPaths=[];for(var i in path){myPaths.push(new google.maps.LatLng(path[i][0],path[i][1]));};

		// Section 畫邊框
		var section_line_border = new google.maps.Polyline({
			path: myPaths,
			strokeColor: "#000000",
			strokeOpacity: 1,
			strokeWeight: 6,
			zIndex: 1
		});

		// 畫線段
		var section_line = new google.maps.Polyline({
			path: myPaths,
			strokeColor: color,
			strokeOpacity: 1,
			strokeWeight: 5,
			zIndex: 2
		});

		stpl.section_body=section_line;
		stpl.section_border=section_line_border;

		if(draw_it_right_now){
			stpl.section_body.setMap(this.map);
			stpl.section_border.setMap(this.map);
		}

		return stpl;
	};


	// 通用型別的 Marker，點選後會執行 fn(data) 的標記！
	this.addCommonMarker=function(fn,data,icon,draggable,click_handle){
		var draggable=draggable||false;
		var marker=new google.maps.Marker({
			position: new google.maps.LatLng(data.py,data.px),
			title: data.label,
			icon: icon || '/Template/in_out_vd_icon.png',		// 當沒有輸入使用匝道 icon
			zIndex: -100,
			animation: google.maps.Animation.b,
			draggable: draggable // 開發用
		});

		// 開發用
		if(draggable){
			google.maps.event.addListener(marker, 'dragend', function(){
				console.log(this.position,data);
			});
		};

		if(click_handle){
			marker.data=data;
			google.maps.event.addListener(marker, 'click', click_handle);
		};

		// 標記更新時間
		marker.check_date=new Date;

		// 建立一個參考
		data.marker=marker;

		// 建立 info_window
		data.info ? data.marker.marker_info = new google.maps.InfoWindow({content:data.info,disableAutoPan:true,zIndex:10}) : undefined;

		if( fn && data ){
			google.maps.event.addListener(
				marker,
				'click',
				function(){ fn(data); }
			);
		};

		// 建立外部 Handle
		this.markers[data.vdid]=marker;

		return marker
	}

	// 標記匝道
	this.mark_gateway=function(py,px,marker_title,arguments){
		var marker=new google.maps.Marker({
			 position: new google.maps.LatLng(py,px),
			 title: marker_title,
			 icon:'/Template/in_out_vd_icon.png'
		});

		if(arguments){
			var content=$(arguments).css('color','#303030')[0];
			var infowindow = new InfoBox({
				content: content,
				boxStyle: { 
					'background-color':'trasparent',
				},
				disableAutoPan: false,
				isHidden: true,
				closeBoxURL: ""
			});
			marker.infowindow=infowindow;

			google.maps.event.addListener(marker, 'click', function(){
				map_map.mark_gateway.current_infowindow ? map_map.mark_gateway.current_infowindow.hide() : undefined;
				marker.infowindow.open(map_map.map,this);
				marker.infowindow.show();
				map_map.mark_gateway.current_infowindow=infowindow
			});
		};

		return marker;
	}

	// 定義地圖縮放時該做的事情
	this.add_map_zoomer_handle=function(zoomer_procedure){google.maps.event.addListener(this.map, 'zoom_changed', zoomer_procedure);}

	// 監看經緯度(位置)
	google.maps.event.addListener(this.map, 'click', function(e) {
		console.log(e.latLng);
	});

	return this;
}

// 一些 Static Method
// 計算顏色
$.prototype.buildGoogleMap.getColor=function(currentSpeed){
	var colorCode = "#555555";

	var currentSpeed=Math.round(currentSpeed);

	if(currentSpeed >= 50*1.6){
		colorCode = "#00AF00";
	}
	else if( currentSpeed >= 25*1.6){
		colorCode = "#F0FF00";
	}
	else if( currentSpeed >= 0){
		colorCode = "#F00000";
	}
	else{
		colorCode = "#555555";
	};

	return colorCode;
};

// 計算模組
$.prototype.buildGoogleMap.getObjectSpeed=function(record){
	create_or_check_calculate_objectSpeed_arguments();

	var objectSpeed=0;

	if(record.raw.getSectionSpeed>localStorage['section_id_'+record.raw.id.toString()+'_speed_limit']){
		objectSpeed=localStorage['section_id_'+record.raw.id.toString()+'_speed_limit'];
	}
	else if( (record.raw.getSectionSpeed<localStorage['section_id_'+record.raw.id.toString()+'_speed_limit']) && (record.raw.objectCarQ<0.7*localStorage['section_id_'+record.raw.id.toString()+'_qauntity']) ){
		objectSpeed=localStorage['section_id_'+record.raw.id.toString()+'_speed_limit'];
	}
	else {
		objectSpeed=0.8*localStorage['section_id_'+record.raw.id.toString()+'_speed_limit'];
	};

	return objectSpeed;
};

// 組合模板
$.prototype.buildGoogleMap.label_html=function(section_info){
	var objectSpeed=$.prototype.buildGoogleMap.getObjectSpeed(section_info);
	var tpl=$("<Template>"
	+"<div class=\"section_id_"+section_info.raw.id.toString()+"\">"
	+"<div style=\"background-color: green;border-radius: 5px 5px 0px 0px;color: white;font-size: 12pt;text-align: center;border-top: 2px solid #404040;border-left: 2px solid #404040;border-right: 2px solid #404040;\">"
	+section_info.data.name
	+"</div>"
	+""
	+"<div style='font-weight:bold;border-radius:0px 0px 5px 5px;border-bottom: 2px solid #404040;border-left: 2px solid #404040;border-right: 2px solid #404040;color:#303030;background:-webkit-gradient(linear,left top,right top,color-stop(0%,rgba(240,249,255,1)),color-stop(47%,rgba(203,235,255,1)),color-stop(100%,rgba(161,219,255,1)));background:-moz-gradient(linear,left top,right top,color-stop(0%,rgba(240,249,255,1)),color-stop(47%,rgba(203,235,255,1)),color-stop(100%,rgba(161,219,255,1)));'>"
	+""
	+"<table style=\"width: 100%;\" title=\"密度:"+Math.round(section_info.data.section_desity)+"\">"
	+"<tr><th style='color:red;text-align:left;font-size:11pt;'>實際速度</th><td style='text-align:right;color:blue;'>"+Math.round(section_info.data.getSectionSpeed)+" KM/H</td></tr>"
	+"<tr><th style='text-align:left;font-size:11pt;'>目標速度</th><td style='text-align:right;color:blue;'><input class='set_object_speed' type=\"text\" style=\"height: 20px;font-size: 10pt;padding:0px;margin:0px;width:30px;text-align:right;\" value="+objectSpeed+" /> KM/H</td></tr>"
	+"<tr><th style='color:red;text-align:left;font-size:11pt;'>實際車輛數</th><td style='text-align:right;color:blue;'>"+Math.round(section_info.data.objectCarQ)+" 輛</td></tr>"
	+"<tr><th style='text-align:left;font-size:11pt;'>目標車輛數</th><td style='text-align:right;color:blue;'><input class='set_object_qauntity' type=\"text\" style=\"height: 20px;font-size: 10pt;padding:0px;margin:0px;width:40px;text-align:right;\" value="+Math.round( localStorage['section_id_'+section_info.raw.id.toString()+'_object_qauntity'] )+" /> 輛</td></tr>"
	// +"<tr><th style='text-align:left;font-size:11pt;'>密度</th><td style='text-align:right;color:blue;'>"+Math.round(section_info.data.section_desity)+"</td></tr>"
	+"</table>"
	+""
	+"</div>"
	+"</div>"
	+"</Template>");
	return tpl.html();
}

//設置地圖點關注點
function setViewPoint(lat, lng, zoomlevel,map) {
	map.setCenter(new google.maps.LatLng(lat, lng));
	map.setZoom(zoomlevel);
};
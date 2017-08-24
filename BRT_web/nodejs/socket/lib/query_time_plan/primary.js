// Query current segment type in TC process in: SegType
// Return back segment data from TC process in: SegData

var db_process = require('./request_database.js');
module.exports = {
	Initialize: function() {
		this.seg_result = [];
		this.tod_plan_list = [];
		this.plan_content = {};
	},
	set_connector: function(con_db) {
		this.con_db = con_db;
	},
	set_sql_generator: function(sql_generator) {
		this.sql_generator = sql_generator;
	},
	set_websocket: function(ws) {
		this.websocket = ws;
	},
	DB_process: function(input_data, ws){
        switch (input_data.MsgTypeNo){
            case 'stddata':
                var std_struc = std_data_structure(input_data.LCN, input_data.plan_id);
                db_process.SelectStd(this.con_db, this.sql_generator, ws, input_data.LCN, input_data.plan_id, std_struc, input_data.phase_no);
                break;
            case 'controldata':
                var control_struc = priority_control_structure(input_data.LCN, input_data.priority_id);
                db_process.SelectControl(this.con_db, this.sql_generator, ws, input_data.LCN, input_data.priority_id, control_struc);
                break;
            case 'todplan':
				db_process.SelectTod(this.con_db, this.sql_generator, ws, input_data.LCN, input_data.SegmentType);
				break;
            case 'stddata_db':
                var std_struc = std_data_structure(input_data.LCN, input_data.plan_id);
				db_process.SelectStdDB(this.con_db, this.sql_generator, ws, input_data.LCN, input_data.plan_id, std_struc);
				break;
			default :
                console.log('request undefined. @query_time_plan/primary.js');
                break;
        }
	},
	SegType: function(lcn) {
		var tod_plan = [];
		this.seg_result[0] = seg_data_structure(lcn);
		this.tod_plan_list = tod_plan;
		// console.log(this.seg_result[0]);
		query_seg_type(lcn);
	},
	SegData: function(input_data) {
		// console.log(input_data);
		seg_data_process(input_data, this.seg_result[0], this.con_db, this.sql_generator, this.tod_plan_list, this.websocket);
	},
	TodPriority: function(input_data){
		console.log(input_data);
		UpdateTod(this.con_db, this.sql_generator, input_data, this.websocket);
	},
	TimePlan: function(lcn, plan_id){
		this.plan_count = 0;
		this.plan_content = std_data_structure(lcn, plan_id);
		query_plan_tc(lcn, plan_id);
	},
	PlanData: function(input_data){
		// console.log(input_data);
		plan_data_process(input_data, this.plan_content, this.con_db, this.sql_generator, this.websocket);
		this.plan_count +=1;
		if(this.plan_count ===3){
			this.plan_count=0;
			InsertStdSQL(this.con_db, this.sql_generator, this.plan_content, this.websocket);
		}
	},
	TimePlanDB: function(lcn, websocket) {
		db_process.SelectSeg(this.con_db, this.sql_generator, websocket, lcn);
	}
};

function query_seg_type(lcn) { // start query segment type in tc
	// seg 1~7
	var i = 1;
	var l = 8;
	var Interval_seg_1 = setInterval(function() { // send query command every interval
		if (i < 8) {
			var query_seg = {};
			query_seg.FunctionNo = '5F';
			query_seg.MsgTypeNo = '46';
			query_seg.LCN = lcn;
			query_seg.SegmentType = i;
			query_seg.WeekDay = 0;
			var json = JSON.stringify(query_seg);
			SendToTC(json);
			i++;
		} else {
			step2();
			clearInterval(Interval_seg_1);
		}
	}, 500);
	// seg 8~20 are spcial days
	function step2() {
		var Interval_seg_2 = setInterval(function() {
			if (l < 21) {
				var query_seg = {};
				query_seg.FunctionNo = '5F';
				query_seg.MsgTypeNo = '47';
				query_seg.LCN = lcn;
				query_seg.SegmentType = l;
				query_seg.WeekDay = 0;
				var json = JSON.stringify(query_seg);
				SendToTC(json);
				l++;
			} else {
				clearInterval(Interval_seg_2);
			}
		}, 500);
	}
}

function query_plan_tc(lcn, plan_id){
	var query_plan ={};
	query_plan.FunctionNo='5F';
	query_plan.MsgTypeNo='44';
	query_plan.LCN=lcn;
	query_plan.PlanID=plan_id;
	var json_plan=JSON.stringify(query_plan);
	SendToTC(json_plan);
	setTimeout(function() {
		var query_plan_2 ={};
		query_plan_2.FunctionNo='5F';
		query_plan_2.MsgTypeNo='45';
		query_plan_2.LCN=lcn;
		query_plan_2.PlanID=plan_id;
		var json_plan_2=JSON.stringify(query_plan_2);
		SendToTC(json_plan_2);
	}, 500);
}

function SendToTC(input_data) { // data return back @ prot 7777, timing_plan/udp.js
	var dgram = require('dgram');
	var message = new Buffer(input_data);
	var client = dgram.createSocket('udp4');
	var host = "192.168.1.41";
	var port = 10002;
	client.send(message, 0, message.length, port, host, function(err, bytes) {
		// console.log(message);
		// console.log(err, bytes);
		client.close();
	});
}

function seg_data_process(input_data, seg_result, con_db, sql_generator, tod_plan_list, websocket) {
	switch (input_data.key) {
		case '5FC6': // normal days
			// console.log(JSON.stringify(input_data.result_Time));
			normal_days(input_data.result_Day, input_data.SegmentType);
			time_content_for_seg(input_data.LCN, input_data.SegmentType, input_data.result_Time, tod_plan_list);
			break;
		case '5FC7': // special days
			// console.log(JSON.stringify(input_data.result));
			special_days(input_data, input_data.result, input_data.SegmentType, con_db, sql_generator, websocket);
			time_content_for_seg(input_data.LCN, input_data.SegmentType, input_data.result, tod_plan_list, con_db, sql_generator);
			break;
		case '0F81': // query error
			try {
				var json = {};
				json.FunctionNo = 'progress';
				json.MsgTypeNo = 'segtype';
				json.seg = 81;
				var jsondata = JSON.stringify(json);
				websocket.send(jsondata);
			} catch (e) {
				console.log(e + ' @/socket/lib/query_time_plan/primary case 0F81');
			}
			break;
		default:
			break;
	}

	function normal_days(result_Day, segtype) { // set weekday segment data from tc
		for (var i = 0; i < result_Day.length; i++) {
			var current_day_num = result_Day[i].WeekDay;
			switch (current_day_num) {
				case 1:
					seg_result.mon = segtype;
					break;
				case 2:
					seg_result.tue = segtype;
					break;
				case 3:
					seg_result.wed = segtype;
					break;
				case 4:
					seg_result.thu = segtype;
					break;
				case 5:
					seg_result.fri = segtype;
					break;
				case 6:
					seg_result.sat = segtype;
					break;
				case 7:
					seg_result.sun = segtype;
					break;
				case 11:
					seg_result.even_mon = segtype;
					break;
				case 12:
					seg_result.even_tue = segtype;
					break;
				case 13:
					seg_result.even_wed = segtype;
					break;
				case 14:
					seg_result.even_thu = segtype;
					break;
				case 15:
					seg_result.even_fri = segtype;
					break;
				case 16:
					seg_result.even_sat = segtype;
					break;
				case 17:
					seg_result.even_sun = segtype;
					break;
				default:
					console.log('WeekDay error @query_time_plan/primary.js');
					break;
			}
		}
		try {
			var json = {};
			json.FunctionNo = 'progress';
			json.MsgTypeNo = 'segtype';
			json.seg = segtype;
			var jsondata = JSON.stringify(json);
			websocket.send(jsondata);
		} catch (e) {
			console.log(e + ' @/socket/lib/query_time_plan/primary func normal_days');
		}
	}

	function special_days(data, result, segtype, con_db, sql_generator, websocket) { // set special days segment data from tc
		var segtype_num = (segtype - 7);
		// console.log(segtype_num);
		var spc_proper = 'spc' + segtype_num;
		var datestart_proper = spc_proper + '_startdate';
		var dateend_proper = spc_proper + '_enddate';
		var datestart = (data.Year_begin + 1911) + '-' + data.Month_begin + '-' + data.Day_begin;
		var dateend = (data.Year_end + 1911) + '-' + data.Month_end + '-' + data.Day_end;
		seg_result[spc_proper] = segtype;
		seg_result[datestart_proper] = datestart;
		seg_result[dateend_proper] = dateend;
		if (segtype === 20) {
			InsertSegTypeSQL(seg_result, con_db, sql_generator);
			var json = {};
			json.FunctionNo = 'result';
			json.MsgTypeNo = 'segtype';
			json.result_seg = {};
			json.result_seg.result = [];
			json.result_seg.result[0] = seg_result;
			json.result_seg.rowcount = 1;
			var jsondata = JSON.stringify(json);
			// console.log(jsondata);
			try {
				websocket.send(jsondata);
			} catch (e) {
				console.log(e + ' @/socket/lib/query_time_plan/primary func special_days');
			}
		} else {
			try {
				var json = {};
				json.FunctionNo = 'progress';
				json.MsgTypeNo = 'segtype';
				json.seg = segtype;
				var jsondata = JSON.stringify(json);
				websocket.send(jsondata);
			} catch (e) {
				console.log(e + ' @/socket/lib/query_time_plan/primary func special_days');
			}
		}
	}

	function time_content_for_seg(lcn, seg, result_Time, tod_plan_list, con_db, sql_generator) { // tod for every segment type from tc
		for (var t = 0; t < result_Time.length; ++t) {
			var current_tod = result_Time[t];
			var hour = current_tod.Hour.toString();
			var min = current_tod.Min.toString();
			var timer = "'";
			var z = '0';
			(hour.length === 1 ? (timer += z.concat(hour) + ":") : (timer += hour + ":"));
			(min.length === 1 ? (timer += z.concat(min) + "'") : (timer += min) + "'");
			var tod_data = tod_data_structure(lcn, seg);
			tod_data.begin_time = timer;
			tod_data.plan_id = current_tod.PlanID;
			tod_plan_list.push(tod_data);
		}
		if (seg === 20) {
			InsertTodSQL(lcn, tod_plan_list, con_db, sql_generator);
		}
	}
}

function plan_data_process(input_data, plan_content, con_db, sql_generator, websocket){
	switch(input_data.key){
		case '5FC4':
			// console.log(JSON.stringify(input_data));
			std_part_light_time(input_data, plan_content);
			break;
		case '5FC5':
			// console.log(JSON.stringify(input_data));
			std_part_info(input_data, plan_content);
			break;
		case 'BFC3':
			console.log(JSON.stringify(input_data));
			InsertPriorityControl(input_data, con_db, sql_generator, websocket);
			break;
		default:
			break;
	}
	function std_part_light_time(input_data, plan_content){
		for(var subphase_index=0; subphase_index<input_data.SubPhaseCount; ++subphase_index){
			var current_light = input_data.result[subphase_index]
			var subphase_num = (subphase_index+1);
			var str_mg = 'ming'+subphase_num;
			var str_Mg = 'maxg'+subphase_num;
			var str_y = 'yellow'+subphase_num;
			var str_r = 'allred'+subphase_num;
			var str_pgf = 'pgflash'+subphase_num;
			var str_pr = 'pred'+subphase_num;
			plan_content[str_mg] = current_light.MinGreen;
			plan_content[str_Mg] = current_light.MaxGreen;
			plan_content[str_y] = current_light.Yellow;
			plan_content[str_r] = current_light.AllRed;
			plan_content[str_pgf] = current_light.PedGreenFlash;
			plan_content[str_pr] = current_light.PedRed;
		}
	}
	function std_part_info(input_data, plan_content){
		for(var subphase_index=0; subphase_index<input_data.SubPhaseCount; ++subphase_index){
			var current_green = input_data.result[subphase_index];
			var subphase_num = (subphase_index+1);
			var str_g = 'g'+subphase_num;
			plan_content[str_g] = current_green.Green;
		}
		plan_content.dir = input_data.Direct;
		plan_content.cycletime = input_data.CycleTime;
		plan_content.time_offset = input_data.Offset;
		// plan_content.created_at = input_data.MsgTime;
		var str_hex = '';
		var decimal_num = input_data.PhaseOrder;
		if(decimal_num < 16){
			str_hex = '0'+decimal_num.toString(16);
		}else{
			str_hex = decimal_num.toString(16);
		}
		plan_content.phase_no = str_hex.toUpperCase();
	}
}

function InsertSegTypeSQL(seg_result, con_db, sql_generator) { // insert data to day_segtype_tc
	var table_name = 'day_segtype_tc';
	var str_sql_delete = '';
	str_sql_delete += 'DELETE FROM [brt].[dbo].[day_segtype_tc] WHERE equip_id=' + seg_result.equip_id;
	sql_generator.Execute("SegmentType - delete before insert,", con_db, str_sql_delete);
	var column_name = [];
	for (p in seg_result) {
		column_name.push(p);
	}
	// console.log(column_name);
	var column_type = get_column_type();
	var str_sql = '';
	str_sql += sql_generator.InsertInto(table_name, column_name, column_type, seg_result);
	// console.log(str_sql);
	sql_generator.Execute("SegmentType insert,", con_db, str_sql);
}

function get_column_type() {
	var column_type = [
		1, 1, 1, 1, 1,
		1, 1, 1, 1, 1,
		1, 1, 1, 1, 0,
		0, 0, 0, 0, 0,
		0, 0, 0, 0, 0,
		0, 0, 0, 0, 0,
		0, 0, 0, 0, 0,
		0, 0, 0, 0, 0
	];
	return column_type;
}

function InsertTodSQL(lcn, tod_plan_list, con_db, sql_generator) { // insert data to tod_plan_tc without priority data
	var table_name = '[brt].[dbo].[tod_plan_tc]';
	var str_sql_delete = '';
	str_sql_delete += 'DELETE FROM [brt].[dbo].[tod_plan_tc] WHERE equip_id=' + lcn;
	sql_generator.Execute("TodPlan - delete before insert,", con_db, str_sql_delete);
	var column_name = [];
	for (p in tod_plan_list[0]) {
		column_name.push(p);
	}
	var str_sql_tod = '';
	str_sql_tod += "INSERT INTO " + table_name + " (";
	for (var col_index = 0; col_index < column_name.length; ++col_index) {
		str_sql_tod += column_name[col_index];
		if (col_index == (column_name.length - 1)) {
			str_sql_tod += " ";
		} else {
			str_sql_tod += ", ";
		}
	}
	str_sql_tod += ") VALUES";
	for (var tod_index = 0; tod_index < tod_plan_list.length; ++tod_index) {
		var current_data = tod_plan_list[tod_index];
		str_sql_tod += " (";
		for (var col_index = 0; col_index < column_name.length; ++col_index) {
			var current_name = column_name[col_index];
			str_sql_tod += current_data[current_name];

			if (col_index == (column_name.length - 1)) {} else {
				str_sql_tod += ", ";
			}
		}
		tod_index === (tod_plan_list.length - 1) ? (str_sql_tod += ") ") : (str_sql_tod += "), ");
	}
	// console.log(str_sql_tod);
	sql_generator.Execute("TodPlan insert,", con_db, str_sql_tod);
}

function UpdateTod(con_db, sql_generator, input_data, websocket){
	var priority_data = priority_data_structure(input_data.SegmentType);
	var table_name = '[brt].[dbo].[tod_plan_tc]';
	var column_name =[];
	var column_type =[1,1,1,1];
	for(p in priority_data){
		column_name.push(p);
	}
	for(var update_index=0; update_index<input_data.result.length; ++update_index){
		var current_priority = input_data.result[update_index];
		var its_planid = current_priority.PlanId;
		priority_data.priority_id = its_planid;
		priority_data.priority_switch = current_priority.OnOff;
		var hour = current_priority.Hour.toString();
		var min = current_priority.Min.toString();
		var timer = "'";
		var z = '0';
		(hour.length === 1 ? (timer += z.concat(hour) + ":") : (timer += hour + ":"));
		(min.length === 1 ? (timer += z.concat(min) + "'") : (timer += min) + "'");
		var str_update_tod ='';
		str_update_tod += sql_generator.Update(table_name, column_name, column_type, priority_data);
		str_update_tod += ' WHERE equip_id='+input_data.LCN+' AND seg_type='+input_data.SegmentType+' AND begin_time='+timer+' AND plan_id='+its_planid;
		// console.log(str_update_tod);
		sql_generator.Execute("TodPlan update,", con_db, str_update_tod);
	}
	setTimeout(function(){ // in order to make trigger after db process. sign event later
	var ready_data = {};
	ready_data.FunctionNo = 'ready';
	ready_data.MsgTypeNo = 'todplan';
	ready_data.LCN = input_data.LCN;
	ready_data.seg = input_data.SegmentType;
	var json = JSON.stringify(ready_data);
	try{
        websocket.send(json);
    }catch (e){
        console.log(e + ' @/socket/lib/query_time_plan/primary func UpdateTod');
    }
	// db_process.SelectTod(con_db, sql_generator, websocket, input_data.LCN, input_data.SegmentType);
	},0);
}

function InsertStdSQL(con_db, sql_generator, plan_content, websocket){
	console.log(plan_content);
	var table_name = 'std_plan_tc';
	var column_name = [];
	for(p in plan_content){
		column_name.push(p);
	}
	var str_sql_delete = '';
	str_sql_delete += 'DELETE FROM '+table_name+' WHERE equip_id='+plan_content.equip_id+' AND plan_id='+plan_content.plan_id;
	console.log(str_sql_delete);
	sql_generator.Execute("StdPlan - delete before insert,", con_db, str_sql_delete);
	var column_type = [1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1];
	var str_std_insert = '';
	str_std_insert += sql_generator.InsertInto(table_name, column_name, column_type, plan_content);
	console.log(str_std_insert);
	sql_generator.Execute("StdPlan insert,", con_db, str_std_insert);
	// send to web tells data ready
	setTimeout(function(){ // in order to make trigger after db process. sign event later
	var ready_data = {};
	ready_data.FunctionNo = 'ready';
	ready_data.MsgTypeNo = 'stddata';
	ready_data.LCN = plan_content.equip_id;
	ready_data.plan_id = plan_content.plan_id;
	ready_data.phase_no = plan_content.phase_no;
	var json = JSON.stringify(ready_data);
    try{
        websocket.send(json);
    }catch (e){
        console.log(e + ' @/socket/lib/query_time_plan/primary func InsertStdSQL');
    }
    },0);
}

function InsertPriorityControl(input_data, con_db, sql_generator, websocket){
	var control_data = priority_control_structure(input_data.LCN, input_data.PlanId);
	control_data.headway_up = input_data.TH1_EAST; // ?????????????????? (not sure yet)
	control_data.headway_down = input_data.TH1_WEST;
	control_data.lowspeed = input_data.TH2;
	control_data.door_trigger_up = input_data.TIME_EAST;
	control_data.door_trigger_down = input_data.TIME_WEST;
	control_data.past_east = input_data.EAST_BYTE;
	control_data.past_west = input_data.WEST_BYTE;
	for(var percent_index=0; percent_index<control_data.PhaseCount; ++percent_index){
		var index = (percent_index+1);
		var property_name_e = 'percentage_east'+index;
		var property_name_w = 'percentage_west'+index;
		var current_obj = input_data.result[percent_index];
		control_data[property_name_e] = current_obj.Percentage_EAST;
		control_data[property_name_w] = current_obj.Percentage_WEST;
	}
	console.log(control_data);
	var table_name = 'priority_control_tc';
	var column_name =[];
	for(p in control_data){
		column_name.push(p);
	}
	var column_type =[1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	var str_control_delete='';
	str_control_delete += 'DELETE FROM '+table_name+' WHERE equip_id='+control_data.equip_id+' AND priority_id='+control_data.priority_id;
	console.log(str_control_delete);
	sql_generator.Execute("PriorityControl - delete before insert,", con_db, str_control_delete);
	var str_control = '';
	str_control += sql_generator.InsertInto(table_name, column_name, column_type, control_data);
	console.log(str_control);
	sql_generator.Execute("PriorityControl insert,", con_db, str_control);
	// send to web tells data ready
	setTimeout(function(){ // in order to make trigger after db process. sign event later
	var ready_data = {};
	ready_data.FunctionNo = 'ready';
	ready_data.MsgTypeNo = 'controldata';
	ready_data.LCN = control_data.equip_id;
	ready_data.priority_id = control_data.priority_id;
	var json = JSON.stringify(ready_data);
    try{
        websocket.send(json);
    }catch (e){
        console.log(e + ' @/socket/lib/query_time_plan/primary func InsertStdSQL');
    }
    },0);
}

function seg_data_structure(lcn) {
	var seg = {
		equip_id: lcn,
		segtype: 0,
		mon: 0,
		tue: 0,
		wed: 0,
		thu: 0,
		fri: 0,
		sat: 0,
		sun: 0,
		even_mon: 0,
		even_tue: 0,
		even_wed: 0,
		even_thu: 0,
		even_fri: 0,
		even_sat: 0,
		even_sun: 0,
	};
	return seg;
}
function tod_data_structure(lcn, seg) {
	var tod = {
		equip_id: lcn,
		seg_type: seg,
		begin_time: '00:00',
		plan_id: 0,
		priority_id: null,
		car_countdown: null,
		ped_countdown: null,
		priority_switch: null,
	};
	return tod;
}
function priority_data_structure(seg){
	var priority = {
		priority_id: 0,
		// car_countdown: 2,
		// ped_countdown: 2,
		priority_switch: 2,
	};
	return priority;
}
function std_data_structure(lcn, planid){
	var std = {
		equip_id: parseInt(lcn),
		plan_id: planid,
		dir: 0,
		phase_no: null,
		allred1:0,
		allred2:0,
		allred3:0,
		allred4:0,
		allred5:0,
		allred6:0,
		allred7:0,
		allred8:0,
		yellow1:0,
		yellow2:0,
		yellow3:0,
		yellow4:0,
		yellow5:0,
		yellow6:0,
		yellow7:0,
		yellow8:0,
		g1:0,
		g2:0,
		g3:0,
		g4:0,
		g5:0,
		g6:0,
		g7:0,
		g8:0,
		pgreen1:0,
		pgreen2:0,
		pgreen3:0,
		pgreen4:0,
		pgreen5:0,
		pgreen6:0,
		pgreen7:0,
		pgreen8:0,
		pgflash1:0,
		pgflash2:0,
		pgflash3:0,
		pgflash4:0,
		pgflash5:0,
		pgflash6:0,
		pgflash7:0,
		pgflash8:0,
		pred1:0,
		pred2:0,
		pred3:0,
		pred4:0,
		pred5:0,
		pred6:0,
		pred7:0,
		pred8:0,
		ming1:0,
		ming2:0,
		ming3:0,
		ming4:0,
		ming5:0,
		ming6:0,
		ming7:0,
		ming8:0,
		maxg1:0,
		maxg2:0,
		maxg3:0,
		maxg4:0,
		maxg5:0,
		maxg6:0,
		maxg7:0,
		maxg8:0,
		cycletime:0,
		time_offset:0,
		op_mode:0,
		need_update:0,
		created_at:null,
		updated_at:null
	};
	return std;
}
function priority_control_structure(lcn, planid){
	var control = {
		equip_id: lcn,
		priority_id: planid,
		past_east: null,
		past_west: null,
		headway_up: null,
		headway_down: null,
		lowspeed: null,
		door_trigger_up: null,
		door_trigger_down: null,
		percentage_east1:0,
		percentage_east2:0,
		percentage_east3:0,
		percentage_east4:0,
		percentage_east5:0,
		percentage_east6:0,
		percentage_west1:0,
		percentage_west2:0,
		percentage_west3:0,
		percentage_west4:0,
		percentage_west5:0,
		percentage_west6:0,
	};
	return control;
}
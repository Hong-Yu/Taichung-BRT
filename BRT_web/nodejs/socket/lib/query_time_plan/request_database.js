module.exports = {
	Assign: function(con_db, sql_generator, ws, input_data){
		console.log('request data from db');
    },
	SelectTod: function(con_db, sql_generator, websocket, LCN, SegmentType){
		select_tod_plan(con_db, sql_generator, websocket, LCN, SegmentType);
	},
    SelectStd: function(con_db, sql_generator, websocket, LCN, plan_id, std_struc, phase_no){
        select_std_plan(con_db, sql_generator, websocket, LCN, plan_id, std_struc, phase_no);
    },
    SelectControl: function(con_db, sql_generator, websocket, LCN, priority_id, control_struc){
        select_priority_control(con_db, sql_generator, websocket, LCN, priority_id, control_struc);
    },
    SelectSeg: function(con_db, sql_generator, websocket, lcn){
        select_segmenttype(con_db, sql_generator, websocket, lcn);
    },
    SelectStdDB: function(con_db, sql_generator, websocket, LCN, plan_id, std_struc){
        select_std_plan_db(con_db, sql_generator, websocket, LCN, plan_id, std_struc);
    }
};

function select_tod_plan(con_db, sql_generator, websocket, lcn, seg){
	var result={};
	var table_name = '[brt].[dbo].[tod_plan_tc]';
	var column_name = ['begin_time', 'plan_id', 'priority_id', 'priority_switch'];
	var str_select_tod = '';
	str_select_tod += sql_generator.Select(table_name, column_name);
	str_select_tod += ' WHERE equip_id='+lcn+' AND seg_type='+seg;
	console.log(str_select_tod);
	var query = con_db.query(str_select_tod);
	query.exec( function( err, res ){
      if( err ){
         console.log('Select Error: request_database.js select_tod_plan\n');
         console.log(err);
         return;
      }else{
         result.FunctionNo = 'result';
         result.MsgTypeNo = 'todplan';
         result.todList = res.result;
         result.LCN = lcn;
         result.SegmentType = seg;
         // console.log(result);
         var json_string = JSON.stringify(result);
         websocket.send(json_string);
      }
   });
}

function select_std_plan(con_db, sql_generator, websocket, LCN, plan_id, std_strc, phase_no){
    var result={};
    var table_name = '[brt].[dbo].[std_plan_tc]';
    var column_name = [];
    for(p in std_strc){
        column_name.push(p);
    }
    var str_select_std = '';
    str_select_std += sql_generator.Select(table_name, column_name);
    str_select_std += ' WHERE equip_id='+LCN+' AND plan_id='+plan_id;
    console.log(str_select_std);
    var query = con_db.query(str_select_std);
    query.exec( function( err, res ){
        if( err ){
            console.log('Select Error: request_database.js select_std_plan\n');
            console.log(err);
            return;
        }else{
            result.FunctionNo = 'result';
            result.MsgTypeNo = 'stdplan';
            result.stdplan = res.result;
            result.LCN = LCN;
            result.plan_id = plan_id;
            // console.log(result);
            var json_string = JSON.stringify(result);
            websocket.send(json_string);
        }
    });
    // select phase name
    var phase_result={};
    var table_phase = '[brt].[dbo].[phase]';
    var column_phase = ['phase_no', 'phase_name', 'phase_total', 'phase_step'];
    var str_select_phase ='';
    str_select_phase += sql_generator.Select(table_phase, column_phase);
    str_select_phase += " WHERE phase_no='"+phase_no+"'";
    console.log(str_select_phase);
    var query_phase = con_db.query(str_select_phase);
    query_phase.exec( function( err, res ){
        if( err ){
            console.log('Select Error: request_database.js select_std_plan\n');
            console.log(err);
            return;
        }else{
            phase_result.FunctionNo = 'result';
            phase_result.MsgTypeNo = 'phase';
            res.result[0].plan_id = plan_id;
            phase_result.phase = res.result;
            // phase_result.plan_id = plan_id;
            // console.log(phase_result);
            var json_string = JSON.stringify(phase_result);
            websocket.send(json_string);
        }
    });

}function select_std_plan_db(con_db, sql_generator, websocket, LCN, plan_id, std_strc){
    this.phase_no = '';
    var result={};
    var table_name = '[brt].[dbo].[std_plan_tc]';
    var column_name = [];
    for(p in std_strc){
        column_name.push(p);
    }
    var str_select_std = '';
    str_select_std += sql_generator.Select(table_name, column_name);
    str_select_std += ' WHERE equip_id='+LCN+' AND plan_id='+plan_id;
    // console.log(str_select_std);
    var query = con_db.query(str_select_std);
    query.exec( function( err, res ){
        if( err ){
            console.log('Select Error: request_database.js select_std_plan\n');
            console.log(err);
            return;
        }else{
            result.FunctionNo = 'result';
            result.MsgTypeNo = 'stdplan';
            result.stdplan = res.result;
            result.LCN = LCN;
            result.plan_id = plan_id;
            console.log(result);
            var json_string = JSON.stringify(result);
            websocket.send(json_string);
            // this.phase_no = result.stdplan[0].phase_no;
    // select phase name
    console.log(result.stdplan[0].phase_no);
    var phase_no = result.stdplan[0].phase_no;
    var phase_result={};
    var table_phase = '[brt].[dbo].[phase]';
    var column_phase = ['phase_no', 'phase_name', 'phase_total', 'phase_step'];
    var str_select_phase ='';
    str_select_phase += sql_generator.Select(table_phase, column_phase);
    str_select_phase += " WHERE phase_no='"+phase_no+"'";
    console.log(str_select_phase);
    var query_phase = con_db.query(str_select_phase);
    query_phase.exec( function( err, res ){
        if( err ){
            console.log('Select Error: request_database.js select_std_plan\n');
            console.log(err);
            return;
        }else{
            phase_result.FunctionNo = 'result';
            phase_result.MsgTypeNo = 'phase';
            console.log(res.result);
            res.result[0].plan_id = plan_id;
            phase_result.phase = res.result;
            // phase_result.plan_id = plan_id;
            console.log(phase_result);
            var json_string = JSON.stringify(phase_result);
            websocket.send(json_string);
        }
    });
        }
    });

}
function select_priority_control(con_db, sql_generator, websocket, LCN, priority_id, control_strc){
    var result={};
    var table_name = '[brt].[dbo].[priority_control_tc]';
    var column_name = [];
    for(p in control_strc){
        column_name.push(p);
    }
    var str_select_prior_ctl = '';
    str_select_prior_ctl += sql_generator.Select(table_name, column_name);
    str_select_prior_ctl += ' WHERE equip_id='+LCN+' AND priority_id='+priority_id;
    console.log(str_select_prior_ctl);
    var query = con_db.query(str_select_prior_ctl);
    query.exec( function( err, res ){
        if( err ){
            console.log('Select Error: request_database.js select_tod_plan\n');
            console.log(err);
            return;
        }else{
            result.FunctionNo = 'result';
            result.MsgTypeNo = 'priorityplan';
            result.priorityplan = res.result;
            result.LCN = LCN;
            result.priority_id = priority_id;
            // console.log(result);
            var json_string = JSON.stringify(result);
            websocket.send(json_string);
        }
    });
}

function select_segmenttype(con_db, sql_generator, websocket, lcn){
    var result_obj={};
    // var table_name = '[brt].[dbo].[day_segtype_tc]';
    var str_select_seg = '';
    str_select_seg += 'SELECT [equip_id],[segtype],[mon],[tue],[wed],[thu],[fri],[sat],[sun],[even_mon],[even_tue],[even_wed],[even_thu],[even_fri],[even_sat],[even_sun]';
    str_select_seg += ' ,[spc1_startdate],[spc1_enddate],[spc1],[spc2_startdate],[spc2_enddate],[spc2],[spc3_startdate],[spc3_enddate],[spc3],[spc4_startdate],[spc4_enddate],[spc4]';
    str_select_seg += ' ,[spc5_startdate],[spc5_enddate],[spc5],[spc6_startdate],[spc6_enddate],[spc6],[spc7_startdate],[spc7_enddate],[spc7],[spc8_startdate],[spc8_enddate],[spc8]';
    str_select_seg += ' ,[spc9_startdate],[spc9_enddate],[spc9],[spc10_startdate],[spc10_enddate],[spc10],[spc11_startdate],[spc11_enddate],[spc11],[spc12_startdate],[spc12_enddate],[spc12]';
    str_select_seg += ' ,[spc13_startdate],[spc13_enddate],[spc13],[need_update]';
    str_select_seg += ' FROM [brt].[dbo].[day_segtype_tc]';
    str_select_seg += ' WHERE equip_id='+lcn;
    // console.log(str_select_seg);
    var query = con_db.query(str_select_seg);
    query.exec( function( err, res ){
        if( err ){
            console.log('Select Error: request_database.js select_tod_plan\n');
            console.log(err);
            return;
        }else{
            if(res.result.length===0){
                result_obj.FunctionNo = 'result';
                result_obj.MsgTypeNo = 'segtype';
                result_obj.result_seg = {};
                result_obj.result_seg.result = [];
                result_obj.result_seg.result[0] = 'NoData';
                var json_string = JSON.stringify(result_obj);
                try{
                websocket.send(json_string);
                }catch(e){
                    console.log(e);
                }
            }else{
            try{
                result_obj.FunctionNo = 'result';
                result_obj.MsgTypeNo = 'segtype';
                result_obj.result_seg = {};
                result_obj.result_seg.result = res.result;
                // result_obj.LCN = LCN;
                result_obj.rowcount = 1;
                // console.log(result_obj);
                var json_string = JSON.stringify(result_obj);
                websocket.send(json_string);
            }catch(e){
                console.log(e);
            }
            }
        }
    });
}
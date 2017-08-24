// Microsoft SQL server
var mssql = require('./lib/mssql_connector');
mssql.Initialize();
var ms_connector = mssql.get_connector();
// sql smart generator
var sql_generator =  require('./lib/sql_generator.js');
// UDP client
var upd_client = require('./lib/udp_client.js');
upd_client.Initialize();
// live status
var live_status = require("./lib/live_status/primary.js");
live_status.Initialize();
// live status - traffic light display
var live_light = require('./lib/live_traffic_light/primary.js');
live_light.set_connector(ms_connector);
live_light.Initialize();
// live device
var live_device = require('./lib/live_device/primary.js');
live_device.Initialize(ms_connector);
// live bus
var live_bus = require('./lib/live_bus/primary.js');
live_bus.Initialize();
// live_steps
var live_steps = require('./lib/live_steps/primary.js');
live_steps.Initialize();
// Live status sketch
var live_sketch = require('./lib/live_status_sketch/primary.js');
live_sketch.Initialize(ms_connector);
live_sketch.set_connector(ms_connector);
live_sketch.set_sql_generator(sql_generator);
// UDP server
var upd_server = require('./lib/udp_server.js');
upd_server.Initialize();
upd_server.set_live_status(live_status);
upd_server.set_live_light(live_light);
upd_server.set_live_device(live_device);
upd_server.set_live_bus(live_bus);
upd_server.set_live_status_sketch(live_sketch);
upd_server.set_live_steps(live_steps);
upd_server.Start();
// Accident statement
var accident_statement = require('./lib/accident/accident_receiver.js');
accident_statement.Initialize();
accident_statement.set_connector(ms_connector);
// Performance
var route_separate = require("./lib/performance/route_separate.js");
route_separate.Initialize();
var brt_performance = require('./lib/performance/primary.js');
brt_performance.Initialize();
brt_performance.set_connector(ms_connector);
brt_performance.set_sql_generator(sql_generator);
brt_performance.set_route_separator(route_separate);
//Device manager
var device_manager_select = require('./lib/device_manager/select.js');
device_manager_select.set_connector(ms_connector);
device_manager_select.set_sql_generator(sql_generator);
var device_manager = require('./lib/device_manager/primary.js');
device_manager.Initialize();
device_manager.set_connector(ms_connector);
device_manager.set_sql_generator(sql_generator);
device_manager.set_selector(device_manager_select);
// query time_plan
var query_time_plan = require('./lib/query_time_plan/primary.js');
query_time_plan.Initialize();
query_time_plan.set_connector(ms_connector);
query_time_plan.set_sql_generator(sql_generator);
//Timing plan
var timing_plan = require('./lib/timing_plan/primary.js');
timing_plan.Initialize();
timing_plan.set_connector(ms_connector);
timing_plan.set_sql_generator(sql_generator);
var timing_plan_udp = require('./lib/timing_plan/udp.js');
// Intersection
var intersection_selector = require('./lib/intersection/primary.js');
intersection_selector.set_connector(ms_connector);
intersection_selector.set_sql_generator(sql_generator);
// history
//var history = require('./lib/history/primary.js');
//history.set_connector(ms_connector);
// PhaseLighting
var phase_lighting = require('./lib/phase_lighting/primary.js');
phase_lighting.Initialize();
phase_lighting.set_connector(ms_connector);
phase_lighting.set_sql_generator(sql_generator);
// TimeSpaceDiagram
var time_space_diagram = require('./lib/time_space_diagram/primary.js');
time_space_diagram.Initialize();
time_space_diagram.set_connector(ms_connector);
time_space_diagram.set_sql_generator(sql_generator);
// Scheduling
var scheduling_obj = require('./lib/scheduling/schedule_obj.js');
var scheduling = require('./lib/scheduling/scheduling_primary.js');
scheduling.Initialize(scheduling_obj);

//web socket zone
var HOST = '192.168.1.2';
var PORT = 9098;

var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port:PORT},{host:HOST});

// tining plan
//var plan_renew = require('./lib/timing_plan_renew.js');
//plan_renew.Initialize();
//var sql_connect = plan_renew.get_connector();
//var plan_update_prioirty = require('./lib/timing_plan_update_priority.js');
//plan_update_prioirty.set_connector(sql_connect);


wss.on('connection', function(ws) {
    console.log('web socket connected');
//   console.log(ws);
    // Active upd server
    timing_plan_udp.Close();
    timing_plan_udp.set_QueryTC(query_time_plan);
    timing_plan_udp.Listening(ws);
    ws.on('open', function() {
        console.log('web socket opened');

    });
    ws.on('message', function(message) {
        console.log("web socket receive -:");
        try {
            var determine_no = JSON.parse(message).FunctionNo.toString() + "-" + JSON.parse(message).MsgTypeNo.toString();
            switch(determine_no){
                case '1-0':
                    console.log("1-0");
                    var request_data = JSON.parse(message);
                    timing_plan.Output(ws, request_data.equip_id);
                    break;
                case "2-0" :
                    var plan_data = JSON.parse(message);
                    // send data to TC by udp server
                    timing_plan.Input(plan_data);
                    upd_client.Send(message);
                    break;
                case "timing_plan-upload_to_database" :
                    console.log("timing_plan-upload_to_database");
                    var plan_data = JSON.parse(message);
                    timing_plan.Input(plan_data);
                    break;
                case 'light_status-requesting': // traffic light
                    console.log("light_status-requesting");
                    var request_data = JSON.parse(message);
                    ws.map_center = request_data.map_center;
                    live_light.SendStatus(ws);
                    break;
                case 'light_status-map_center_changed':
                    console.log("light_status-map_center_changed");
                    var request_data = JSON.parse(message);
                    ws.map_center = request_data.map_center;
                    break;
                case 'live_status-requesting': // live status
                    var request_data = JSON.parse(message);
                    console.log("live_status ID: " + request_data.intersection_id);
                    live_status.SendStatus(ws, request_data.intersection_id);
                    break;
                case 'device_status-requesting':
                    console.log("device_status-requesting");
                    live_device.SendStatus(ws);
                    break;
                case 'bus_status-requesting':
                    console.log("bus_status-requesting");
                    live_bus.SendStatus(ws);
                    break;
                case 'accident-requesting':
                    console.log("accident-requesting");
                    accident_statement.SelectData(ws);
                    break;
                case 'accident-establish':
                    console.log("accident-establish");
                    var accident_data = JSON.parse(message);
                    accident_statement.DataBase(accident_data.active, ws, accident_data.accident);
                    break;

               case '400-1':
                  console.log("400-1 Live_sketch page initialize.");
                  live_sketch.Initial(ws);
                  break;
               case '400-3':
                  console.log("400-3 Route selected, request data for map draw.");
                  var sketch_data = JSON.parse(message);
                  live_sketch.Output(ws, sketch_data.route_id);
                  break;
               case '400-7':
                  console.log("400-7 Start send live status");
               function CycleStatus1() {
                  if(ws.readyState == 3) return; // stop when disconnect.
                  live_sketch.SendStatus(ws);
                  ws.status_timer = setTimeout(arguments.callee, 500);
               }
                  CycleStatus1();
                  break;
               case '400-9':
                  console.log("400-9 Start send live light");
               function CycleStatus2() {
                  if(ws.readyState == 3) return; // stop when disconnect.
                  live_sketch.SendLight(ws);
                  ws.status_timer = setTimeout(arguments.callee, 500);
               }
                  CycleStatus2();
                  break;
                case '500-1':
                    console.log("500-1");
                    brt_performance.Output(ws);
                    break;
                case '600-1':
                    console.log("600-1");
                    device_manager.Output(ws);
                    break;
                case 'device_manager-update':
                    console.log("device_manager-update");
                    var device_data = JSON.parse(message);
                    device_manager.Input(device_data.active, device_data.type, device_data.content);
                    break;
                case '1000-1':
                    console.log("1000-1");
                    intersection_selector.Output(ws);
                    break;
//                case '0F-13':
//                    console.log("BF-11");
//                    upd_client.Send(message);
//                    break;
                case 'BF-11':
                    console.log("BF-11");
                    timing_plan_udp.Input(message);
                    break;
                case '0F-10':
                    console.log("0F-10");
                    timing_plan_udp.Input(message);
                    break;
                case '0F-15':
                    console.log("0F-15");
                    timing_plan_udp.Input(message);
                    break;
                case '0F-12':
                    console.log("0F-12");
                    timing_plan_udp.Input(message);
                    break;
                case '0F-14':
                    console.log("0F-14");
                    timing_plan_udp.Input(message);
                    break;
                case '50-14':
                    console.log("50-14");
                    timing_plan_udp.Input(message);
                    break;
                case '50-15':
                    console.log("50-15");
                    timing_plan_udp.Input(message);
                    break;
                case '0F-45':
                    console.log("0F-45");
                    timing_plan_udp.Input(message);
                    break;
                case '0F-42':
                    console.log("0F-42");
                    timing_plan_udp.Input(message);
                    break;
                case '0F-44':
                    console.log("0F-44");
                    timing_plan_udp.Input(message);
                    break;
                case '5F-40':
                    console.log("5F-40");
                    timing_plan_udp.Input(message);
                    break;
                case '0F-43':
                    console.log("0F-43");
                    timing_plan_udp.Input(message);
                    break;
                case '0F-40':
                    console.log("0F-40");
                    timing_plan_udp.Input(message);
                    break;
                case '50-45':
                    console.log("50-45");
                    timing_plan_udp.Input(message);
                    break;
                case '50-44':
                    console.log("50-44");
                    timing_plan_udp.Input(message);
                    break;
                case '5F-6F':
                    console.log("5F-6F");
                    timing_plan_udp.Input(message);
                    break;
                case '5F-3F':
                    console.log("5F-3F set_light_or_step_reply_cycle");
                    timing_plan_udp.Input(message);
                    break;
                case '5F-10':
                    console.log("5F-10 set_pattern");
                    timing_plan_udp.Input(message);
                    break;
                case '0F-11':
                    console.log("0F-11 set_communication");
                    timing_plan_udp.Input(message);
                    break;
                case '2020-1':
                  console.log("2020-1 Phase selected, request data from DB.");
                  var phase_data = JSON.parse(message);
                  phase_lighting.select_phase(ws, phase_data.phase_no);
                  break;
               case '203-4' :
                  console.log("203-4 Select list initialize for phase_lighting.");
                  var phase_data_select = JSON.parse(message);
                  phase_lighting.select_data(ws, phase_data_select.phase_no);
                  break;
               case '203-6' :
                  console.log("203-6 Update steps for phase_lighting.");
                  var phase_data_upload = JSON.parse(message);
                  phase_lighting.update_phase(ws, phase_data_upload.phase_no, phase_data_upload.phasedata);
                  break;
                case '203-8' :
                    console.log("203-8 Prepare downstream data");
                    var phase_data_down = JSON.parse(message);
                    phase_lighting.Output(ws, phase_data_down.phase_no, phase_data_down.LCN);
                    break;
                case '3-0' :
                    console.log("3-0 Update steps to TC.");
//                    timing_plan_udp.Input(message);
                    phase_lighting.Input(message);
                    break;
               case '700-1' :
                  console.log("700-1 Request data for tsd select list.");
                  var tsd_list = JSON.parse(message);
                  time_space_diagram.request_seg(ws, tsd_list.intersection_id, tsd_list.tsd_date);
                  break;
               case '700-3' :
                  console.log("700-3 Request data for time_space_diagram.");
                  var tsd_request = JSON.parse(message);
                  time_space_diagram.request_plan(ws, tsd_request.select_intersetion, tsd_request.next1_intersetion, tsd_request.next2_intersetion);
                  break;
                case 'scheduling-new':
                    var sche_data = JSON.parse(message);
                    console.log('creating a new scheduling: '+sche_data.scheduling_name);
                    scheduling.New(sche_data.result, sche_data.scheduling_name);
                    break;
                case 'scheduling-query':
                    console.log('query scheduling on running.');
                    scheduling.Query(ws);
                    break;
                case 'scheduling-delete':
                    var delete_sche = JSON.parse(message);
                    console.log('delete a scheduling: '+delete_sche.scheduling_name);
                    scheduling.Delete(delete_sche.scheduling_name, ws);
                    break;
                case 'query-segtype':
                    var query_seg = JSON.parse(message);
                    console.log('query segment type content for LCN: '+ query_seg.LCN);
                    query_time_plan.set_websocket(ws);
                    query_time_plan.SegType(query_seg.LCN);
                    break;
                case 'BF-42':
                    console.log("BF-42");
                    timing_plan_udp.Input(message);
                    break;
                case 'BF-43':
                    console.log("BF-43");
                    timing_plan_udp.Input(message);
                    break;
                case 'query-plan':
                    console.log("query-plan");
                    var query_plan = JSON.parse(message);
                    query_time_plan.set_websocket(ws);
                    query_time_plan.TimePlan(query_plan.LCN, query_plan.plan_id);
                    break;
                case 'request-stddata':
                    var request_stddata = JSON.parse(message);
                    console.log('request tod plan for LCN: '+request_stddata.LCN);
                    query_time_plan.DB_process(request_stddata, ws);
//                    query_time_plan.set_websocket(ws);
                    break;
                case 'request-controldata':
                    var request_controldata = JSON.parse(message);
                    console.log('request tod plan for LCN: '+request_controldata.LCN);
                    query_time_plan.DB_process(request_controldata, ws);
//                    query_time_plan.set_websocket(ws);
                    break;
                case 'request-todplan':
                    var request_todplan = JSON.parse(message);
                    console.log('request tod plan for LCN: '+request_todplan.LCN);
                    query_time_plan.DB_process(request_todplan, ws);
//                    query_time_plan.set_websocket(ws);
                    break;
                case 'query-fromdb':
                    var query_plan_fromdb = JSON.parse(message);
                    // query_time_plan.set_websocket(ws);
                    query_time_plan.TimePlanDB(query_plan_fromdb.LCN, ws);
                    break;
                case 'request-stddata_db':
                    var request_std = JSON.parse(message);
                    console.log('request std plan for LCN: '+request_std.LCN+' from DB');
                    query_time_plan.DB_process(request_std, ws);
                    break;
                default:
                    console.log('requesting is not define ', determine_no);
                    break;
            }
        }catch(e){
            console.log(e);
        }
    });
    ws.on('close', function() {
        console.log('disconnected');
    });
});





















// Microsoft SQL server
var mssql = require('../lib/mssql_connector');
mssql.Initialize();
var ms_connector = mssql.get_connector();
// sql smart generator
var sql_generator =  require('../lib/sql_generator.js');
// phase modify
var phase_modigy = require('./phase_modify.js');
phase_modigy.Initialize(ms_connector, sql_generator);
// intersection request
var intersection = require('./Intersection_request');
intersection.Initialize(ms_connector, sql_generator);

// route manager
var route_manager = require('../model/route_manager');
// history
var history = require('../model/history/primary.js');
var account_manager = require('../model/account_manager/primary.js');
var device_manager = require('../model/device_manager/primary.js');
var web_settings = require('../model/web_settings/primary.js');
var account_authenticated = require('../model/account_authenticated/primary.js');
var traffic_light_manager = require('../model/traffic_light_manager/primary.js');

// config/database.js
module.exports = {
    AccountAuthenticate : function(act, input_data, response) {
        account_authenticated.Manipulate(act, input_data, response);
    },
    AccountManager : function(act, input_data, response) {
        account_manager.Manipulate(act, input_data, response);
    },
    PhaseList : function(input_data, response) {
        phase_modigy.PhaseList(response);
    },
    PhaseUpdate :function(input_data, response) {
        phase_modigy.PhaseUpdate(input_data.phase, response);
    },
    PhaseDelete : function(input_data, response){
        phase_modigy.PhaseDelete(input_data.phase_no, response);
    },
    PhaseRenew : function(input_data, response){
        phase_modigy.PhaseRenew(input_data.phase_data, response);
    },
    PhaseRenewStep : function(input_data, response){
        phase_modigy.PhaseRenewStep(input_data.phase_data, response);
    },
    IntersectionList : function(input_data, response){
        intersection.List(response);
    },
    TravelTimeProcess : function(input_data, response){
        performance.DataProcess(input_data, response);
    },
    RouteManager: function(act, input_data, response) {
        route_manager.Manipulate(act, input_data, response);
    },
    History: function(act, input_data, response) {
        history.Manipulate(act, input_data, response);
    },
    DeviceManager: function(act, input_data, response) {
        device_manager.Manipulate(act, input_data, response);
    },
    WebSettings: function(act, input_data, response) {
        web_settings.Manipulate(act, input_data, response);
    },
    TrafficLightManager: function(act, input_data, response) {
        traffic_light_manager.Manipulate(act, input_data, response);
    }
};


/**
 * Created by hong on 2014/11/11.
 */
var priority_operate = require('./priority_operate');
var priority_strategy = require('./priority_strategy');
var trigger_point = require('./trigger_point');
var travel_time = require('./travel_time');


module.exports = {
    Initialize : function(ms_connector, sql_generator) {
    },
    Manipulate : function(purpose, input_data, response) {
        console.log("history-- purpose: ", purpose, " input data: ", input_data);
        switch(purpose) {
            case 'priority_operate':
                priority_operate.Select(input_data, response);
                break;
            case 'priority_strategy':
                priority_strategy.Select(input_data, response);
                break;
            case 'trigger_point':
                trigger_point.Select(input_data, response);
                break;
            case 'travel_time':
                travel_time.Select(input_data, response);
                break;
            default:
                console.log("history purpose not defined.");
                break;
        }
    }
}
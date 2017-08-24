/**
 * Created by hong on 2014/11/7.
 */
//var history =  require('./history.js');
var priority_expression =  require('./priority_expression.js');
priority_expression.Initialize();

module.exports = {
    Update: function(input_data, status_data) {
        UpdateStatus(input_data, status_data);
    }
};

function UpdateStatus(input_data, status) {
    var direction_index = input_data.DIR;
    status.priority_strategy_live[direction_index] =
        priority_expression.LiveStrategy(status.priority_strategy_live[direction_index],
            input_data.Strategy, status.phase_step[0], input_data.stepID);
    status.priority_strategy_history[direction_index] =
        priority_expression.HistoryStartegy(status.priority_strategy_history[direction_index], status.priority_strategy_live[direction_index]);
    status.priority_strategy_count[direction_index] =
        priority_expression.HistoryStartegyCount(input_data.Strategy, status.priority_strategy_count[direction_index]);
    status.phase_step[0] = input_data.stepID;
    status.phase[0] = input_data.phaseID;

    status.countdown[0] = input_data.stepsec;
    if (input_data.BRTID != '000000000000')
        status.car_id[direction_index] = input_data.BRTID;
//    status.arrival_time_estimate[direction_index] = input_data.PAtime;
    var receive_time = "" + input_data.HOUR + ":" + input_data.MIN + ":" + input_data.SEC + "";
    var point_index = input_data.Point;
    status.receive_time_p[direction_index][point_index] = receive_time;
    // receive_bus_p
    status.receive_bus_p[direction_index][point_index] = input_data.BRTID;

    status.priority_status_live = priority_expression.LiveStatus(input_data.Condition);
    status.receive_time = GetCurrentTime();

}

function GetCurrentTime(){
    var d = new Date();
    var output = d.getFullYear() +'-'+     Makeup(d.getMonth() + 1) +'-';
    output += Makeup(d.getDate()) +" "+    Makeup(d.getHours()) +":";
    output+=  Makeup(d.getMinutes()) +":"+ Makeup(d.getSeconds());
    return output;
    function Makeup(value) {
        var value = (value < 10 ? '0' : '') + value;
        return value;
    }
}


/**
 * Created by hong on 2014/11/6.
 */
module.exports = {
    Initialize: function() {
    },
    LiveStatus: function(input_data) {
        return LiveStatus(input_data);
    },
    LiveStrategy: function(strategy_previous, strategy_current, phase_step_previous, phase_step_current) {
        return LiveStrategy(strategy_previous, strategy_current, phase_step_previous, phase_step_current);
    },
    HistoryStartegy: function(history_data, current_data) {
        return HistoryStartegy(history_data, current_data);
    },
    HistoryStartegyCount: function(strategy_data, count_data) {
        return HistoryStartegyCount(strategy_data, count_data);
    }
}

function LiveStatus(input_data) {
    var priority_status;
    if (typeof input_data === "undefined") priority_status = "undefined";
    switch (input_data) {
        case 0:
            priority_status = "手動關機";
            break;
        case 1:
            priority_status = "定時關機";
            break;
        case 2:
            priority_status = "手動號誌優先控制執行中";
            break;
        case 3:
            priority_status = "定時號誌優先控制執行中";
            break;
        case 4:
            priority_status = "手動待機";
            break;
        case 5:
            priority_status = "定時待機";
            break;
        default :
            priority_status = "not found";
    }
    return priority_status;
}
//Condition：號誌優先控制執行狀態，整數(0~5)。
//0：手動關機
//1：定時關機
//2：手動號誌優先控制執行中
//3：定時號誌優先控制執行中
//4：手動待機
//5：定時待機
function LiveStrategy(strategy_previous, strategy_current, phase_step_previous, phase_step_current) {
    if (strategy_current == 0 && phase_step_previous == phase_step_current)
        return strategy_previous;
    var priority_strategy;
    switch (strategy_current) {
        case 0:
            priority_strategy = "--------";
            break;
        case 1:
            priority_strategy = "綠燈延長";
            break;
        case 2:
            priority_strategy = "紅燈切斷";
            break;
        default :
            priority_strategy = "not found";
    }
    return priority_strategy;

}
function HistoryStartegy(history_data, current_data) {
    if (current_data == "綠燈延長" || current_data == "紅燈切斷") return current_data;
    return history_data;
}
function HistoryStartegyCount(strategy_data, count_data) {
    if (strategy_data == 1 || strategy_data == 2) return count_data + 1;
    return count_data;
}
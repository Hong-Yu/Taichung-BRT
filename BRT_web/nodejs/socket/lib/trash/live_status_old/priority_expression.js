/**
 * Created by hong on 2014/11/6.
 */
module.exports = {
    Initialize: function() {
    },
    LiveStatus: function(input_data) {
        return LiveStatus(input_data);
    },
    LiveStrategy: function(input_data) {
        return LiveStrategy(input_data);
    },
    HistoryStartegy: function(input_data) {
        return HistoryStartegy(input_data);
    },
    HistoryStartegyCount: function(input_data) {
        return HistoryStartegyCount(input_data);
    }
}

function LiveStatus(input_data) {
    var priority_status;
    if (typeof input_data === "undefined") priority_status = "undefined";
    switch (input_data) {
        case 0:
            priority_status = "手動關閉";
            break;
        case 1:
            priority_status = "定時關閉";
            break;
        case 2:
            priority_status = "手動開啟";
            break;
        case 3:
            priority_status = "定時開啟";
            break;
        default :
            priority_status = "not found";
    }
    return priority_status;
}
function LiveStrategy(input_data) {
    return 0;
}
function HistoryStartegy(input_data) {
    return 0;
}
function HistoryStartegyCount(input_data) {
    return 0;
}
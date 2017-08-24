/**
 * Created by hong on 2014/11/24.
 */
var live_status = require('./live_status.js');

module.exports = {
    LiveStatus: function(input_data) {
        return live_status.Validate(input_data);
    }
};




/**
 * Created by hong on 2014/12/30.
 */
var traffic_light_read = require('./traffic_light_read');
var traffic_light_update = require('./traffic_light_update');

module.exports = {
    Initialize : function(ms_connector, sql_generator) {
    },
    Manipulate : function(act, input_data, response) {
        console.log("web settings-- act: ", act, " input data: ", input_data);
        switch(act) {
            case 'traffic_light_read':
                traffic_light_read.Select(input_data, response);
                break;
            case 'traffic_light_update':
                traffic_light_update.Update(input_data, response);
                break;
            default:
                console.log("traffic light act not defined.");
                break;
        }
    }
};
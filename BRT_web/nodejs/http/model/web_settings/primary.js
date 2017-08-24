/**
 * Created by hong on 2014/11/11.
 */
var permission_level = require('./permission_level');
var permission_level_update = require('./permission_level_update');

module.exports = {
    Initialize : function(ms_connector, sql_generator) {
    },
    Manipulate : function(act, input_data, response) {
        console.log("web settings-- act: ", act, " input data: ", input_data);
        switch(act) {
            case 'permission_level_read':
                permission_level.Select(input_data, response);
                break;
            case 'permission_level_default':
                permission_level.DefaultValue(input_data, response);
                break;
            case 'permission_level_update':
                permission_level_update.Update(input_data, response);
                break;
            case 'travel_time':
//                travel_time.Select(input_data, response);
                break;
            default:
                console.log("web settings act not defined.");
                break;
        }
    }
};
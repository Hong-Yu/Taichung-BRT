/**
 * Created by hong on 2014/12/18.
 */
var sign_in_check = require('./sign_in_check');

module.exports = {
    Initialize : function(ms_connector, sql_generator) {
    },
    Manipulate : function(act, input_data, response) {
        console.log("web settings-- act: ", act, " input data: ", input_data);
        switch(act) {
            case 'sign_in':
                sign_in_check.Check(input_data, response);
                break;
            default:
                console.log("account authenticated act not defined.");
                break;
        }
    }
};
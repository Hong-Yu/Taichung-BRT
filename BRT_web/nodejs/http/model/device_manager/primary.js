/**
 * Created by hong on 2014/12/6.
 */
var intersection_create = require('./intersection_create');
var intersection_delete = require('./intersection_delete');
var device_create = require('./device_create');
var device_delete = require('./device_delete');
var devices_read = require('./devices_read');


module.exports = {
    Initialize : function(ms_connector, sql_generator) {
    },
    Manipulate : function(purpose, input_data, response) {
        console.log("device manager-- purpose: ", purpose, " input data: ", input_data);
        switch(purpose) {
            case 'intersection_create':
                intersection_create.Do(input_data, response);
                break;
            case 'intersection_delete':
                intersection_delete.Do(input_data, response);
                break;
            case 'device_create':
                device_create.Do(input_data, response);
                break;
            case 'device_delete':
                device_delete.Do(input_data, response);
                break;
            case 'devices_read':
                devices_read.Do(input_data, response);
                break;
            default:
                console.log("device manager purpose not defined.");
                break;
        }
    }
}
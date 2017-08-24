/**
 * Created by hong on 2014/11/23.
 */
module.exports = {
    Update: function(input_data, status_data) {
        if (!Validation(input_data.Contents)) return;
        Update(input_data.Contents, status_data);
    }
};

function Validation(input_data) {
    var is_valid = true;
    if (typeof input_data.CarNo === 'undefined') is_valid = false;
    if (typeof input_data.LocX === 'undefined') is_valid = false;
    if (typeof input_data.LocY === 'undefined') is_valid = false;
    if (typeof input_data.EstToStaTime === 'undefined') is_valid = false;
    if (input_data.DIR != '1' && input_data.DIR != '2') is_valid = false;
    if (is_valid) {
        input_data.latitude = input_data.LocY;
        input_data.longitude = input_data.LocX;
        input_data.direction = parseInt(input_data.DIR) - 1;
        console.log('successful checking bus arrival data.');
    } else {
        console.log('failed checking bus arrival data.');
    }
    return is_valid;
}

function Update(input_data, status_data) {
    var distance = null;
    var distance_min = 32767;
    var intersection_index;
    for (var section_index = 0; section_index < status_data.length; ++section_index) {
        distance = 0;
        distance += Math.abs(input_data.latitude - status_data[section_index].latitude);
        distance += Math.abs(input_data.longitude - status_data[section_index].longitude);
        if (distance < distance_min) {
            distance_min = distance;
            intersection_index = section_index;
        }
//        console.log('lat input:', input_data.latitude, 'lat status:', status_data[section_index].latitude, 'distance: ', distance);
    }
//    console.log('The nearest intersection is: ', intersection_index, 'length: ', status_data.length);
    var direction_index = input_data.direction;
//    console.log('The nearest intersection is: ', status_data[intersection_index].name);
    status_data[intersection_index].bus_arrival_number[direction_index] = input_data.CarNo;
    status_data[intersection_index].bus_arrival_time[direction_index] = input_data.EstToStaTime;
}


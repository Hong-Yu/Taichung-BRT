/**
 * Created by hong on 2014/12/6.
 */
var http_service = {
    'set_map_draw': function (map_draw) {
        this.map_draw = map_draw;
    },
    'IntersectionCreate': function (request_data) {
        IntersectionCreate(request_data);
    },
    'IntersectionDelete': function (request_data) {
        IntersectionDelete(request_data);
    },
    'DeviceCreate': function (request_data) {
        DeviceCreate(request_data);
    },
    'DeviceDelete': function (request_data) {
        DeviceDelete(request_data);
    },
    'DevicesRead': function () {
//        IntersectionDelete(request_data);
        DevicesRead(this.map_draw);
    }
};

function IntersectionCreate(request_data) {
    $.post( "http://192.168.1.2:8888/device-manager?act=intersection_create", request_data )
        .done(function( data ) {
            var input_data = JSON.parse(data);
            if(!input_data.successful)
                confirm(JSON.stringify(input_data.data));
            http_service.DevicesRead();
        });
}

function IntersectionDelete(request_data) {
    $.post( "http://192.168.1.2:8888/device-manager?act=intersection_delete", request_data )
        .done(function( data ) {
            var input_data = JSON.parse(data);
            if(!input_data.successful)
                confirm(JSON.stringify(input_data.data));
            http_service.DevicesRead();
        });
}

function DeviceCreate(request_data) {
    $.post( "http://192.168.1.2:8888/device-manager?act=device_create", request_data )
        .done(function( data ) {
            var input_data = JSON.parse(data);
            if(!input_data.successful)
                confirm(JSON.stringify(input_data.data));
            http_service.DevicesRead();
        });
}

function DeviceDelete(request_data) {
    $.post( "http://192.168.1.2:8888/device-manager?act=device_delete", request_data )
        .done(function( data ) {
            var input_data = JSON.parse(data);
            console.log(input_data);
            if(!input_data.successful)
                confirm(JSON.stringify(input_data.data));
            http_service.DevicesRead();
        });
}

function DevicesRead(map_draw) {
    $.post( "http://192.168.1.2:8888/device-manager?act=devices_read", {} )
        .done(function( data ) {
            var input_data = JSON.parse(data);
            console.log(input_data);
            if(input_data.successful)
                Success(map_draw, input_data.data);
            else
                Error();
        });
    function Error() {

    }
    function Success(map_draw, input_data) {
        map_draw.IconInfo(input_data);

    }
}
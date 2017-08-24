/**
 * Created by hong on 2014/10/21.
 */
module.exports = {
    IsConnect: function(web_socket) {
        return IsConnect(web_socket);
    }

};

function IsConnect(web_socket) {
    var state = web_socket.readyState;
    switch(state) {
        case 0:
            console.log('the web socket connection has not yet been established.');
            return false;
            break;
        case 1:
            console.log('the web socket connection is established and communication is possible.');
            return true;
            break;
        case 2:
            console.log('the web socket connection is going through the closing handshake.');
            return false;
            break;
        case 3:
            console.log('the web socket connection has been closed or could not be opened.');
            return false;
            break;
        default :
            console.log('the web socket state is not defined.');
            return false;
    }

}

//The readonly attribute readyState represents the state of the connection. It can have the following values:
//
//    A value of 0 indicates that the connection has not yet been established.
//
//    A value of 1 indicates that the connection is established and communication is possible.
//
//    A value of 2 indicates that the connection is going through the closing handshake.
//
//    A value of 3 indicates that the connection has been closed or could not be opened.
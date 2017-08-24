/**
 * Created by hong on 2014/9/24.
 */
function Cookie() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
    }
    this.Read = Read;
    function Read() {
        var message = new Object();
        message.username = GetCoolie('username');
        message.password = GetCoolie('password');
        return message;

    }
    this.Write = Write;
    function Write(label, username) {
        SetCoolie(label, username, 365*24);
//        var cookie = GetCoolie('taichung_brt');
    }
// Private member ----------------------------------------------------------
    function SetCoolie(cname, cvalue, exminute) {
//        console.log('set cookie');
        var date = new Date();
        date.setTime(date.getTime() + (exminute*60*60*1000));
        var expires = 'expires='+ date.toUTCString();
        document.cookie = cname + '=' + cvalue + '; ' + expires;
    }
    function GetCoolie(cname) {
//        console.log(document.cookie);
        var cookie_array = document.cookie.split(';');
        for (var index = 0; index < cookie_array.length; index++) {
            var specified_cookie = cookie_array[index];
            // remove space character at string head.
            while (specified_cookie.charAt(0) == ' ') specified_cookie = specified_cookie.substring(1);
            var label = specified_cookie.split('=')[0];
            if (label == cname) return specified_cookie.split('=')[1];
        }
        return '';
    }
}

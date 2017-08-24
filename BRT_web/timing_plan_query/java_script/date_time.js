/*
 * TimeCreate Object
 */
var TimeCreate = {
    get_date_time: function() {
        var getdate = GetDate();
        var gettime = GetTime();
        var str_datetime = getdate+" "+gettime;
        return str_datetime;
    }
};

function GetDate() {
    var str_date = "";
    var d = new Date();
    var y = d.getFullYear().toString();
    var m = (d.getMonth() + 1).toString();
    var date = d.getDate().toString();
    var z = "0";
    if (m.length == 1) {
        var c = m;
        m = z.concat(c);
    }
    if (date.length == 1) {
        var c = date;
        date = z.concat(c);
    }
    str_date = y + "-" + m + "-" + date;
    return str_date;
}

function GetTime() {
    var str_time = "";
    var d = new Date();
    var h = d.getHours().toString();
    var min = d.getMinutes().toString();
    var s = d.getSeconds().toString();
    var z = "0";
    if (h.length == 1) {
        var c = h;
        h = z.concat(c);
    }
    if (min.length == 1) {
        var c = min;
        min = z.concat(c);
    }
    if (s.length == 1) {
        var c = s;
        s = z.concat(c);
    }
    str_time = h + ":" + min + ":" + s;
    return str_time;
}
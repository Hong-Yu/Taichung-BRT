/**
 * Created by hong on 2014/3/2.
 */

function DateManager() {
    // Public member ----------------------------------------------------------
    this.ConjunctDay = ConjunctDay;
    function ConjunctDay(day_i, day_f) {
        var day_set = [];
        var day_current = day_i;
        day_set[0] = day_current;
        var day_index = 0;
        while (day_current != day_f) {
            day_current = this.NextDate(day_current);
            day_set[++day_index] = day_current;
        }
//        console.log("day set ", day_set);
        return day_set;
    }
    // Private member ----------------------------------------------------------
    this.NextDate = NextDate;
    function NextDate(date) {
        var date_split = date.split("-");
        var year = parseInt(date_split[0]);
        var month = parseInt(date_split[1]);
        var day = parseInt(date_split[2]);
        var day_max = this.DaysMonth(year, month);
        day += 1;
        if (day > day_max) {
            month += 1;
            day = 1;
        }
        if (month > 12) {
            year += 1;
            month = 1;
        }
        return Zerofill(year) + "-" + Zerofill(month) + "-" + Zerofill(day);
    }
    this.DaysMonth = DaysMonth;
    function DaysMonth(year, month) {
        var amount = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (this.IsLeap(year)) amount[2] = 29;
        return amount[month];
    }
    this.IsLeap = IsLeap;
    function IsLeap(year) {
        var isLeap = false;
        if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {
            isLeap = true;
        }
        return isLeap;
    }
    function Zerofill(number) {
        var zerofill = (number < 10 ? "0" : "") + number;
        return zerofill;
    }
}

/**
 * Created by Jia on 2014/10/31.
 * Intersection obj and schedule obj.
 */
    var Intersectioons ={};

var IntersectionsMethod = {
    Setter: function(data){
        Intersectioons.result = data;
    },
    SetWs: function(ws){
        Intersectioons.websocket = ws;
    },
    Getter: function(){
        return Intersectioons;
    }
};

    var Schedule ={};

var ScheduleMethod = {
    Setter: function(data){
        Schedule.result = data;
    },
    SetWs: function(ws){
        Schedule.websocket = ws;
    },
    Getter: function(){
        return Schedule;
    },
    GetByName: function(querry_name){
        var querry_return={};
        var schedule = Schedule.result;
        for (var i = 0; i < schedule.length; i++) {
            if(schedule[i].scheduling_name == querry_name){
                querry_return = schedule[i];
            }
        }
        return querry_return;
    }
};
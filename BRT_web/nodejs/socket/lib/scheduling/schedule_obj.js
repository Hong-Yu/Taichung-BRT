/**
 * Created by Jia on 2014/11/4.
 */
var ScheduleObj = {
    schedules:[], //schedule currently running and its content
    schedules_state:[], //schedule running state
    new_schedule: function(scheduling_name, result){
        push_new_schedule(scheduling_name, result);
    },
    get_schedule: function(){
		return ScheduleObj.schedules;
	},
    delete_schedule: function(name){
        remove_schedule(name);
    }
};

function push_new_schedule(name, result){
    var sbj = {};
    sbj.scheduling_name = name;
    sbj.result = result;
    ScheduleObj.schedules.push(sbj);
}

function remove_schedule(name){
    // console.log(ScheduleObj.schedules);
    ScheduleObj.schedules.forEach(function(s, i, arr_s){
        if(s.scheduling_name === name){
            arr_s.splice(i, 1);
        }else{
        }
    });
    // console.log(ScheduleObj.schedules);
}

module.exports = ScheduleObj;
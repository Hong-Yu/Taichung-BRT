/**
 * Created by Jia on 2014/10/31.
 * Show running schedules.
 */
function Schedules() {
    this.show_sched = show_sched;
    function show_sched(inputdata){
        running_sched(inputdata);
    }

    function running_sched(inputdata){
        $(function(){
        var domain_html = $('div#running');
        if(inputdata.length ===0){
        }else{
            domain_html.empty();
        var button_dir;
        for (var i =0; i< inputdata.length; ++i) {
            var current = inputdata[i];
            button_dir = document.createElement('button');
            button_dir.innerHTML = current.scheduling_name;
            button_dir.setAttribute('onclick','PageControl.Manage("'+current.scheduling_name+'");');
            button_dir.setAttribute('class','btn btn-danger btncss');
            domain_html.append(button_dir);
        }
        }
        });
    }
}
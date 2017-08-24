/**
 * Created by CCT on 2014/6/3.
 */
function PhaseModifyMain() {
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    $.get("phase_modify/sub_page/main.html", function(data) {
        domain_main.prepend(data);
        PrimaryDataProcess();
    });
    function PrimaryDataProcess() {
        var phase_list = new PhaseList();
        phase_list.Listing();
    }
}
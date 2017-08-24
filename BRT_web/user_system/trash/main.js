/**
 * Created by hong on 2014/5/13.
 */
function UserSystemMain() {
//    var login_button=$('<div  class="btn btn-danger login_button"  style="width:40px;height:20px;position:fixed;z-index:100;margin-left:10px;bottom:20px;left:0px;">登入</div>');
//    login_button.appendTo($('body'));
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
//    domain_main=$('#centerview').empty().css('background-color','transparent');

    $.get("user_system/sub_page/modal_login.html", function(data) {
        domain_main.prepend(data);
        PrimaryDataProcess();
    });

    function PrimaryDataProcess() {
        console.log("user system on.");


        // bind login event
        var login_system = new LoginSystem();
        login_system.Initialize();
        login_system.Authentication('cookie');

    }
}


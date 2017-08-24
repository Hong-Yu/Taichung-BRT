/**
 * Created by hong on 2014/5/13.
 */
function LoginSystem() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        var domain_sign_out = $("div.user_name button");
        domain_sign_out.bind("click", ClickSignOut);
    }
    this.Authentication = Authentication;
    function Authentication(type) {
        switch (type) {
            case 'cookie':
                return AuthenticationCookie();
                break;
            case 'ui':
                break;
        }
    }

    // Private member ----------------------------------------------------------
    function AuthenticationUI() {
        console.log('long in modal show');
        $('#user_login').modal({
            keyboard: false,
            backdrop:'static', show: true
        })
        LoginConfirm();
    }
    function LoginConfirm() {
        var domain = $("#user_login");
        var domain_login = $("button.login");
        domain_login.bind("click", ClickLogin);
//        ClickLogin();
        function ClickLogin() {

            var post_data = new Object;
            post_data.email = domain.find("input[type=email]").val();
            post_data.password = domain.find("input[type=password]").val();
            $.post( "http://192.168.1.2:8888/user-authentication", post_data )
                .done(function( data ) {
                    console.log(data);
                    if(data.isAuthenticated)
                        Success(data.account.level);
                    else
                        Error();
                });
            function Error() {
                domain.find("div.authenticated_error").show();
            }
            function Success(level) {
                domain.modal('hide');
                $("div.user_name span").text(post_data.email);

                $.get("user_system/sub_page/managed_function.html",function(data){
                    $('div.dashboard').append(data);
                    if(level == 10)
                        $("div.account_manager").show();
                });
                // write to cookie
                var cookie = new Cookie();
                cookie.Write('username', post_data.email);
                cookie.Write('password', post_data.password);
                // display sign out button
                $('div.user_name button').css('display', '');
            }

        }

    }

    function AuthenticationCookie() {
        // 1. Reading information from cookie folder.
        var cookie = new Cookie();
        var cookie_message = cookie.Read();
        console.log('user name: ', cookie_message);
        // post data to http server.
        var post_data = new Object;
        post_data.email = cookie_message.username;
        post_data.password = cookie_message.password;
        $.post( "http://192.168.1.2:8888/user-authentication", post_data )
            .done(function( data ) {
                console.log(data);
                if(data.isAuthenticated)
                    Success(data.account.level);
                else
                    Error();
            });
        function Error() {
            $("div.user_name span").text('---');
            AuthenticationUI();
        }
        function Success(level) {
            $("div.user_name span").text(post_data.email);
            $('div.user_name button').css("display", "");

            $.get("user_system/sub_page/managed_function.html",function(data){
                $('div.dashboard').append(data);
                if(level == 10)
                    $("div.account_manager").show();
            });
            // write to cookie
            console.log($('button.sign_out'));


        }

    }

    // sign out ---------------------------------------------------------------
    function ClickSignOut( ) {
        $("div.user_name span").text('---');
        $('div.user_name button').css("display", "none");
        $("#user_login").find("input[type=password]").val('');

        var cookie = new Cookie();
        cookie.Write('username', '');
        cookie.Write('password', '');
        window.location.reload();
        AuthenticationUI();

    }

}

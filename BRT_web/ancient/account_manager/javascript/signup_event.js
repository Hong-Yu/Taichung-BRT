/**
 * Created by CCT on 2014/5/14.
 */
function SignupEvent() {
   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize() {
      this.SignupPage();
   }
   // Private member ---------------------------------------------------------
   this.SignupPage = SignupPage;
   function SignupPage() {
      $("button.sign_up").bind("click", Redirect);
      function Redirect() {
         $('div.account_main').hide();
         var domain_main = $('#centerview');
         $.get("account_manager/sub_page/signup.html", function(data) {
            domain_main.prepend(data);
            Administrator();
            Confirm();
         });
      }
   }
   function Administrator() {
      var domain = $("div.administrator");
      var domain_button = domain.find("button");
      domain.find("li").bind("click", Switch);
      function Switch(event) {
         var target = event.currentTarget;
         var domain_link = $(target).find("a");
         var level = parseInt($(target).attr("level"));
         switch(level) {
            case 10:
               console.log("case 10");
               domain_link.text(domain_button.text());
               $(target).attr("level", domain_button.attr("level"));
               domain_button.html("系統管理員 <span class='caret'></span>");
               domain_button.attr("level", level);
               break;
            case 1:
               console.log("case 1");
               domain_link.text(domain_button.text());
               $(target).attr("level", domain_button.attr("level"));
               domain_button.html("一般使用者 <span class='caret'></span>");
               domain_button.attr("level", level);
               break;
         }
      }
   }
   function Confirm() {
      var domain = $("div.sign_up");
      var domain_signup = domain.find("button.confirm");
      domain_signup.bind("click", ClickSignUp);
      function ClickSignUp() {
         var post_data = new Object;
         post_data.email = domain.find("input[type=email]").val();
         post_data.password = domain.find("input[type=password]").val();
         post_data.level = $("div.administrator").find("button").attr("level");
         $.post( "http://192.168.1.2:8888/sign_up", post_data )
            .done(function( data ) {
               console.log(data);
               if(data.successful)
                  Success();
               else
                  Error();
            });
      }
      function Error() {
         domain.find("div.authenticated_error").show();
      }
      function Success() {
         $('div.sign_up').remove();
         $('div.account_main').show();
         var account_list = new AccountList();
         account_list.Reload();


      }
   }

}
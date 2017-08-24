/**
 * Created by CCT on 2014/5/14.
 */
function AccountManagerMain() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   $.get("account_manager/sub_page/main.html", function(data) {
      domain_main.prepend(data);
      PrimaryDataProcess();
   });
   function PrimaryDataProcess() {
      var account_list = new AccountList();
      account_list.Listing();
      var signup_event = new SignupEvent();
      signup_event.Initialize();
   }
}

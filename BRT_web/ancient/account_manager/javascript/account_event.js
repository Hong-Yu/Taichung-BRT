/**
 * Created by CCT on 2014/5/14.
 */
var AccountEvent = {
   // Public member ----------------------------------------------------------
//   this.Delete = Delete;
   Delete: function(target) {
      console.log(target);

      DeleteRequesting(target);

   }
   // Private member ---------------------------------------------------------
//   this.DeleteRequesting = DeleteRequesting;
//   function DeleteRequesting(event) {
//      var target = event.currentTarget();
//      var email = $(target).parent().find("td.email").text();
//      console.log(email);
//
//   }

}

function DeleteRequesting(target) {
   var email = $(target).parent().parent().find("td.email").text();
   console.log(email);
   var message = "您確定要刪除帳號 :" + email + "";
   if (confirm(message) == true) {
      console.log("yes");
      Requesting(email);

   } else {
      console.log("no");

   }
   function Requesting(email) {
      var post_data = new Object;
      post_data.requesting = "please give me the account list";
      post_data.email = email;
      $.post( "http://192.168.1.2:8888/account?type=delete", post_data )
         .done(function( data ) {
            console.log(data);
            if(data.successful)
               Success();
            else
               Error();
         });
      function Error() {
         console.log("account delete error");
//         domain.find("div.authenticated_error").show();
      }
      function Success() {
         console.log("account delete success");
         $('div.sign_up').remove();
         $('div.account_main').show();
         var account_list = new AccountList();
         account_list.Reload();

      }
   }

}




/**
 * Created by CCT on 2014/5/14.
 */
function AccountList() {
   // Public member ----------------------------------------------------------
   this.Listing = Listing;
   function Listing() {
      this.Requesting();
   }
   this.Reload = Reload;
   function Reload() {
      $("tbody.account_list").empty();
      this.Requesting();
   }
   // Private member ---------------------------------------------------------
   this.Requesting = Requesting;
   function Requesting() {
      var post_data = new Object;
      post_data.requesting = "please give me the account list";
      $.post( "http://192.168.1.2:8888/account?type=list", post_data )
         .done(function( data ) {
            console.log(data);
            if(data.successful)
               Success(data.accounts);
            else
               Error();
         });
      function Error() {
         console.log("account list error");
//         domain.find("div.authenticated_error").show();
      }
      function Success(accounts) {
         console.log("account list success");
         var current_account;
         for (var account_index = 0; account_index < accounts.length; ++account_index) {
            current_account = accounts[account_index];
            AppendInfo(account_index + 1, current_account.email, current_account.level);
         }
      }
   }
   function AppendInfo(index, email, level) {
      var domain = $("tbody.account_list");
      var str_html="";
      str_html += "<tr>";
      str_html += "<th style=\"text-align:right;\">" + index + "<\/th>";
      str_html += '<td class="email">' + email + "<\/td>";
      str_html += "<td>" + LevelToString(level) + "<\/td>";
      str_html += "<td style=\"text-align:center;\">";
      str_html += '<span class=\"btn btn-default btn-sm\" onclick="AccountEvent.Delete(this);">修改<\/span>';
      str_html += '<span class=\"btn btn-danger btn-sm\" onclick="AccountEvent.Delete(this);">刪除<\/span>';
      str_html += "<\/td>";
      str_html += "<\/tr>";
      domain.append(str_html);
   }
   function LevelToString(level) {
      var string = '';
      switch(level) {
         case 1:
            string = "一般使用者";
            break;
         case 10:
            string = "系統管理員";
            break;
      }
      return string;
   }

}

/**
 * Created by hong on 2014/4/17.
 * Modified by Jia on 2014/7/20.
 * Listen Tab on change.
 */

function EventManager() {
this.Initial = Initial;
function Initial(){
}
this.set_web_socket = set_web_socket;
function set_web_socket(ws) {
   this.web_socket = ws;
}
this.listenTab = listenTab;
function listenTab(){
   nav_change();
}

   function nav_change(){
      var nav_0 = $('#dir0');
      var nav_1 = $('#dir1');
      var check = $('#check');
      var domain_bus =$('div.divmap');
      nav_1.click(function(){
         nav_0.removeAttr('class');
         nav_1.attr('class', 'active');
         check.attr('mark', '1');
         domain_bus.empty();
      });
      nav_0.click(function(){
         nav_1.removeAttr('class');
         nav_0.attr('class', 'active');
         check.attr('mark', '0');
         domain_bus.empty();
      });
   }
}
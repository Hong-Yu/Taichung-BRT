/**
 * Created by CCT on 2014/3/27.
 */
var sub_page_live_status = function() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   var str_html = "<iframe src='live_status.html' width='850' height='1500' scrolling='no'></iframe>"
   domain_main.append(str_html);
   $('.bottomInfo').empty();
   $('ul.nav').empty()
      .append('<li class="active"><a href="#">BRT即時狀態</a></li>')
      .append('<li class="active"><a href="#">即時狀態</a></li>');
};

var sub_page_live_status_sketch = function() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   var str_html = "<iframe src='live_status_sketch.html' width='850' height='1500' scrolling='yes'></iframe>"
   domain_main.append(str_html);
   $('.bottomInfo').empty();
   $('ul.nav').empty()
      .append('<li class="active"><a href="#">BRT即時狀態</a></li>')
      .append('<li class="active"><a href="#">即時狀態-簡圖</a></li>');
};

var sub_page_device_status_map = function() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   var str_html = "<div class='row-fluid'><iframe src='device_status.html' width='850' height='1000' scrolling='no'></iframe></div>"
   domain_main.append(str_html);
   $('.bottomInfo').empty();
   $('ul.nav').empty()
      .append('<li class="active"><a href="#">設備連線狀態</a></li>')
      .append('<li class="active"><a href="#">連線狀態-地圖</a></li>');
};

var sub_page_device_status_table = function() {
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    var str_html = "<div class='row-fluid'><iframe src='device_status_table.html' width='850' height='1000' scrolling='yes'></iframe></div>"
    domain_main.append(str_html);
    $('.bottomInfo').empty();
    $('ul.nav').empty()
        .append('<li class="active"><a href="#">設備連線狀態</a></li>')
        .append('<li class="active"><a href="#">連線狀態-列表</a></li>');
};


var sub_page_time_plan_special = function() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   var str_html = "<iframe style='-ms-zoom:0.75' src='time_plan.html' width='850' height='2500' scrolling='no'></iframe>"
   domain_main.append(str_html);
   $('ul.nav').empty()
      .append('<li class="active"><a href="#">號誌時制規劃</a></li>')
      .append('<li class="active"><a href="#">時制計畫設定</a></li>');
};

var sub_page_device_control = function() {
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    var str_html = "<iframe src='device_control.html' width='850' height='1000' scrolling='no'></iframe>"
    domain_main.append(str_html);
    $('.bottomInfo').empty();
    $('ul.nav').empty()
        .append('<li class="active"><a href="#">號誌時制規劃</a></li>')
        .append('<li class="active"><a href="#">設備訊息設定</a></li>');
};

var sub_page_phase_modify = function() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   var str_html = "<iframe src='phase_modify.html' width='850' height='1500' scrolling='auto'></iframe>"
   domain_main.append(str_html);
   $('.bottomInfo').empty();
   $('ul.nav').empty()
      .append('<li class="active"><a href="#">號誌時制規劃</a></li>')
      .append('<li class="active"><a href="#">時相內容修改</a></li>');
};

var sub_page_accident = function() {
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    var str_html = "<iframe src='accident.html' width='850' height='1000' scrolling='no'></iframe>"
    domain_main.append(str_html);
    $('.bottomInfo').empty();
    $('ul.nav').empty()
        .append('<li class="active"><a href="#">首頁</a></li>')
        .append('<li class="active"><a href="#">事故顯示與建立</a></li>');
};

var sub_page_route_manager = function() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   var str_html = "<iframe src='route_manager.html' width='850' height='1000' scrolling='yes'></iframe>"
   domain_main.append(str_html);
   $('.bottomInfo').empty();
   $('ul.nav').empty()
      .append('<li class="active"><a href="#">首頁</a></li>')
      .append('<li class="active"><a href="#">路線管理</a></li>');
};

var sub_page_web_settings = function() {
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    var str_html = "<iframe src='web_settings.html' width='850' height='1000' scrolling='yes'></iframe>"
    domain_main.append(str_html);
    $('.bottomInfo').empty();
    $('ul.nav').empty()
        .append('<li class="active"><a href="#">首頁</a></li>')
        .append('<li class="active"><a href="#">路線管理</a></li>');
};



var sub_page_brt_performance = function() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   var str_html = "<div class='row-fluid'><iframe src='brt_performance.html' width='850' height='1000' scrolling='no'></iframe></div>"
   domain_main.append(str_html);
   $('.bottomInfo').empty();
   $('ul.nav').empty()
      .append('<li class="active"><a href="#">首頁</a></li>')
      .append('<li class="active"><a href="#">BRT績效</a></li>');
};

var sub_page_device_manager = function() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   var str_html = "<div class='row-fluid'><iframe src='device_manager.html' width='850' height='1000' scrolling='no'></iframe></div>"
   domain_main.append(str_html);
   $('.bottomInfo').empty();
   $('ul.nav').empty()
      .append('<li class="active"><a href="#">首頁</a></li>')
      .append('<li class="active"><a href="#">路口設備管理</a></li>');
};

var sub_page_account_manager = function() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   var str_html = "<div class='row-fluid'><iframe src='account_manager.html' width='850' height='1000' scrolling='no'></iframe></div>"
   domain_main.append(str_html);
   $('.bottomInfo').empty();
   $('ul.nav').empty()
      .append('<li class="active"><a href="#">系統管理員</a></li>')
      .append('<li class="active"><a href="#">帳號管理</a></li>');
};

var sub_page_history = function() {
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    var str_html = "<div class='row-fluid'><iframe src='history.html' width='850' height='1000' scrolling='yes'></iframe></div>"
    domain_main.append(str_html);
    $('.bottomInfo').empty();
    $('ul.nav').empty()
        .append('<li class="active"><a href="#">首頁</a></li>')
        .append('<li class="active"><a href="#">歷史紀錄</a></li>');
};
var sub_page_phase_lighting = function() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   var str_html = "<iframe src='phase_lighting.html' width='850' height='2000' scrolling='auto'></iframe>"
   domain_main.append(str_html);
   $('.bottomInfo').empty();
   $('ul.nav').empty()
      .append('<li class="active"><a href="#">號誌時制規劃</a></li>')
      .append('<li class="active"><a href="#">時相步階設定</a></li>');
};
var sub_page_time_space_diagram = function() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   var str_html = "<iframe src='time_space_diagram.html' width='850' height='1500' scrolling='yes'></iframe>"
   domain_main.append(str_html);
   $('.bottomInfo').empty();
   $('ul.nav').empty()
      .append('<li class="active"><a href="#">BRT即時狀態</a></li>')
      .append('<li class="active"><a href="#">時空圖</a></li>');
};
var sub_page_info = function() {
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    var str_html = "<iframe src='intersection_info.html' width='850' height='1500' scrolling='no'></iframe>"
    domain_main.append(str_html);
    $('.bottomInfo').empty();
    $('ul.nav').empty()
        .append('<li class="active"><a href="#">首頁</a></li>')
        .append('<li class="active"><a href="#">路口資訊</a></li>');
};

var sub_page_scheduling = function() {
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    var str_html = "<iframe src='scheduling.html' width='850' height='600' scrolling='auto'></iframe>";
    domain_main.append(str_html);
    $('.bottomInfo').empty();
    $('ul.nav').empty()
        .append('<li class="active"><a href="#">首頁</a></li>')
        .append('<li class="active"><a href="#">路口排程</a></li>');
};
var sub_page_time_plan_query = function(){
    // var domain_main;
    // domain_main=$('#centerview').empty().css('background-color','transparent');
    var str_html = "<iframe style='-ms-zoom:0.75' src='time_plan_query.html' width='850' height='2500' scrolling='no'></iframe>";
    // domain_main.append(str_html);
    // $('ul.nav').empty()
    //    .append('<li class="active"><a href="#">時制規劃</a></li>')
    //    .append('<li class="active"><a href="#">查詢路口時制計畫</a></li>');
    window.open("time_plan_query.html");
};

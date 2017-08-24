var _CarCount = [];
function toEtaTw(eta) {
   etaString = "";
   if (eta == '255') {
      etaString = "未發車";
   } else if (eta == '254') {
      etaString = "末班車<br />已過";
   } else if (eta == '253') {
      etaString = "暫不停靠";
   } else if (eta == '252') {
      etaString = "今日未營運";
   } else if (eta < 3) {
      etaString = "將到站";
   } else {
      etaString = "約" + eta + "分";
   }
   return etaString;
}

function getEtaCss(eta) {
   etaCss = "eta";
   if (eta == '255') {
      etaCss = "eta_nonop";
   } else if (eta == '254') {
      etaCss = "eta_nonop";
   } else if (eta == '253') {
      etaCss = "eta_nonop";
   } else if (eta == '252') {
      etaCss = "eta_nonop";
   } else if (eta < 3) {
      etaCss = "eta_coming";
   } else {
      etaCss = "eta_onroad";
   }
   return etaCss;
}

function toEtaEn(eta) {
   etaString = "";
   if (eta == '255') {
      etaString = "Waiting";
   } else if (eta == '254') {
      etaString = "Terminated";
   } else if (eta == '253') {
      etaString = "Temp non sop";
   } else if (eta == '252') {
      etaString = "Non service today";
   } else if (eta < 3) {
      etaString = "Coming";
   } else {
      etaString = eta + " min";
   }
   return etaString;
}
function getBusCss(oBusInfo) {
   busCss = "b" + oBusInfo.fl;
   //if (oBusInfo.fl == "l") {
   //    busCss = "bl";
   //} else if (oBusInfo.fl == "f") {
   //    busCss = "bf";
   //} else {
   //    busCss = "bh";
   //}
   return busCss;
}

function getBnCss(oBusInfo) {
   bnCss = "bn" + oBusInfo.fl;
   //if (oBusInfo.fl == "l") {
   //    bnCss = "bnl";
   //} else if (oBusInfo.fl == "f") {
   //    bnCss = "bnf";
   //} else {
   //    bnCss = "bnh";
   //}
   return bnCss;
}
function displayBusTw(oBusInfo) {
   bpnId = (oBusInfo.io == "i") ? "#etai_" + oBusInfo.idx : "#etao_" + oBusInfo.idx;
   busIconId = (oBusInfo.io == "i") ? "#busi_" + oBusInfo.idx : "#buso_" + oBusInfo.idx;
   busCss = getBusCss(oBusInfo);
   bnCss = getBnCss(oBusInfo);
   if (oBusInfo.io == "i") {
      if (_CarCount[oBusInfo.idx] == 0) {
         $(bpnId).html("");
      }
      _CarCount[oBusInfo.idx] = oBusInfo[oBusInfo.idx] + 1;
   }
   $("<div class='" + bnCss + "'>" + oBusInfo.bn + "</div>").appendTo(bpnId);
   $(busIconId).html("<div class='" + busCss + "'></div>");
}

function displayBusEn(oBusInfo) {
   bpnId = "#bus_" + oBusInfo.idx;
   busmsg = oBusInfo.bn + " is ";
   if (oBusInfo.io == "i")
      busmsg = busmsg + "coming";
   else
      busmsg = busmsg + "left";
   busCss = getBusCss(oBusInfo);
   bnCss = getBnCss(oBusInfo);
   //$("<span class='" + bnCss + "'><span class='" + busCss + "'>" + busmsg + "</span></span>").appendTo(bpnId);
   $("<span class='" + busCss + "'>&nbsp;&nbsp;&nbsp;</span><span class='" + bnCss + "'>" + busmsg + "</span><br />").appendTo(bpnId);
}

function UpdateRouteInfo(url, rid, sec, lc) {
   var fnToEta = (lc == "tw") ? toEtaTw : toEtaEn;
   var fnDisplayBus = (lc == "tw") ? displayBusTw : displayBusEn;
   $.ajax({
      url: url,
      type: 'Get',
      async: false,
      cache: false,
      data: { rid: rid, sec: sec },
      dataType: 'json',
      success: function (data) {
         $(".busl").html("");
         $(".buslo").html("");
         $(".busr").html("");
         $(".busro").html("");
         $(".eta").html("");
         $(".etaol").html("");
         $(".etaor").html("");
         $(data.Etas).each(function () {
            _CarCount[this.idx] = 0;
            etaiId = "#etai_" + this.idx;
            etaString = fnToEta(this.eta);
            etaCss = getEtaCss(this.eta);
            $(etaiId).html("<span class='" + etaCss + "'>" + etaString + "</span>");
         });
         $(data.Buses).each(function () {
            fnDisplayBus(this);
         });
         var now = new Date();
         var hour = now.getHours();
         var minute = now.getMinutes();
         var sec = now.getSeconds();
         var updateAt = "更新時間：";
         if (hour < 10)
            updateAt = updateAt + "0";
         updateAt = updateAt + hour + "：";
         if (minute < 10)
            updateAt = updateAt + "0";
         updateAt = updateAt + minute + "：";
         if (sec < 10)
            updateAt = updateAt + "0";
         updateAt = updateAt + sec;

         $("#plLastUpdateTime").html(updateAt);
      }
   });
}/**
 * Created by CCT on 2014/3/17.
 */

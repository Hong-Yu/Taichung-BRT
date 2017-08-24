/**
 * Created by hong on 2014/3/16.
 */

function TransferInputDataLive() {
   // Public member ----------------------------------------------------------
   this.get_data = get_data;
   function get_data (data) {
      return this.Section(data);
   }
   // Private member ----------------------------------------------------------
   this.Section = Section;
   function Section (data) {
      console.log(data);
      var section_name = ["忠明路", "英才路", "五權路"];
      var strategy_live = [ "standard", "red_short", "green_extend"];
      var strategy_history = [ "standard", "red_short", "green_extend"];

      var section_history = GenerateHistoryData();
      var section_live = GenerateLiveData();
      function Info (title, content) {
         this.title = title;
         this.content = content;
      }
      function Strategy(live, history) {
         this.live = live;
         this.history = history;
      }
      var sections = [];
      for (var section_index = 0; section_index < 3; ++section_index) {
         var section = new Object();
         section.live = section_live[section_index];
         section.history = section_history[section_index];
         section.name = section_name[section_index];
         section.strategy = new Strategy(strategy_live[section_index], strategy_history[section_index]);
         sections[section_index] = section;
      }
      return sections;
      function GenerateLiveData() {
         var title_set = ["時相步階", "綠燈倒數", "路口狀態", "優先策略", "p1訊息", "p2訊息", "p3訊息", "p4訊息"];
         var section_unique = [];
         var content_set = ["---", "---", "定時時制", "標準", "11:00 接收", "11:00 接收", "11:01 接收", "11:00 接收"];
         section_unique[0] = SetUniqueInfo(title_set, content_set);
		 var strategy_name = "";
		 if (data.Strategy == 0) {
		  var strategy_name = "標準";
		 }
		 if (data.Strategy == 1) {
		  var strategy_name = "綠燈延長";
		 }
		 if (data.Strategy == 2) {
		  var strategy_name = "紅燈切斷";
		 }
		 var cindition_name = "";
		 if (data.Condition == 0) {
		  cindition_name = "定時時制";
		 }
		 if (data.Condition == 1) {
		  cindition_name = "優先號誌";
		 }
         var content_set = [data.stepID, data.stepsec, cindition_name, strategy_name, "18:00 接收", "18:02 接收", "18:00 接收", "18:03 接收"];
         section_unique[1] = SetUniqueInfo(title_set, content_set);
         var content_set = ["---", "---", "優先號誌", "綠燈延長", "12:05 接收", "12:05 接收", "12:05 接收", "12:05 接收"];
         section_unique[2] = SetUniqueInfo(title_set, content_set);
         return section_unique;
      }
      function GenerateHistoryData() {
         var title_set = ["快捷巴士進場時間", "預期下班到達時間", "路口狀態", "最近優先策略", "切換時間", ""];
         var section_unique = [];
         var content_set = ["11:00:15", "11:15:00", "優先號誌", "紅燈切斷", "3s", ""];
         section_unique[0] = SetUniqueInfo(title_set, content_set);
         content_set = ["11:03:00", "11:10:00", "定時時制", "綠燈延長", "5s", ""];
         section_unique[1] = SetUniqueInfo(title_set, content_set);
         content_set = ["11:05:00", "11:11:00", "手動操作", "綠燈延長", "5s", ""];
         section_unique[2] = SetUniqueInfo(title_set, content_set);
         return section_unique;
      }
      function SetUniqueInfo(title_set, content_set) {
         var info_unique = [];
         for (var index = 0; index < 8; ++index) {
            info_unique[index] = new Info(title_set[index], content_set[index]);
         }
         return info_unique.slice(0);
      }


   }


}

/**
 * Created by Jia on 2014/7/16.
 */
function setTable() {
   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize() {
   }
   this.set_web_socket = set_web_socket;
   function set_web_socket(web_socket) {
      this.web_socket = web_socket;
   }
   this.Insert = Insert;
   function Insert(phasedata) {
      set_data(phasedata);
   }
    this.setButton = setButton;
    function setButton(){
        createButton();
    }
    function createButton(){
        var buttonClass = $('.myclassbutton');
        buttonClass.empty();
        var input_data = ['btn btn-primary btn-large phaseUpload'];
        var input_text = ['更新步階至資料庫'];
        var buttondir;
        for (var data_index = 0; data_index < input_data.length; ++data_index) {
            buttondir = document.createElement('button');
            buttondir.innerHTML =input_text[data_index];
            buttondir.setAttribute("class", input_data[data_index]);
            buttondir.setAttribute("disabled", "disabled");
            buttonClass.append(buttondir);
        }
    }

   //cut phase_data
   function set_data(phasedata){
      //data for direction 1and 2
      var phasedata1 = new Array();
      for (var data_index = 0; data_index < phasedata.length; ++data_index) {
         var current_data = phasedata[data_index];
         phasedata1[data_index] = new Array();
         phasedata1[data_index] = [current_data.r1, current_data.y1, current_data.g1, current_data.g1_left, current_data.g1_dir, current_data.g1_right, current_data.pg1, current_data.pgf1, current_data.pr1,
            current_data.r2, current_data.y2, current_data.g2, current_data.g2_left, current_data.g2_dir, current_data.g2_right, current_data.pg2, current_data.pgf2, current_data.pr2];
      }
      var phasedata2 = new Array();
      for (var data_index = 0; data_index < phasedata.length; ++data_index) {
         var current_data = phasedata[data_index];
         phasedata2[data_index] = new Array();
         phasedata2[data_index] = [current_data.r3, current_data.y3, current_data.g3, current_data.g3_left, current_data.g3_dir, current_data.g3_right, current_data.pg3, current_data.pgf3, current_data.pr3,
            current_data.r4, current_data.y4, current_data.g4, current_data.g4_left, current_data.g4_dir, current_data.g4_right, current_data.pg4, current_data.pgf4, current_data.pr4];
      }
      var phasedata3 = new Array();
      for (var data_index = 0; data_index < phasedata.length; ++data_index) {
         var current_data = phasedata[data_index];
         phasedata3[data_index] = new Array();
         phasedata3[data_index] = [current_data.r5, current_data.y5, current_data.g5, current_data.g5_left, current_data.g5_dir, current_data.g5_right, current_data.pg5, current_data.pgf5, current_data.pr5,
            current_data.r6, current_data.y6, current_data.g6, current_data.g6_left, current_data.g6_dir, current_data.g6_right, current_data.pg6, current_data.pgf6, current_data.pr6];
      }

      //put data
      setTableProcess();

   function setTableProcess() {
      var str_table;
      var domain_table = $('.myclassname');
      domain_table.empty();


      for (var directin_index = 1; directin_index < 6; directin_index += 2) {
         str_table = SetDirection(directin_index);
         domain_table.append(str_table);
      }

      function SetDirection(directin_index) {
      var cols_name = ["紅", "黃", "綠", "左轉", "直行", "右轉", "行綠", "行閃", "行紅"];
      var cols_color = ['#DC143C', '#FFC131', '#6BAC2D', '#6BAC2D', '#6BAC2D', '#6BAC2D', '#6BAC2D', '#FFC131', '#DC143C'];
      var str_table="";
      str_table += "<table class=\"table table-bordered table-stripedtable-bordered\" style=\"font-size:12pt;font-weight:bold;\">";
      str_table += "<tr style=\"color:#0044CC;\">";
      str_table += "<th rowspan=\"2\" style=\"text-align:center;vertical-align: middle;width:30px\">步階<\/th>";
      str_table += "<td colspan=\"9\" style=\"text-align:center;\">Card " + directin_index + "<\/td>";
      str_table += "<td colspan=\"9\" style=\"text-align:center;\">Card " + (directin_index + 1) + "<\/td>";
      str_table += "<\/tr>";
      str_table += "<tr style=\"background:#F5FFD6;\">";
      for (var col_index = 0; col_index < cols_name.length; ++col_index) {
         str_table += "<td style=\"text-align:center;width:25px;color: "+cols_color[col_index]+";\">" + cols_name[col_index] + "<\/td>";
      }
      for (var col_index = 0; col_index < cols_name.length; ++col_index) {
         str_table += "<td style=\"text-align:center;width:25px;color: "+cols_color[col_index]+";\">" + cols_name[col_index] + "<\/td>";
      }
      str_table += "<\/tr>";
      for (var step_index = 0; step_index < phasedata.length; ++step_index) {
         str_table += SetCheckBox(step_index + 1, directin_index);
      }
      str_table += "<\/table>";
      return str_table;

   }

   function SetCheckBox(step_index, directin_index) {
      var check_box_max = 18;
      if(step_index < 10){
         var text = "0";
         var step = text.concat(step_index);
         parseInt(step);
      }
      else{
         step = step_index;
      }
      var str_table = "<tr style=\"font-size:10pt;\">";
      str_table += "<td style=\"text-align:center;padding:0px;\">" + step_index +"<\/td>";
      for (var box_index = 1; box_index <= check_box_max; ++box_index) {
         str_table += "<td style=\"text-align:center;padding:0px;\"><label><input type='checkbox' id = " + directin_index + step + box_index + "></label></td>";
      }
      str_table += "<\/tr>";
      return str_table;

   }



      //direction 1
      for(var step1 = 0; step1 < phasedata1.length; ++step1){
         if(step1 < 9){
            for(var box1 = 0; box1 < 18; ++box1){
               var a1 = '#10'+(step1+1);
               var domain_checkbox1;
               if(phasedata1[step1][box1] == 1){
                  a1 += (box1+1);
                  domain_checkbox1 = $(a1).prop("checked", true);
               }
               if(phasedata1[step1][box1] == 0 || null){
                  a1 += (box1+1);
                  domain_checkbox1 = $(a1).prop("checked", false);
               }
            }
         }
         else {
            for(var box1 = 0; box1 < 18; ++box1){
               var a1 = '#1'+(step1+1);
               var domain_checkbox1;
               if(phasedata1[step1][box1] == 1){
                  a1 += (box1+1);
                  domain_checkbox1 = $(a1).prop("checked", true);
               }
               if(phasedata1[step1][box1] == 0 || null){
                  a1 += (box1+1);
                  domain_checkbox1 = $(a1).prop("checked", false);
               }
            }
         }
      }



      //direction 3
      for(var step2 = 0; step2 < phasedata2.length; ++step2){
         if(step2 < 9){
            for(var box2 = 0; box2 < 18; ++box2){
               var a2 = '#30'+(step2+1);
               var domain_checkbox2;
               if(phasedata2[step2][box2] == 1){
                  a2 += (box2+1);
                  domain_checkbox2 = $(a2).prop("checked", true);
               }
               if(phasedata2[step2][box2] == 0 || null){
                  a2 += (box2+1);
                  domain_checkbox2 = $(a2).prop("checked", false);
               }
            }
         }
         else{
            for(var box2 = 0; box2 < 18; ++box2){
               var a2 = '#3'+(step2+1);
               var domain_checkbox2;
               if(phasedata2[step2][box2] == 1){
                  a2 += (box2+1);
                  domain_checkbox2 = $(a2).prop("checked", true);
               }
               if(phasedata2[step2][box2] == 0 || null){
                  a2 += (box2+1);
                  domain_checkbox2 = $(a2).prop("checked", false);
               }
            }
         }
      }


      //direction 5
      for(var step3 = 0; step3 < phasedata3.length; ++step3){
         if(step3 < 9){
            for(var box3 = 0; box3 < 18; ++box3){
               var a3 = '#50'+(step3+1);
               var domain_checkbox3;
               if(phasedata3[step3][box3] == 1){
                  a3 += (box3+1);
                  domain_checkbox3 = $(a3).prop("checked", true);
               }
               if(phasedata3[step3][box3] == 0 || null){
                  a3 += (box3+1);
                  domain_checkbox3 = $(a3).prop("checked", false);
               }
            }
         }
         else{
            for(var box3 = 0; box3 < 18; ++box3){
               var a3 = '#5'+(step3+1);
               var domain_checkbox3;
               if(phasedata3[step3][box3] == 1){
                  a3 += (box3+1);
                  domain_checkbox3 = $(a3).prop("checked", true);
               }
               if(phasedata3[step3][box3] == 0 || null){
                  a3 += (box3+1);
                  domain_checkbox3 = $(a3).prop("checked", false);
               }
            }
         }
      }

}
}
}


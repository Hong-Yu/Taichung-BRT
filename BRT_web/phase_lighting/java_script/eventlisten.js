/**
 * Created by Jia on 2014/7/15.
 */
function eventListen() {
   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize(input_data) {
       this.input_data =input_data;
   }
   this.set_web_socket = set_web_socket;
   function set_web_socket(web_socket) {
      this.web_socket = web_socket;
   }
   this.Insert = Insert;
   function Insert(input_data) {
      selectList(input_data);
   }
   this.Listen = Listen;
   function Listen() {
      ListenSelect(this.web_socket);
   }
   this.Updata = Updata;
   function Updata(web_socket){
      update_phase(web_socket,this.input_data);
   }
   this.intersection = ToTC;
   function ToTC(input_data){
      set_intersection_select(input_data);
      listen_intersection();
   }
   this.data_to_TC = data_to_TC;
   function data_to_TC(web_socket){
      DownstreamToTC(web_socket);
   }

   function selectList(input_data) {
      var domain_intersection = $("select.phase");
      var option_dir;
      for (var data_index = 0; data_index < input_data.length; ++data_index) {
         var current_data = input_data[data_index];
         option_dir = document.createElement('option');
         option_dir.innerHTML =current_data.phase_no+ " - " + current_data.phase_name;
         option_dir.title = current_data.phase_total;
         option_dir.id = current_data.phase_step;
         option_dir.setAttribute("mark", current_data.phase_no);
         domain_intersection.append(option_dir);
      }
      var domain_total = $(".phaseinfo");
      var str_total = "分相數: "+input_data[0].phase_total+"　步階數: "+input_data[0].phase_step;
      domain_total.append(str_total);
   }
   function ListenSelect(web_socket) {
   var domain_intersection = $("select.phase");
   domain_intersection.bind("change", selectPhase_change);
   function selectPhase_change(event) {
       if(domain_intersection.attr('id') != '0'){$("button.phaseToTC").removeAttr('disabled');}
       var target = event.currentTarget;
      var domain_select = $(target).find("option:selected");
      var int_id = domain_select.attr("mark");
      var domain_total = $("p.phaseinfo");
      domain_total.empty();
      var str_total = "分相數: ";
      var total = domain_select.attr("title");
      str_total += total+"　步階數: ";
      var step = domain_select.attr("id");
      str_total += step;
      domain_total.append(str_total);
      RequestPhase(web_socket, int_id);
      $('div.status').empty();
   }
       $('.myclassbutton').empty();
   }
function RequestPhase(web_socket, phaseno) {
   var json_data = {};
   json_data.FunctionNo =2020;
   json_data.MsgTypeNo =1;
   json_data.phase_no =phaseno;
//   var json = JSON.stringify(json_data);
   web_socket.Send(json_data);
}

function set_intersection_select(input_data){
   var domain_intersection = $("select.intersection");
   var str_opt = '<option disabled selected>-- 選擇欲下傳時相之路口 --</option>';
   domain_intersection.append(str_opt);
   var option_dir;
   for (var data_index = 0; data_index < input_data.length; ++data_index) {
      var current_data = input_data[data_index];
      option_dir = document.createElement('option');
      option_dir.innerHTML =current_data.intersection_id+ " - " + current_data.name;
      option_dir.title = "路口編號: "+current_data.intersection_id;
      option_dir.setAttribute("mark", current_data.intersection_id);
      domain_intersection.append(option_dir);
   }
    domain_intersection.attr('id', '0');
}
function listen_intersection(){
   var domain_intersection = $("select.intersection");
   domain_intersection.bind("change", selectIntersection_change);
   function selectIntersection_change(event) {
      if(domain_intersection.attr('id') == '0'){$("button.phaseToTC").removeAttr('disabled');}
      domain_intersection.attr('id', '1');
      var target = event.currentTarget;
      var domain_select = $(target).find("option:selected");
      var int_id = domain_select.attr("mark");
      var domain_img = $('div.img_section');
      domain_img.empty();
      var str_img = '<img src="intersection_imgs/'+int_id+'.gif">';
      domain_img.append(str_img);
       $('.alert').remove();
   }
}


function update_phase(web_socket, input_data) {
      var upload_data = new Object();
    upload_data = input_data;
      console.log("Upload listener for Phase_lighting ready.");

        var domain_check = $(':checkbox').change(function(){
            $("button.phaseUpload").removeAttr('disabled');
            $("button.phaseToTC").attr('disabled', true);
            upload_data.FunctionNo = 203;
            upload_data.MsgTypeNo = 6;
            var label = this.id.toString();
            var a = label.charAt(0);
            switch (a){
                case '1':
                    if(label.length == 4){ //direction1
                        var b = parseInt(label.substr(1, 2))-1;
                        var c = label.charAt(3);
                        switch (c){
                            case '1':
                                if(this.checked == true){
                                    upload_data.phasedata[b].r1 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].r1 = 0;
                                }
                                break;
                            case '2':
                                if(this.checked == true){
                                    upload_data.phasedata[b].y1 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].y1 = 0;
                                }
                                break;
                            case '3':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g1 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g1 = 0;
                                }
                                break;
                            case '4':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g1_left = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g1_left = 0;
                                }
                                break;
                            case '5':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g1_dir = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g1_dir = 0;
                                }
                                break;
                            case '6':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g1_right = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g1_right = 0;
                                }
                                break;
                            case '7':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pg1 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pg1 = 0;
                                }
                                break;
                            case '8':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pgf1 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pgf1 = 0;
                                }
                                break;
                            case '9':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pr1 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pr1 = 0;
                                }
                                break;
                            default:
                                console.log("checkbox listen case1 error");
                                break;
                        }
                    }
                    if(label.length == 5){ //direction2
                        var b = parseInt(label.substr(1, 2))-1;
                        var c = label.substr(3, 2);
                        switch (c){
                            case '10':
                                if(this.checked == true){
                                    upload_data.phasedata[b].r2 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].r2 = 0;
                                }
                                break;
                            case '11':
                                if(this.checked == true){
                                    upload_data.phasedata[b].y2 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].y2 = 0;
                                }
                                break;
                            case '12':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g2 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g2 = 0;
                                }
                                break;
                            case '13':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g2_left = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g2_left = 0;
                                }
                                break;
                            case '14':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g2_dir = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g2_dir = 0;
                                }
                                break;
                            case '15':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g2_right = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g2_right = 0;
                                }
                                break;
                            case '16':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pg2 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pg2 = 0;
                                }
                                break;
                            case '17':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pgf2 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pgf2 = 0;
                                }
                                break;
                            case '18':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pr2 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pr2 = 0;
                                }
                                break;
                            default:
                                console.log("checkbox listen case1/length5 error");
                                break;
                        }
                    }
                    break;
                case '3':
                    if(label.length == 4){ //direction3
                        var b = parseInt(label.substr(1, 2))-1;
                        var c = label.charAt(3);
                        switch (c){
                            case '1':
                                if(this.checked == true){
                                    upload_data.phasedata[b].r3 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].r3 = 0;
                                }
                                break;
                            case '2':
                                if(this.checked == true){
                                    upload_data.phasedata[b].y3 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].y3 = 0;
                                }
                                break;
                            case '3':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g3 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g3 = 0;
                                }
                                break;
                            case '4':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g3_left = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g3_left = 0;
                                }
                                break;
                            case '5':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g3_dir = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g3_dir = 0;
                                }
                                break;
                            case '6':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g3_right = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g3_right = 0;
                                }
                                break;
                            case '7':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pg3 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pg3 = 0;
                                }
                                break;
                            case '8':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pgf3 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pgf3 = 0;
                                }
                                break;
                            case '9':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pr3 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pr3 = 0;
                                }
                                break;
                            default:
                                console.log("checkbox listen case3 error");
                                break;
                        }
                    }
                    if(label.length == 5){ //direction4
                        var b = parseInt(label.substr(1, 2))-1;
                        var c = label.substr(3, 2);
                        switch (c){
                            case '10':
                                if(this.checked == true){
                                    upload_data.phasedata[b].r4 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].r4 = 0;
                                }
                                break;
                            case '11':
                                if(this.checked == true){
                                    upload_data.phasedata[b].y4 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].y4 = 0;
                                }
                                break;
                            case '12':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g4 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g4 = 0;
                                }
                                break;
                            case '13':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g4_left = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g4_left = 0;
                                }
                                break;
                            case '14':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g4_dir = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g4_dir = 0;
                                }
                                break;
                            case '15':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g4_right = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g4_right = 0;
                                }
                                break;
                            case '16':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pg4 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pg4 = 0;
                                }
                                break;
                            case '17':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pgf4 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pgf4 = 0;
                                }
                                break;
                            case '18':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pr4 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pr4 = 0;
                                }
                                break;
                            default:
                                console.log("checkbox listen case3/length5 error");
                                break;
                        }
                    }
                    break;
                case '5':
                    if(label.length == 4){ //direction5
                        var b = parseInt(label.substr(1, 2))-1;
                        var c = label.charAt(3);
                        switch (c){
                            case '1':
                                if(this.checked == true){
                                    upload_data.phasedata[b].r5 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].r5 = 0;
                                }
                                break;
                            case '2':
                                if(this.checked == true){
                                    upload_data.phasedata[b].y5 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].y5 = 0;
                                }
                                break;
                            case '3':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g5 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g5 = 0;
                                }
                                break;
                            case '4':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g5_left = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g5_left = 0;
                                }
                                break;
                            case '5':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g5_dir = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g5_dir = 0;
                                }
                                break;
                            case '6':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g5_right = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g5_right = 0;
                                }
                                break;
                            case '7':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pg5 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pg5 = 0;
                                }
                                break;
                            case '8':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pgf5 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pgf5 = 0;
                                }
                                break;
                            case '9':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pr5 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pr5 = 0;
                                }
                                break;
                            default:
                                console.log("checkbox listen case5 error");
                                break;
                        }
                    }
                    if(label.length == 5){ //direction6
                        var b = parseInt(label.substr(1, 2))-1;
                        var c = label.substr(3, 2);
                        switch (c){
                            case '10':
                                if(this.checked == true){
                                    upload_data.phasedata[b].r6 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].r6 = 0;
                                }
                                break;
                            case '11':
                                if(this.checked == true){
                                    upload_data.phasedata[b].y6 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].y6 = 0;
                                }
                                break;
                            case '12':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g6 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g6 = 0;
                                }
                                break;
                            case '13':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g6_left = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g6_left = 0;
                                }
                                break;
                            case '14':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g6_dir = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g6_dir = 0;
                                }
                                break;
                            case '15':
                                if(this.checked == true){
                                    upload_data.phasedata[b].g6_right = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].g6_right = 0;
                                }
                                break;
                            case '16':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pg6 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pg6 = 0;
                                }
                                break;
                            case '17':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pgf6 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pgf6 = 0;
                                }
                                break;
                            case '18':
                                if(this.checked == true){
                                    upload_data.phasedata[b].pr6 = 1;
                                }
                                if(this.checked == false){
                                    upload_data.phasedata[b].pr6 = 0;
                                }
                                break;
                            default:
                                console.log("checkbox listen case5/length5 error");
                                break;
                        }
                    }
                    break;
                default:
                    console.log("checkbox listen error");
                    break;
            }
        });

    var domain_button = $("button.phaseUpload");
    domain_button.click(function(){
        DB_update(upload_data, web_socket);
        $("button.phaseUpload").attr('disabled', true);
    });
}

    function DB_update(upload_data, web_socket){
            var send_data = upload_data;
            if($("select.intersection").attr('id') == '1'){$("button.phaseToTC").removeAttr('disabled');}
            console.log("Uploading to DB");
            web_socket.Send(send_data);
    }
function DownstreamToTC(web_socket){
    var button_to_TC = $("button.phaseToTC");
    button_to_TC.click(function(){
       button_to_TC.attr('disabled', true);
       var lcn = $('select.intersection')[0].selectedOptions[0].attributes.mark.value;
       var upload_tc = {};
       upload_tc.FunctionNo = 203;
       upload_tc.MsgTypeNo = 8;
       upload_tc.LCN = parseInt(lcn);
       upload_tc.phase_no = $("select.phase :selected")[0].attributes.mark.value;
          console.log("Upload Phase_lighting To TC ------------- !");
          web_socket.Send(upload_tc);
          var domain_process =$('div.phase');
          var str_p = '<div class="progress progress-striped active" id="p_bar"><div class="progress-bar progress-bar-warning" id="p_bar_width"  role="progressbar" aria-valuenow="48" aria-valuemin="0" aria-valuemax="100" style="width: 30%"><span class="sr-only">下傳中</span></div></div>';
          domain_process.append(str_p);
      });
   }
}
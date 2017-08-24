/**
 * Created by CCT on 2014/8/25.
 */
function EventHandle(){
   this.Initialize = Initialize;
   function Initialize() {
   }
   this.set_web_socket = set_web_socket;
   function set_web_socket(web_socket) {
      this.web_socket = web_socket;
   }
   this.dateListener = dateListener;
   function dateListener(){
      date_listen(this.web_socket);
   }
   this.time_select_list = time_select_list;
   function time_select_list(inputdata){
      select_list(inputdata);
      ListenSelect(inputdata, this.web_socket);
   }

   function date_listen(websocket){
      $('#tsd_date').change(function(){
         var id =$('.label1')[0].id;
         var tsd_date =$('#tsd_date').val();
         if(id !=""){
            var json_data = {};
            json_data.FunctionNo =700;
            json_data.MsgTypeNo =1;
            json_data.intersection_id =id;
            json_data.tsd_date = tsd_date;
            websocket.Send(json_data);
         }else{
            alert('請點選地圖選擇路口');
         }
      });
   }

   function select_list(inputdata){
      var domain_time = $("select.time");
      domain_time.empty();
      var str_option ="<option disabled selected>請選擇時段繪製時空圖: </option>";
      domain_time.append(str_option);
      var id =$('.label1')[0].id;
      var id_seg =0;
      for (var index = 0; index < inputdata.length; ++index) {
         if(inputdata[index].equip_id ==id){
            id_seg+=1;
         }
      }
         var option_dir;
      for (var data_index = 0; data_index < id_seg; ++data_index) {
         var current_data = inputdata[data_index];
         var priority = "";
         switch (current_data.priority_switch){
            case 0:
               priority = "定";
               break;
            case 1:
               priority = "優";
               break;
            default :
               priority = "no value";
               break;
         }
         option_dir = document.createElement('option');
         option_dir.innerHTML =priority+"  起始時間: "+current_data.begin_time+ "  時制計畫編號: " + current_data.plan_id +"　";
         option_dir.setAttribute("value", current_data.begin_time);
         option_dir.setAttribute("mark", current_data.plan_id);
         option_dir.setAttribute("id", current_data.equip_id);
         domain_time.append(option_dir);
      }
   }
   function ListenSelect(inputdata, websocket) {
      var domain_time = $("select.time");
       domain_time.unbind();
      domain_time.bind("change", selectTime_change);
      function selectTime_change(event) {
         var request={};
         var target = event.currentTarget;
         var domain_select = $(target).find("option:selected");
         var time = domain_select.attr("value");
         var plan_id = domain_select.attr("mark");
         var id = parseInt(domain_select.attr("id"));
         request.select_intersetion={};
         request.select_intersetion.id = id;
         request.select_intersetion.plan_id = plan_id;
         request.next1_intersetion={};
         request.next2_intersetion={};
         var id_seg =0;
         for (var index = 0; index < inputdata.length; ++index) {
            if(inputdata[index].equip_id ==id){
               id_seg+=1;
            }
         }
         var slice_data =inputdata.slice(id_seg);
         console.log(slice_data);
         var next1_array=[];
         var next2_array=[];
         for (var indexs = 0; indexs < slice_data.length; ++indexs) {
            var currentdata = slice_data[indexs];
            if(slice_data[indexs].equip_id ==(id+1)){
               var n1 = next1_array.length;
               next1_array[n1] = currentdata;
            }
            if(slice_data[indexs].equip_id ==(id+2)){
               var n2 = next2_array.length;
               next2_array[n2] = currentdata;
            }
         }
         console.log(JSON.stringify(next1_array));
         console.log(next2_array);

         request.next1_intersetion.id = next1_array[next1_array.length-1].equip_id;
         request.next1_intersetion.plan_id = next1_array[next1_array.length-1].plan_id;
         console.log(JSON.stringify(request.next1_intersetion));

         for(var x1=0; x1<next1_array.length; ++x1){
            if(next1_array[x1].begin_time<=time){
               request.next1_intersetion={};
               request.next1_intersetion.id = next1_array[x1].equip_id;
               request.next1_intersetion.plan_id = next1_array[x1].plan_id;
            }
         }
         request.next2_intersetion.id = next2_array[next2_array.length-1].equip_id;
         request. next2_intersetion.plan_id = next2_array[next2_array.length-1].plan_id;
         for(var x2=0; x2<next2_array.length; ++x2){
            if(next2_array[x2].begin_time<=time){
               request.next2_intersetion={};
               request.next2_intersetion.id = next2_array[x2].equip_id;
               request.next2_intersetion.plan_id = next2_array[x2].plan_id;
            }
         }
         request.FunctionNo =700;
         request.MsgTypeNo =3;
         console.log(JSON.stringify(request));
         websocket.Send(request);
      }
   }
}
/**
 * Created by Jia @ CCT on 2014/8/20.
 */
function RenewLight() {
   this.Initialize = Initialize;
   function Initialize() {
      this.dir_flag = 0;
      var flag= $('#check')[0].attributes.mark.value;
      if(flag == '0'){
         this.dir_flag =0;
      }else if(flag == '1'){
         this.dir_flag =1;
      }else{
          console.log('Dir Error renew_light.js');
      }
   }
   this.intersectionLight = intersectionLight;
   // function intersectionLight(inputlight, cardData){
   //    lightProcess(inputlight, cardData, this.dir_flag);
   // }
   function intersectionLight(inputlight){
      lightProcessAll(inputlight, this.dir_flag);
   }

   function lightProcess(inputlight, cardData, flag){
       var circlelcn = $('#circle'+cardData[0].equip_id);
      if(flag ==0){
         var d0 = 0;
          d0 = inputlight[0].card;
         if(cardData[d0-1].red !="0"){
             circlelcn.attr("fill", "#DC143C");
         }
          else if(cardData[d0-1].yellow !="0"){
             circlelcn.attr("fill", "#FFD700");
         }
          else{
             circlelcn.attr("fill", "#008000");
         }
      }if(flag ==1){
         var d1 = 0;
           d1 = inputlight[1].card;
         if(cardData[d1-1].red !="0"){
             circlelcn.attr("fill", "#DC143C");
         }
          else if(cardData[d1-1].yellow !="0"){
             circlelcn.attr("fill", "#FFD700");
         }
           else{
             circlelcn.attr("fill", "#008000");
         }
      }
   }
 function lightProcessAll(inputlight, flag){
  var intersec_name = [];
  for (p in inputlight) {
    intersec_name.push(p);
  }
      if(flag ==0){
        for(var circle_index =0; circle_index<intersec_name.length; ++circle_index){
          var current_name = intersec_name[circle_index];
          var current_circle = $('#circle'+current_name);
             var d0 = 0;
              d0 = inputlight[current_name].directionData[0].card;
             if(inputlight[current_name].lightData[d0-1].red !="0"){
                 current_circle.attr("fill", "#DC143C");
             }
              else if(inputlight[current_name].lightData[d0-1].yellow !="0"){
                 current_circle.attr("fill", "#FFD700");
             }
              else{
                 current_circle.attr("fill", "#008000");
             }
        }
      }else if(flag ==1){
        for(var circle_index =0; circle_index<intersec_name.length; ++circle_index){
          var current_name = intersec_name[circle_index];
          var current_circle = $('#circle'+current_name);
             var d1 = 0;
              d1 = inputlight[current_name].directionData[0].card;
             if(inputlight[current_name].lightData[d1-1].red !="0"){
                 current_circle.attr("fill", "#DC143C");
             }
              else if(inputlight[current_name].lightData[d1-1].yellow !="0"){
                 current_circle.attr("fill", "#FFD700");
             }
              else{
                 current_circle.attr("fill", "#008000");
             }
        }
      }else{

      }
 }
}
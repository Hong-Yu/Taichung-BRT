/**
 * Created by Jia on 2014/10/6.
 */

module.exports = {
   Initialize: function() {
   },
   UpdateSteps: function(input_data){
      var stepsdata = set_step_data(input_data);
      this.stepsdata = stepsdata;
  },
   UpdatePhase: function(input_data){

  },
   SendStatus: function(web_socket){
      var state = this.state;
      SendStatusTo(web_socket, state);
   }
};

function set_step_data(input_data){
   var stepsdata ={};
   stepsdata.LCN = input_data.LCN;
   // stepsdata.
}
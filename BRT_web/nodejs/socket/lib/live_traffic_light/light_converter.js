/**
 * Created by CCT on 2014/4/14.
 */

module.exports = {
   Initialize: function() {
      this.light = new Object();
      this.light.detail = "default";
      this.light.single = 0;
      this.light.card_detail = 0;
   },
   Show: function() {
      console.log(this.light);
   },
   Convert: function (input_data) {
      CardToLight(input_data, this.light);
   },
   get_detail: function() {
      return this.light.detail;
   },
   get_single: function () {
      return this.light.single;
   },
   get_card_detail: function() {
      return this.light.card_detail;
   }
};

function CardToLight(input_data, light_) {
   // equip_id CardID red yellow Lgreen green Fgreen Rgreen PRed Pgreen
   function Structure(red, yellow, Lgreen, green, Fgreen, Rgreen, PRed, Pgreen) {
      this.red = red;
      this.yellow = yellow;
      this.Lgreen = Lgreen;
      this.green = green;
      this.Fgreen = Fgreen;
      this.Rgreen = Rgreen;
      this.PRed = PRed;
      this.Pgreen = Pgreen;
   }
   var red = input_data.red;
   var yellow = input_data.yellow;
   var Lgreen = input_data.Lgreen;
   var green = input_data.green;
   var Fgreen = input_data.Fgreen;
   var Rgreen = input_data.Rgreen;
   var PRed = input_data.PRed;
   var Pgreen = input_data.Pgreen;
   var card_data = new Structure (red, yellow, Lgreen, green, Fgreen, Rgreen, PRed, Pgreen);
   var right = 0;
   var straight = 0;
   var left = 0;
   if (card_data.yellow == "11") {
      right = 2;
      straight = 2;
      left = 2;
   }
   if (card_data.Lgreen == "11") {
      left = 1;
   }
   if (card_data.Fgreen == "11") {
      straight = 1;
   }
   if (card_data.Rgreen == "11") {
      right = 1;
   }
   if (card_data.green == "11") {
      right = 1;
      straight = 1;
      left = 1;
   }
//   console.log(" " + left + " " + straight + " " + right);
   var single = 0;
   var value;
   value = right + straight;
   if (value >= 1) {
      single = 1;
   }
   value = right + straight + left;
   if (value == 6) {
      single = 2;
   }
//   console.log(single);
   light_.detail = right.toString() + straight.toString()  + left.toString();
   light_.single = single;
   // convert card information to new structure

   light_.card_detail = ConvertCardDetail(card_data);


}

function ConvertCardDetail(card_data) {
//   console.log(card_data);
   var result = "";
   var col_name = ["red", "yellow", "Lgreen", "green", "Fgreen", "Rgreen", "PRed", "Pgreen"];
   var value;
   for (var col_index = 0; col_index < col_name.length; col_index++) {
      value = card_data[col_name[col_index]];
      result += Convert(value);
   }
//      console.log(result);
   return result;

   function Convert(value) {
      switch(value) {
         case "0" :
            return 0;
            break;
         case "11" :
            return 1;
            break;
         case "10" :
            return 2;
            break;
         default:
            console.log("card detail converter miss value.");
            break;
      }
   }


}


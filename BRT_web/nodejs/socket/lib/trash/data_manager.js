/**
 * Created by CCT on 2014/4/14.
 */
module.exports = {
   Initialize: function(intersection_total) {
      this.intersections = [];
      for (var section_index = 0; section_index < intersection_total; ++section_index) {
         this.intersections[section_index] = CreateLightStructure(section_index);
      }
      this.live_light = [];
   },
   Show: function() {
      console.log(this.intersections[2]);
   },
   set_lights: function (intersection_index, detail_set, single_set, light_card_detail) {
      UpdateLight(detail_set, single_set, light_card_detail, this.intersections[intersection_index]);
   },
   set_pole_info: function(intersection_index, card_index, lat, lng, type, rotation) {
//      console.log(intersection_index, card_index, lat, lng, type, rotation);
      UpdatePoleInfo(lat, lng, type, rotation, this.intersections[intersection_index][card_index]);
   },
   get_detail: function() {
      return this.light.detail;
   },
   get_single: function () {
      return this.light.single;
   },
   get_live_light: function () {
      RenewLiveLight(this.intersections, this.live_light);
//      console.log(this.live_light);
      return this.live_light;
   }
};


function CreateLightStructure(section_index) {
   var result = [];
   function Structure(is_used, intersection_id, equip_id, card_id, traffic_type, light, detail, card_detail, rotation, longitude, latitude) {
      this.is_used = is_used;
      this.intersection_id = intersection_id;
      this.equip_id = equip_id;
      this.card_id = card_id;
      this.traffic_type = traffic_type;
      this.light = light;
      this.detail = detail;
      this.card_detail = card_detail;
      this.rotation = rotation;
      this.longitude = longitude;
      this.latitude = latitude;
   }
   var is_used = false;
   var intersection_id = section_index;
   var equip_id = section_index;
   var traffic_type = 1;
   var light = -1;
   var detail = "999";
   var card_detail = "99999999"
   var rotation = 270;
   var longitude = 0.001;
   var latitude = 0.001;
   var card_max = 6;
   for (var card_index = 0; card_index < card_max; ++card_index) {
      var card_id = card_index;
      result[card_index] = new Structure(is_used, intersection_id, equip_id, card_id, traffic_type, light, detail, card_detail, rotation, longitude, latitude);
   }
   return result;
}

function UpdateLight(detail_set, single_set, light_card_detail, intersection) {
   var card_max = 6;
   for (var card_index = 0; card_index < card_max; ++card_index) {
      intersection[card_index].detail = detail_set[card_index];
      intersection[card_index].light = single_set[card_index];
      intersection[card_index].card_detail = light_card_detail[card_index];
   }
}

function UpdatePoleInfo(lat, lng, type, rotation, card) {
   card.longitude = lng;
   card.latitude = lat;
   card.rotation = rotation;
   card.traffic_type = type;
   card.is_used = true; // help to judge which data should be send.
}

function RenewLiveLight(intersections, live_light) {
   live_light.length = 0; // renew live light array with update method;
   var light_index = -1;
   var intersection;
   var card;
   for (var section_index = 0; section_index < intersections.length; ++section_index) {
      intersection = intersections[section_index];
      for (var card_index = 0; card_index < intersection.length; ++card_index) {
         card = intersection[card_index];
         if (!card.is_used) continue;
         live_light[++light_index] = card;
      }
   }
}
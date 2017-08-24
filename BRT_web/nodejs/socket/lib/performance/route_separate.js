/**
 * Created by CCT on 2014/4/23.
 */

module.exports = {
   Initialize: function() {
      this.route_sorce = [0.0, 0.0, 0.0, 0.0];
      this.route_pair = [];
   },
   Separate: function(lat_begin, lng_begin, lat_end, lng_end) {
      this.route_sorce = [parseFloat(lat_begin), parseFloat(lng_begin), parseFloat(lat_end), parseFloat(lng_end)];
      PairRoute(this.route_sorce, this.route_pair, 0.0001);
      return this.route_pair;
   }
};

function PairRoute(route_sorce, route_pair, gap) {
   var vector_source = [];
   vector_source[0] = route_sorce[2] - route_sorce[0];
   vector_source[1] = route_sorce[3] - route_sorce[1];
//   console.log(vector_source);
   var unit_orthogonal = [];
   var magnitude = Math.sqrt(Math.pow(vector_source[0], 2) + Math.pow(vector_source[1], 2));
   unit_orthogonal[0] = vector_source[1] / magnitude * -1.0;
   unit_orthogonal[1] = vector_source[0] / magnitude;
//   console.log(unit_orthogonal);
   route_pair[0] = [];
   route_pair[1] = [];
   route_pair[0][0] = route_sorce[0] + unit_orthogonal[0] * gap;
   route_pair[0][1] = route_sorce[1] + unit_orthogonal[1] * gap;
   route_pair[0][2] = route_sorce[2] + unit_orthogonal[0] * gap;
   route_pair[0][3] = route_sorce[3] + unit_orthogonal[1] * gap;
   route_pair[1][0] = route_sorce[0] - unit_orthogonal[0] * gap;
   route_pair[1][1] = route_sorce[1] - unit_orthogonal[1] * gap;
   route_pair[1][2] = route_sorce[2] - unit_orthogonal[0] * gap;
   route_pair[1][3] = route_sorce[3] - unit_orthogonal[1] * gap;

}

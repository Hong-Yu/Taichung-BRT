/**
 * Created by CCT on 2014/5/9.
 */
//  user.js
   // load the thing we need
//var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// define the schema for our user model
//var userSchema = mongoose.Schema({
//   local :{
//      email :String,
//      password :String
//   }
//});
// methods ====================================================================
//userSchema.methods.generateHash = function(password){
//  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//};
//userSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.local.password);
//}
//Create the model for users and expose it to out app
//module.exports = mongoose.model('User', userSchema);
module.exports = {
   //generating a hash
   GenerateHash : function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
   },
   // checking if password is valid
   ValidPassword : function(password) {
      return bcrypt.compareSync(password, this.local.password);
   }
};
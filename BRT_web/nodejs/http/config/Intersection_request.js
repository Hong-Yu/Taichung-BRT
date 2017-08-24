module.exports = {
   Initialize : function(ms_connector, sql_generator) {
      this.ms_connector = ms_connector;
      this.sql_generator = sql_generator;
   },
   List : function(response) {
      selectList(this.ms_connector, this.sql_generator, response);
   }
}

function selectList(connector, sql_generator, response){
   var cmd_sql = "";
   cmd_sql += 'SELECT [intersection_id] ,[name] FROM [brt].[dbo].[intersection]';
   console.log(cmd_sql);
   var query = connector.query(cmd_sql);
   query.exec( function( err, res ){
      if( err ){
         console.log('select error: Intersection_request selectList\n');
         console.log(err);
         response.json({ successful: false, message: this.error.message });
         return
      }else{
         console.log('select success: Intersection_request selectLis\n');
         response.json({ successful: true, message: res.result });
      }
   });
}
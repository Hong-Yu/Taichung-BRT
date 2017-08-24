/**
 * Created by CCT on 2014/4/9.
 */

module.exports = {
    Initialize: function() {
        this.ms_require = require( "node-mssql-connector" );
        this.con_db = MSDataBaseConnect(this.ms_require);
    },
    get_connector: function () {
        return this.con_db;
    }

};

var MSDataBaseConnect = function (MSSQLConnector) {
    var con_db = new MSSQLConnector( {
        connection: {
            userName: "sa",
           // password: "Cj862u04",
//          server: "192.168.1.9",
//       password: "adminks1679@cct",
            server: "192.168.1.3",
            password: "maeda",
            options: {
                database: "brt"
            }
        }
    });
    var query = con_db.query("Select name from intersection");
    query.exec( function( err, res ){
        if( err ){
            console.log('Require error\n');
            console.log(err);
            return
        }else{
//         console.log(res);
            console.log('database connect success,\n');
        }
    });
    return con_db;
}

/**
 * Created by hong on 2014/11/17.
 */
var mssql = require('../../lib/mssql_connector');
var ms_connector = mssql.get_connector();
// sql smart generator
var sql_generator =  require('../../lib/sql_generator.js');

module.exports = {
    Initialize : function(ms_connector, sql_generator) {
    },
    Manipulate : function(act, input_data, response) {
        console.log("account -- act: ", act, " input data: ", input_data);
        switch(act) {
            case 'account_list':
                AccountSelect(response);
                break;
            case 'account_sign_up':
                AccountInsert(input_data, response);
                break;
            case 'account_delete':
                AccountDelete(input_data, response);
                break;
            case 'account_update':
                AccountUpdate(input_data, response);
                break;
            default:
                console.log("account manager act not defined.");
                break;
        }
    }
}

function AccountSelect(response) {
    var table_name = "user_account";
    var cmd_sql = "";
    cmd_sql += "SELECT * FROM " + table_name + " ";
    cmd_sql += "WHERE level < 100 ";
    sql_generator.ExecuteResponse("select account list ", ms_connector, cmd_sql, response);
}

function AccountInsert(input_data, response) {
    var table_name = "user_account";
    var column_name = ["email", "password", "level"];
    var column_type = [0, 0, 1];
    var cmd_sql = "";
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
    cmd_sql += sql_generator.End();
    sql_generator.ExecuteResponse("insert account ", ms_connector, cmd_sql, response);
}

function AccountDelete(input_data, response) {
    var table_name = "user_account";
    var column_name = ["email"];
    var column_type = [0];
    var cmd_sql = "";
    cmd_sql += sql_generator.Delete(table_name);
    cmd_sql += sql_generator.Where(column_name, column_type, input_data);
    cmd_sql += sql_generator.End();
    sql_generator.ExecuteResponse("delete account ", ms_connector, cmd_sql, response);
}

function AccountUpdate(input_data, response) {
    var table_name = "user_account";
    var column_name = ["password", "level"];
    var column_type = [0, 1];
    var cmd_sql = "";
    cmd_sql += sql_generator.Update(table_name, column_name, column_type, input_data);
    var primary_key = ["email"];
    var primary_type = [0];
    cmd_sql += sql_generator.Where(primary_key, primary_type, input_data);
    console.log(cmd_sql);
    sql_generator.ExecuteResponse("Update account ", ms_connector, cmd_sql, response);
}



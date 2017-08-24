/**
 * Created by hong on 2014/4/12.
 */


module.exports  = {
    Select: function(table_name, column_name) {
        var cmd_sql = "";
        cmd_sql += "SELECT ";
        for (var col_index = 0; col_index < column_name.length; ++col_index) {
            var current_name = column_name[col_index];
            cmd_sql += "" + current_name + "";
            if (col_index == (column_name.length - 1)) {
                cmd_sql += " ";
            } else {
                cmd_sql += ", ";
            }
        }
        cmd_sql += "FROM " + table_name + " ";
        return cmd_sql
    },
    SelectTop: function(table_name, column_name, row_max) {
        var cmd_sql = "";
        cmd_sql += "SELECT TOP "+ row_max + " ";
        for (var col_index = 0; col_index < column_name.length; ++col_index) {
            var current_name = column_name[col_index];
            cmd_sql += "" + current_name + "";
            if (col_index == (column_name.length - 1)) {
                cmd_sql += " ";
            } else {
                cmd_sql += ", ";
            }
        }
        cmd_sql += "FROM " + table_name + " ";
        return cmd_sql
    },
    Where: function(primary_key, primary_type, input_data) {
        var cmd_sql = "";
        for (var col_index = 0; col_index < primary_key.length; ++col_index) {
            var current_key = primary_key[col_index];
            if (col_index == 0) {
                cmd_sql += "WHERE " + current_key + "=";
                if (primary_type[col_index])  cmd_sql += input_data[current_key] + " ";
                else cmd_sql +="'" +  input_data[current_key] + "' ";
            } else {
                cmd_sql += "AND " + current_key + "=";
                if (primary_type[col_index])  cmd_sql += input_data[current_key] + " ";
                else cmd_sql +="'" +  input_data[current_key] + "' ";
            }
        }
        return cmd_sql
    },
    InsertInto: function(table_name, column_name, column_type, plan_data) {
//      INSERT INTO Customers (CustomerName, City, Country)
//      VALUES ('Cardinal', 'Stavanger', 'Norway');
        var cmd_sql = "";
        cmd_sql += "INSERT INTO " + table_name;
        cmd_sql += " ("
        for (var col_index = 0; col_index < column_name.length; ++col_index) {
            cmd_sql += column_name[col_index];
            if (col_index == (column_name.length - 1)) {
                cmd_sql += " ";
            } else {
                cmd_sql += ", ";
            }
        }
        cmd_sql += ") "
        cmd_sql += "VALUES (";
        for (var col_index = 0; col_index < column_name.length; ++col_index) {
            var current_name = column_name[col_index];
            if (column_type[col_index])  cmd_sql += plan_data[current_name] + " ";
            else cmd_sql +="'" +  plan_data[current_name] + "' ";
            if (col_index == (column_name.length - 1)) {
                cmd_sql += " ";
            } else {
                cmd_sql += ", ";
            }
        }
        cmd_sql += ") ";
        return cmd_sql
    },
    Delete: function(table_name) {
        var cmd_sql = "DELETE FROM " + table_name + " ";
        return cmd_sql
    },
    Update: function(table_name, column_name, column_type, input_data) {
//        UPDATE table_name
//        SET column1=value1,column2=value2,...
//        WHERE some_column=some_value;
        var cmd_sql = "";
        cmd_sql += "UPDATE " + table_name + " ";
        cmd_sql += "SET "
        for (var col_index = 0; col_index < column_name.length; ++col_index) {
            var current_name = column_name[col_index];
            cmd_sql += current_name + "=";
            if (column_type[col_index])  cmd_sql += input_data[current_name] + "";
            else cmd_sql +="'" +  input_data[current_name] + "'";
            if (col_index == (column_name.length - 1)) {
                cmd_sql += " ";
            } else {
                cmd_sql += ", ";
            }
        }
        return cmd_sql
    },
    End: function() {
        var cmd_sql = "; ";
        return cmd_sql
    },
    Execute: function(type, con_db, cmd_sql) {
        var query = con_db.query(cmd_sql);
        query.exec( function( err, res ){
            if( err ){
                console.log(type + ' error');
                console.log(err);
            }else{
                console.log(type + ' success');
            }
        });
    },
    ExecuteWith: function(type, con_db, cmd_sql, success, fail) {
        var query = con_db.query(cmd_sql);
        query.exec( function( err, res ){
            if( err ){
                console.log(type + ' error');
                console.log(err);
                fail.set_error(err);
                fail.Response();
            }else{
                console.log(type + ' success');
                success.set_result(res);
                success.Response();
            }
        });
    },
    ExecuteResponse: function(type, con_db, cmd_sql, response) {
        var query = con_db.query(cmd_sql);
        query.exec( function( err, res ){
            if( err ){
                console.log(type + ' error');
                console.log(err);
                response.end(JSON.stringify({ successful: false, data: err }));
            }else{
                console.log(type + ' success');
                response.end(JSON.stringify({ successful: true, data: res }));
            }
        });
    },
    ExecuteCallbackResult: function(type, con_db, cmd_sql, callback) {
        var query = con_db.query(cmd_sql);
        query.exec( function( err, res ){
            if( err ){
                console.log(type +' error: '+ err);
                callback(err, null);
            }else{
                callback(null, res);
            }
        });
    }

}

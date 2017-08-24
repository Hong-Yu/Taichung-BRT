/**
 * Created by hong on 2014/4/3.
 */
module.exports = {
    Priority: function (plan_data) {
        console.log("Priority type table -- update");
        UpdatePriority(this.con_db, plan_data);
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
//        console.log(this.con_db);
    }
};

function UpdatePriority(con_db, plan_data) {
//   console.log(plan_data);
//   UpdateUniquePlan(con_db, plan_data[0]);
    var table_name = "priority_control";
    var column_name = ["priority_id"];
    var primary_key = ["equip_id"];
    var primat_type = [1];
    var sql_select = Select(table_name, column_name, primary_key, primat_type, plan_data);
    console.log(sql_select);
    var query = con_db.query(sql_select);
    query.exec( function( err, res ){
        if( err ){
            console.log('priority update Error');
            console.log(err);
            return
        }else{
            console.log('priority update success');
            for (var plan_index = 0; plan_index < res.result.length; ++plan_index) {
                if (plan_index >= plan_data.length) break;
                var priority_id = res.result[plan_index].priority_id;
                console.log(priority_id);
                UpdateUniquePriority(con_db, plan_data[plan_index], priority_id);
            }
            console.log(res.result.length + " " + plan_data.length + " ");
            for (var plan_index = res.result.length; plan_index < plan_data.length; ++plan_index) {
                var priority_id = plan_data[plan_index].priority_id;
                console.log(priority_id);
//            UpdateUniquePlan(con_db, plan_data[plan_index], plan_id);
                Insert(con_db, plan_data[plan_index]);
            }
        }
    });

    function Select(table_name, column_name, primary_key, primat_type, plan_data) {
        var cmd_sql = "";
        cmd_sql += SQL.Select(table_name, column_name);
        cmd_sql += SQL.Where(primary_key, primat_type, plan_data);
        cmd_sql += SQL.End();
        return cmd_sql;
    }
   //      {"equip_id":1234,"priority_id":"2","past_east":"110000","past_west":"110000","door_trigger_up":"2","door_trigger_down":"0","headway_up":"50",
//         "headway_down":"0","lowspeed":"5","percentage_east1":"1","percentage_east2":"1","percentage_east3":"2","percentage_east4":"2","percentage_east5":
//         "3","percentage_east6":"3","percentage_west1":"1","percentage_west2":"1","percentage_west3":"2","percentage_west4":"2","percentage_west5":"3",
//         "percentage_west6":"5"}]}};
    function Insert(con_db, plan_data) {
        var table_name = "priority_control";
        var column_name = ["equip_id", "priority_id", "past_east", "past_west", "door_trigger_up", "door_trigger_down", "headway_up", "headway_down", "lowspeed"];
        var primary_key = ["equip_id"];
        var col_index = 7;
       col_index = SequentialName(col_index, "percentage_east", column_name);
       col_index = SequentialName(col_index, "percentage_west", column_name);

        var column_type = [];
        ConstantArray(49, 1, column_type);
        column_type[2] = 0;
        var cmd_sql = "";
//      console.log(plan_data);
        cmd_sql += SQL.InsertInto(table_name, column_name, column_type, plan_data);
        cmd_sql += SQL.End();
        SQL.Execute("Insert priority ", con_db, cmd_sql);
//      console.log(cmd_sql);
        function SequentialName(col_index, prefix, array) {
            for (var index = 1; index < 7; ++index) {
                array[col_index++] = prefix + index;
            }
            return col_index;
        }
        function ConstantArray(max, value, array) {
            for (var index = 0; index < max; ++index) {
                array[index] = value;
            }
        }
    }
}

function UpdateUniquePriority(con_db, priority_data, priority_id) {
    console.log("updata prioirty row");
    var cmd_sql = "UPDATE priority_control ";
    cmd_sql += "SET ";
    cmd_sql += "door_trigger_up =" + priority_data.door_trigger_up + ", ";
    cmd_sql += "door_trigger_down =" + priority_data.door_trigger_down + ", ";
    cmd_sql += "headway_up =" + priority_data.headway_up + ", ";
    cmd_sql += "headway_down =" + priority_data.headway_down + ", ";
   cmd_sql += EqualityStringMaker(priority_data, "percentage_east", "percentage_east");
   cmd_sql += EqualityStringMaker(priority_data, "percentage_west", "percentage_west");
    cmd_sql += "lowspeed =" + priority_data.lowspeed + " ";
    cmd_sql += "WHERE equip_id =" + priority_data.equip_id + " ";
    cmd_sql += "AND priority_id =" + priority_id + ";";
   console.log(cmd_sql);
    //        var column_name = ["equip_id", "priority_id", "door_trigger_up", "door_trigger_down", "headway_up", "headway_down", "lowspeed"];
    SQL.Execute("update priority ", con_db, cmd_sql);
    function EqualityStringMaker(data, destination_name, child_name) {
        var cmd_sql = "";
        for (var index = 0; index < 6; ++index) {
            var source_name = child_name + (index + 1);
            cmd_sql += "" + destination_name + (index + 1) + "=" + data[source_name] + ", ";
        }
        return cmd_sql;
    }
}

var SQL = {
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
    Where: function(primary_key, primat_type, plan_data) {
        var cmd_sql = "";
        for (var col_index = 0; col_index < primary_key.length; ++col_index) {
            var current_key = primary_key[col_index];
            if (col_index == 0) {
                cmd_sql += "WHERE " + current_key + "=";
                if (primat_type[col_index])  cmd_sql += plan_data[0][current_key] + " ";
                else cmd_sql +="'" +  plan_data[0][current_key] + "' ";
            } else {
                cmd_sql += "AND " + current_key + "=";
                if (primat_type[col_index])  cmd_sql += plan_data[0][current_key] + " ";
                else cmd_sql +="'" +  plan_data[0][current_key] + "' ";
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
    Update: function(table_name, column_name) {
        var cmd_sql = "";
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
    }

}


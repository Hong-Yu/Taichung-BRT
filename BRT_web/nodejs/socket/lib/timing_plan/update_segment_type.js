/**
 * Created by CCT on 2014/6/16.
 */
module.exports = {
    Initialize: function() {
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
    },
    set_sql_generator: function (sql_generator) {
        this.sql_generator = sql_generator;
    },
    Update: function(input_data) {
        console.log("SegmentType table -- update start: ");
        SegmentTypeUpdateAssign(this.con_db, this.sql_generator, input_data);
    }
}

function SegmentTypeUpdateAssign(con_db, sql_generator, input_data) {
    var table_name = get_table_name();
    var column_name = ["mon"];
    var primary_key = ["equip_id"];
    var primary_type = [1];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    cmd_sql += sql_generator.Where(primary_key, primary_type, input_data);
    cmd_sql += sql_generator.End();
    var type = "SegmentType select";
    var query = con_db.query(cmd_sql);
    query.exec( function( err, res ){
        if( err ){
            console.log(type + ' error');
            console.log(err);
        }else{
            console.log(type + ' success');
            var row_count = res.rowcount;
            switch (row_count) {
                case 0:
                    SegmentTypeInsert(con_db, sql_generator, input_data);
                    break;
                case 1:
                    SegmentTypeUpdate(con_db, sql_generator, input_data);
                    break;
                default:
                    console.log("segment_type update: update column is still lacking");
                    break;
            }
        }
    });
}

function SegmentTypeInsert(con_db, sql_generator, input_data) {
    var table_name = get_table_name();
    var column_name = get_column_name();
    column_name.unshift('equip_id');
    var column_type = get_column_type();
    column_type.unshift(1);
    var cmd_sql = "";
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
//   console.log("SegmentType insert :");
//   console.log(cmd_sql);
    sql_generator.Execute("SegmentType insert ", con_db, cmd_sql);
}

function SegmentTypeUpdate(con_db, sql_generator, input_data) {
    var table_name = get_table_name();
    var column_name = get_column_name();
    var column_type = get_column_type();
    var cmd_sql = "";
    cmd_sql += sql_generator.Update(table_name, column_name, column_type, input_data);
    cmd_sql += "WHERE equip_id = "+ input_data.equip_id;
//   console.log("segment_type update :");
//   console.log(cmd_sql);
    sql_generator.Execute("segment_type update ", con_db, cmd_sql);
}

function get_table_name() {
    return "day_segtype";
}

function get_column_name() {
    var column_name = ["sun", "mon", "tue", "wed", "thu", "fri", "sat",
        "even_sun", "even_mon", "even_tue", "even_wed", "even_thu", "even_fri", "even_sat"];
    var column_index = 13;
    for (var type_index = 1; type_index <= 13; ++type_index) {
        var name_start = 'spc' + type_index + '_startdate';
        var name_end = 'spc' + type_index + '_enddate';
        var name_number = 'spc' + type_index;
        column_name[++column_index] = name_start;
        column_name[++column_index] = name_end;
        column_name[++column_index] = name_number;
    }
    return column_name;

}

function get_column_type() {
    var column_type = [
        1, 1, 1, 1, 1,
        1, 1, 1, 1, 1,
        1, 1, 1, 1, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0
    ];
    return column_type;
}
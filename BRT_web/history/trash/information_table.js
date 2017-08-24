/**
 * Created by hong on 2014/8/10.
 */
function InformationTable() {
// Public member ----------------------------------------------------------
    this.Update = Update;
    function Update(purpose, input_data) {
        var domain = $('table.history_content').empty();
        DataAssignment(purpose, input_data);

    }
// Private member ---------------------------------------------------------
    function DataAssignment(purpose, input_data) {
        switch(purpose) {
            case "priority_operate":
                var table_header = 'history/sub_page/priority_operate.html';
                var column_names = ["operated_date", "user_name", "equip_id", "seg_type", "begin_time", "priority_switch"];
                break;
            case "priority_strategy":
                var table_header = 'history/sub_page/priority_strategy.html';
                var column_names = ["create_time", "equip_id", "dir", "strategy"];
                break;
            case "trigger_point":
                var table_header = 'history/sub_page/trigger_point.html';
                var column_names = ["create_time", "equip_id", "dir", "plate_number", "point"];

                break;
        }
        var domain_main = $('table.history_content');
        $.get(table_header, function(data) {
            domain_main.prepend(data);
            AppandTableBody(input_data, column_names);
        });
        function AppandTableBody(input_data, column_names) {
            var domain = $('table.history_content > tbody');
            var html = '';
            for(var row_index = 0; row_index < input_data.length; ++row_index) {
                html += '<tr>';
                var current_data = input_data[row_index];
                for(var col_index = 0; col_index < column_names.length; ++col_index) {
                    var column_name = column_names[col_index];
                    html += '<td>'+ current_data[column_name] +'</td>';

                }
                html += '</tr>';

            }
            domain.append(html);

        }

    }
}

//var column_name = ["user_name", "equip_id", "seg_type", "begin_time", "priority_switch", "operated_date"];
//var function_names = ["priority_operate", "priority_strategy", "trigger_point"];
//CREATE TABLE history_strategy (
//    ID int IDENTITY(1,1) PRIMARY KEY,
//    equip_id int,
//    dir int,
//    strategy int,
//    create_time datetime NOT NULL DEFAULT GETDATE()
//)
//
//CREATE TABLE history_trigger_point (
//    ID int IDENTITY(1,1) PRIMARY KEY,
//    equip_id int,
//    dir int,
//    plate_number nvarchar(13),
//    point int,
//    create_time datetime NOT NULL DEFAULT GETDATE()
//)
/**
 * Created by CCT on 2014/5/30.
 */
function InformationTable() {
    // Public member ----------------------------------------------------------
    this.Insert = Insert;
    function Insert(input_data) {
        String.prototype.insert = function (index, string) {
            if (index > 0)
                return this.substring(0, index) + string + this.substring(index, this.length);
            else
                return string + this;
        };
        FillInformation($("div.info_div.previous"), input_data[0]);
        FillInformation($("div.info_div.current"), input_data[1]);
        FillInformation($("div.info_div.next"), input_data[2]);


    }
    // Private member ----------------------------------------------------------
    function FillInformation(domain_info_div, input_data) {
        var domain_current = domain_info_div;
        domain_current.find("li.name").text(input_data.name);
        // receive_time
        domain_current.find("td.receive_time").text(input_data.receive_time);
        domain_current.find("td.phase").text(input_data.phase[0]);
        domain_current.find("td.phase_step").text(input_data.phase_step[0]);
//      domain_current.find("td.phase_step.west").text(input_data.phase_step[1]);
        domain_current.find("td.countdown").text(input_data.countdown[0]);
//      domain_current.find("td.countdown.west").text(input_data.countdown[1]);
        var car_id_east = input_data.car_id[0].insert(6, " ");
        var car_id_west = input_data.car_id[1].insert(6, " ");
        domain_current.find("td.car_id.east").text(car_id_east);
        domain_current.find("td.car_id.west").text(car_id_west);
        domain_current.find("td.bus_arrival_time.east").text(input_data.bus_arrival_time[0]);
        domain_current.find("td.bus_arrival_time.west").text(input_data.bus_arrival_time[1]);
        domain_current.find("td.priority_strategy_live.east").text(input_data.priority_strategy_live[0]);
        domain_current.find("td.priority_strategy_live.west").text(input_data.priority_strategy_live[1]);
        domain_current.find("td.priority_strategy_history.east").text(input_data.priority_strategy_history[0]);
        domain_current.find("td.priority_strategy_history.west").text(input_data.priority_strategy_history[1]);
        domain_current.find("td.priority_strategy_count.east").text(input_data.priority_strategy_count[0]);
        domain_current.find("td.priority_strategy_count.west").text(input_data.priority_strategy_count[1]);
        var select, value;
        for (var point_index = 0; point_index < 7; ++point_index) {
        var car_id_east = input_data.receive_bus_p[0][point_index].insert(6, "\n ");
            //value = input_data.receive_time_p[0][point_index] +'\n'+ input_data.receive_bus_p[0][point_index];
            value = input_data.receive_time_p[0][point_index] +'\n'+ car_id_east;
            select = 'td.p' + point_index + '.east';
            domain_current.find(select).text(value);
        var car_id_west = input_data.receive_bus_p[1][point_index].insert(6, "\n ");

            //value = input_data.receive_time_p[1][point_index] +'\n'+ input_data.receive_bus_p[1][point_index];
            value = input_data.receive_time_p[1][point_index] +'\n'+ car_id_west;
            select = 'td.p' + point_index + '.west';
            domain_current.find(select).text(value);
        }
        domain_current.find("td.priority_status").text(input_data.priority_status_live);
        // strategy system
//        if (typeof FillInformation.strategy_history === "undefined")  FillInformation.strategy_history = [];
//        if (typeof FillInformation.phase_history === "undefined") FillInformation.phase_history = input_data.phase_step[0];
//        for (var direction_index = 0; direction_index < 2; ++direction_index) {
//            var direction_label = [".east", ".west"];
//            var direction = direction_label[direction_index];
//            var priority_strategy = "";
//
//            var strategy_current = input_data.priority_strategy[direction_index];
//            var strategy_history = FillInformation.strategy_history[direction_index];
//            var phase_current = input_data.phase_step[0];
//            var phase_history = FillInformation.phase_history;
//            if (strategy_current == 0 && strategy_history !=0) {
//                if (phase_current == phase_history)
//                    strategy_current = strategy_history;
//                else
//                    FillInformation.phase_history = phase_current;
//            }
//
//            switch (strategy_current) {
//                case 0:
//                    priority_strategy = "--------";
//                    break;
//                case 1:
//                    priority_strategy = "綠燈延長";
//                    break;
//                case 2:
//                    priority_strategy = "紅燈切斷";
//                    break;
//                default :
//                    priority_strategy = "not found";
//            }
//
//            FillInformation.strategy_history[direction_index] = input_data.priority_strategy[direction_index];
//            domain_current.find("td.priority_strategy"+ direction).text(strategy_current);

//        }

        var domain_strategy_diagram = $("p.strategy_diagram");
//      StrategyDiagram(domain_strategy_diagram, Math.floor((Math.random() * 3)));
        StrategyDiagram(domain_strategy_diagram, input_data.priority_strategy);

    }

    function StrategyDiagram(domain, strategy) {
//      console.log(strategy);
        domain.empty();
        var strVar="";
        switch(strategy) {
            case 0:
                strVar += "<a style=\"width:100px\" class=\"btn btn-success\" role=\"button\">綠燈<\/a>";
                strVar += "<a style=\"width:100px\" class=\"btn btn-danger\" role=\"button\">紅燈<\/a>";
                break;
            case 1:
                strVar += "<a style=\"width:90px\" class=\"btn btn-success\" role=\"button\">綠燈<\/a>";
                strVar += "<a style=\"width:35px\" class=\"btn btn-success\" role=\"button\">綠燈<\/a>";
                strVar += "<a style=\"width:45px\" class=\"btn btn-danger\" role=\"button\">紅燈<\/a>";
                break;
            case 2:
                strVar += "<a style=\"width:90px\" class=\"btn btn-success\" role=\"button\">綠燈<\/a>";
                strVar += "<a style=\"width:35px\" class=\"btn btn-danger\" role=\"button\">紅燈<\/a>";
                strVar += "<a style=\"width:45px\" class=\"btn btn-success\" role=\"button\">綠燈<\/a>";
                break;
        }

        domain.append(strVar);

    }

}

/**
 * Created by CCT on 2014/3/4.
 */

function InsertAction() {
    // Public member ----------------------------------------------------------
    this.set_tod_data = set_tod_data;
    function set_tod_data(tod_data) {
        this.data_modify.plan = transfer.DayToSection(tod_data);
    }
    this.set_standard_data = set_standard_data;
    function set_standard_data(standard_data) {
        if (standard_data.length != 0)
            this.data_modify.standard = transfer.PlanToSection(standard_data);
    }
    this.set_phase_list = set_phase_list;
    function set_phase_list(phase_list) {
        this.data_modify.phase_list = transfer.PhaseToSection(phase_list);
        this.FillPhaseList(this.data_modify.phase_list);
//        console.log(this.data_modify.phase_list);
    }
    this.set_priority_data = set_priority_data;
    function set_priority_data(priority_data) {
        this.data_modify.priority = transfer.PriorityToSection(priority_data);
    }
    this.Insert = Insert;
    function Insert(segment_type) {
        console.log("Insert Plan :" + segment_type);
        this.HideTableAll();
        var plan_information = this.data_modify.plan[segment_type - 1];
        if (typeof plan_information === "undefined") {
            console.log("No data in this segment type. ");
            return;
        }
        //$('#centerview').find('table.table.mainbody>tbody').hide(); // hide all paln table.
        // Fill phase list to all of plan table.
        for (var plan_index = 0; plan_index < plan_information.length; ++plan_index) {
            this.ShowTable(plan_index);
            var plan_id = plan_information[plan_index].plan_id;
            var begin_time = plan_information[plan_index].begin_time;
            var standard_content = this.data_modify.standard[plan_id];
            this.FillPlanDetail(plan_index, standard_content);
            // priority parameter
            var priority_content = this.data_modify.priority[plan_id];
            this.FillPriorityDetail(plan_index, priority_content);
            this.FillSpecificContent(plan_index, plan_information[plan_index]);
            this.FillCalculationContent(plan_index, standard_content);
        }
        // this.data_modify.standard[type_index] = plan_set;

    }

    this.set_specific_tod_data = set_specific_tod_data;
    function set_specific_tod_data(tod_data) {
        this.specific.tod = tod_data;
    }
    this.set_specific_std_data = set_specific_std_data;
    function set_specific_std_data(std_data) {
        this.specific.std = std_data;
    }
    this.set_specific_priority_data = set_specific_priority_data;
    function set_specific_priority_data(priority_data) {
        this.specific.priority = priority_data;

    }
    this.InsertTOD = InsertTOD;
    function InsertTOD(tod_index) {
        console.log("Insert time of day");
        var tod_data = this.specific.tod;
//        console.log(tod_data);
//        for (var tod_index = 0; tod_index < tod_data.length; ++tod_index) {
        var is_new_plan = true;
        var plan_id = tod_data[tod_index].plan_id;
        // Check plan is new or not.
        var std_data = this.data_modify.standard;
        for (var std_index = 0; std_index < std_data.length; ++std_index) {
            if(typeof std_data[std_index] === 'undefined') continue;
            if (plan_id == std_data[std_index].plan_id) is_new_plan = false;
        }
        if (is_new_plan) {
            this.FillTableZeor(tod_index);
        } else {
            var standard_content = this.data_modify.standard[plan_id];
            this.FillPlanDetail(tod_index, standard_content);
            this.FillCalculationContent(tod_index, standard_content);
            var priority_content = this.data_modify.priority[plan_id];
            this.FillPriorityDetail(tod_index, priority_content);
        }
    }

    this.InsertSpecificPlanContent = InsertSpecificPlanContent;
    function InsertSpecificPlanContent(table_index) {
        console.log("Insert plan content");
        var tod_data = this.specific.tod;
        var std_data = this.specific.std;
        var priority_data = this.specific.priority;
//        console.log(std_data);

        for (var tod_index = 0; tod_index < tod_data.length; ++tod_index) {
            if (std_data.plan_id != tod_data[tod_index].plan_id) continue;
//            console.log(tod_index);
            this.FillPlanDetail(tod_index, std_data);
            this.FillCalculationContent(tod_index, std_data);
            this.FillPriorityDetail(tod_index, priority_data);


        }


    }
    // Private member ---------------------------------------------------------
    this.data_modify = new Object();
    this.specific = new Object();
    var transfer = new TransferInputData();

    this.FillSpecificContent = FillSpecificContent;
    function FillSpecificContent(table_index, tod_data) {
        var table_id = '#timing_plan_table' + (table_index + 1);
        var domain = $(table_id);
        var plan_id = tod_data.plan_id;
        var begin_time = tod_data.begin_time;
        FillUnit(domain, plan_id, 0);
        var domain_time = $(table_id).find('div.bootstrap-timepicker>input');
        domain_time.timepicker('setTime',begin_time);
        var priority_switch = tod_data.priority_switch;
        var ped_countdown = tod_data.ped_countdown;
        var car_countdown = tod_data.car_countdown;
        var domain_priority = domain.find("span.priority_switch");
        console.log("priority " +priority_switch);
        domain_priority.attr("value", priority_switch);
        switch (priority_switch) {
            case 0:
                domain_priority.text("定").removeClass('btn-danger').addClass('btn-warning');
                break;
            case 1:
                domain_priority.text("優").removeClass('btn-warning').addClass('btn-danger');
                break;
        }
    }

    this.FillCalculationContent = FillCalculationContent;
    function FillCalculationContent(table_index, duration) {
        var table_id = '#timing_plan_table' + (table_index + 1);
        var domain = $(table_id);
        var phase_duration_total = [];
        var children = ["red", "green", "yellow"];
        var sum = 0;
        for (var phase_index = 0; phase_index < 6; ++phase_index) {
            sum = 0;
            for (var child_index = 0; child_index < children.length; ++child_index) {
                sum += Math.floor(duration[children[child_index]][phase_index]);
            }
            phase_duration_total[phase_index] = sum;
        }
        FillSequence(domain, phase_duration_total,  1, 6);
        var period = 0
        for (var phase_index = 0; phase_index < 6; ++phase_index) {
            period += phase_duration_total[phase_index];
        }
        FillUnit(domain, period, 7);

    }

    this.FillPlanDetail = FillPlanDetail;
    function FillPlanDetail(table_index, content) {
        var table_id = '#timing_plan_table' + (table_index + 1);
        var domain = $(table_id);
        domain.show();
        FillSequence(domain, content.red   ,  9, 14);
        FillSequence(domain, content.green , 15, 20);
        FillSequence(domain, content.yellow, 21, 26);
        FillSequence(domain, content.green_p      , 27, 32);
        FillSequence(domain, content.green_p_flash, 33, 38);
        FillSequence(domain, content.green_min, 39, 44);
        FillSequence(domain, content.green_max, 45, 50);
        var find_cmd = "option[no=" + content.phase_no + "]";
        domain.find(".phase_list").find(find_cmd).attr("selected", true);
        FillUnit(domain, content.offset, 8);
    }

    this.FillPriorityDetail = FillPriorityDetail;
    function FillPriorityDetail(table_index, content) {
        var table_id = '#timing_plan_table' + (table_index + 1);
        var domain = $(table_id);
        this.FillCheckbox(domain, "pass_east", content.past_east);
        this.FillCheckbox(domain, "pass_west", content.past_west);
        FillSequence(domain, content.percentage_east, 51, 56);
        FillSequence(domain, content.percentage_west, 57, 62);
        FillUnit(domain, content.door_trigger_up, 63);
        FillUnit(domain, content.door_trigger_down, 64);
        FillUnit(domain, content.headway_up, 65);
        FillUnit(domain, content.headway_down, 66);
        FillUnit(domain, content.lowspeed, 67);
    }

    this.FillTableZeor = FillTableZeor;
    function FillTableZeor(table_index) {
        var table_id = '#timing_plan_table' + (table_index + 1);
        var domain = $(table_id);
        for (var cell_index = 1; cell_index <= 50; ++cell_index) {
            FillUnit(domain, 0, cell_index);
        }
    }

    this.FillPhaseList = FillPhaseList;
    function FillPhaseList(phase_list) {
        for (var phase_index = 0; phase_index < phase_list.length; phase_index++) {
            var current_phase = phase_list[phase_index];
//         var hex_name = yourNumber.toString(16);
            var text_find = "<option index=" + phase_index + " no=" + current_phase.no + " total=" + current_phase.total + ">";
            text_find +=  current_phase.no +' '+ current_phase.name + ' 分相數: ' + current_phase.total +  "</option>";
            $("#plan_table").find("select.phase_list").append($(text_find));
        }
    }

    function FillSequence(domain, data, start, end) {
        var data_index = 0;
        for (var phase_index = start; phase_index <= end; ++phase_index) {
            var text_fine = "input[type=number]:eq(" + phase_index + ")";
            domain.find(text_fine).val(data[data_index]);
            ++data_index;
        }
    }
    function FillUnit(domain, data, index) {
        var text_fine = "input[type=number]:eq(" + index + ")";
        domain.find(text_fine).val(data);
    }

    this.FillCheckbox = FillCheckbox;
    function FillCheckbox(domain, label, data) {
//      console.log("fill checkbox" + data);
        for (var index = 0; index < data.length; index++) {
            var text_find = 'tr.' + label + " input[type=checkbox]:eq("+ index +")";
            var checked = $(domain).find(text_find).prop('checked', data[index]);
        }
    }

    this.HideTableAll = HideTableAll;
    function HideTableAll() {
        for (var table_index = 0; table_index < 32; table_index++) {
            var table_id = '#timing_plan_table' + (table_index + 1);
            var domain = $(table_id);
            if (domain.length == 0) continue;
            domain.css("display", "none");
        }
    }

    this.ShowTable = ShowTable;
    function ShowTable(table_index) {
        var table_id = '#timing_plan_table' + (table_index + 1);
        var domain = $(table_id);
        domain.css("display", "");
    }

}

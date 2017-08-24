/**
 * Created by CCT on 2014/4/29.
 */
/**
 * Created by CCT on 2014/4/28.
 */

function DialogueCollector() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        this.json_data = new Object();
        this.current_type;

    }
    this.get_data = get_data;
    function get_data() {
        this.current_type = this.CurrentState();
        this.Mutifunction(this.current_type, this.json_data);
        return this.json_data;
    }

    // Private member ---------------------------------------------------------
    this.CurrentState = CurrentState;
    function CurrentState() {
        return $("div.tool_bar").find("[active='true']").text();
    }

    this.Mutifunction = Mutifunction;
    function Mutifunction(type, json_data) {
        var content = new Object();
        var domain_dialogue = $(".dialogue_input_box");
        switch(type) {
            case "路口":
                json_data.active = "intersection-add";
                json_data.type = "intersection";
                content.intersection_id = domain_dialogue.find("input.int_id").val();
                content.name = domain_dialogue.find("input.int_name").val();
                content.latitude = parseFloat(domain_dialogue.find("td.latitude").html());
                content.longitude = parseFloat(domain_dialogue.find("td.longitude").html());
                http_service.IntersectionCreate(content);
                break;
            case "TC":
                json_data.active = "location-update";
                content.device_type = "tc";
                content.intersection_id = domain_dialogue.find("input.int_id").val();
                content.latitude = parseFloat(domain_dialogue.find("td.latitude").html());
                content.longitude = parseFloat(domain_dialogue.find("td.longitude").html());
                http_service.DeviceCreate(content);
                break;
            case "DSRC":
                json_data.active = "location-update";
                content.device_type = "dsrc";
                content.intersection_id = domain_dialogue.find("input.int_id").val();
                content.latitude = parseFloat(domain_dialogue.find("td.latitude").html());
                content.longitude = parseFloat(domain_dialogue.find("td.longitude").html());
                http_service.DeviceCreate(content);

                break;
            case "GPS":
                json_data.active = "location-update";
                content.device_type = "gps";
                content.intersection_id = domain_dialogue.find("input.int_id").val();
                content.latitude = parseFloat(domain_dialogue.find("td.latitude").html());
                content.longitude = parseFloat(domain_dialogue.find("td.longitude").html());
                http_service.DeviceCreate(content);

                break;
            case "IPC":
                json_data.active = "location-update";
                content.device_type = "ipc";
                content.intersection_id = domain_dialogue.find("input.int_id").val();
                content.latitude = parseFloat(domain_dialogue.find("td.latitude").html());
                content.longitude = parseFloat(domain_dialogue.find("td.longitude").html());
                http_service.DeviceCreate(content);

                break;
        }
        // prepare data for submit to server
        json_data.FunctionNo = "device_manager";
        json_data.MsgTypeNo = "update";
        json_data.content = content;
        // device_manager/sub_page/dialogue_avi.html


    }


}

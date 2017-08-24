/**
 * Created by CCT on 2014/4/28.
 */

function MultifunctionManager() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        this.type_data = new Object();
        this.current_type;

    }
    this.get_image_path = get_image_path;
    function get_image_path() {
        this.current_type = this.CurrentState();
        this.Mutifunction(this.current_type, this.type_data);
        return this.type_data.image_path;
    }
    this.get_dialogue_path = get_dialogue_path;
    function get_dialogue_path() {
        this.current_type = this.CurrentState();
        this.Mutifunction(this.current_type, this.type_data);
        return this.type_data.dialoque_path;
    }

    // Private member ---------------------------------------------------------
    this.CurrentState = CurrentState;
    function CurrentState() {
        return $("div.tool_bar").find("[active='true']").text();
    }

    this.Mutifunction = Mutifunction;
    function Mutifunction(type, type_data) {
        var image_path, dialoque_path;
        switch(type) {
            case "路口":
                image_path = "intersection.png"
                dialoque_path = "device_manager/sub_page/dialogue_intersection.html";
                break;
            case "TC":
                image_path = "tc-disconnect.png"
                dialoque_path = "device_manager/sub_page/dialogue_device.html";
                break;
            case "DSRC":
                image_path = "dsrc-disconnect.png"
                dialoque_path = "device_manager/sub_page/dialogue_device.html";
                break;
            case "GPS":
                image_path = "gps-disconnect.png"
                dialoque_path = "device_manager/sub_page/dialogue_device.html";
                break;
            case "IPC":
                image_path = "ipc-disconnect.png"
                dialoque_path = "device_manager/sub_page/dialogue_device.html";
                break;
            default:
                console.log('multi-function type not found: ', type);
        }
        type_data.image_path = "device_manager/image/" + image_path;
        type_data.dialoque_path = dialoque_path;
        // device_manager/sub_page/dialogue_avi.html


    }


}

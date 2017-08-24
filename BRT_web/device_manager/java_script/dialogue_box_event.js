/**
 * Created by hong on 2014/4/12.
 */
function DialogueBoxEvent() {
// Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        function StructAvi(address, latitude, longitude) {
            this.address = address;
            this.latitude = latitude;
            this.longitude = longitude;
        }
        this.avi_data = new StructAvi(0, 0, 0);
    }
    this.set_collect = set_collect;
    function set_collect(collect) {
        this.collect = collect;
    }
    this.set_map_draw = set_map_draw;
    function set_map_draw(map_draw) {
        this.map_draw = map_draw;
    }
    this.Bind = Bind;
    function Bind() {
        this.SubmitListener(this.collect);
        this.CancelListener(this.map_draw);
    }
    this.Unbind = Unbind;
    function Unbind() {
        var domain = $(".accident_input_box").find("button");
        domain.unbind("click");
    }
// Private member ---------------------------------------------------------
    this.SubmitListener = SubmitListener;
    function SubmitListener(collect) {
        function Submit() {
            // collect information ftom dialogue box
            var domain_dialogue = $(".dialogue_input_box");
            var json_data = collect.get_data();
            console.log("Send to server: ", JSON.stringify(json_data));
            domain_dialogue.remove();
        }
        var domain = $(".dialogue_input_box").find("button.submit");
        domain.bind("click", Submit);
    }
    this.CancelListener = CancelListener;
    function CancelListener(map_draw) {
        function Cancel() {
            $(".dialogue_input_box").remove();
            map_draw.Pop();
        }
        var domain = $(".dialogue_input_box").find("button.cancel");
        domain.bind("click", Cancel);
    }

}

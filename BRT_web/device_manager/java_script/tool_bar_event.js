/**
 * Created by hong on 2014/4/26.
 */
function ToolBarEvent() {
    // Public member ----------------------------------------------------------

    this.set_google_map = set_google_map;
    function set_google_map(google_map) {
        this.google_map = google_map;
    }
   this.set_multifunction = set_multifunction;
   function set_multifunction(multifunction) {
      this.multifunction = multifunction;
   }
   this.Bind = Bind;
   function Bind() {
      this.BindButton(this.google_map, this.multifunction);
   }
    // Private member ---------------------------------------------------------
    this.BindButton = BindButton;
    function BindButton(google_map, multifunction) {
        $("div.tool_bar").find("div").bind("click", {google_map:google_map, multifunction:multifunction} ,ActiveButton);

    }
    function ActiveButton(event) {
        var target = $(event.currentTarget);
        // remove active event before this click
        target.parent().find("[active='true']").css("color", "white");
        target.parent().find("[active='true']").attr("active", "false");
        target.parent().find(".active").removeClass("active");

        target.css("color", "blue");
        target.attr("active", "true");
       var image_path = event.data.multifunction.get_image_path();
        var cursor = "url(" + image_path + ") 16 16, move";
        event.data.google_map.setOptions({ draggableCursor: cursor });


    }

}
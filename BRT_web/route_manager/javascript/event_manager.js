/**
 * Created by hong on 2014/4/17.
 */

function EventManager() {
    // Public member ----------------------------------------------------------
    this.set_data_manager = set_data_manager;
    function set_data_manager(data_manager) {
        this.data_manager = data_manager;
    }
    this.Bind = Bind;
    function Bind() {
        this.ListenSectionNumber(this.data_manager);
        this.ListenColor();

    }
    // Private member ----------------------------------------------------------
    this.ListenSectionNumber = ListenSectionNumber;
    function ListenSectionNumber(data_manager) {
        var domain = $("form.add_route").find("input.section_number");
        domain.bind("change",{manager: data_manager} ,ChangeSectionNumber);

    }
    function ChangeSectionNumber(event) {
        var domain_nsection = $("form.add_route").find("input.section_number");
        var section_number = domain_nsection.val();
//        console.log(value);
        var route_manager = new RouteMapManager();
        route_manager.RouteMap(section_number);
        var domain_color = $("form.add_route").find("input.color");
        var color = domain_color.val();
        $(".fill").css("background-color", color);
        event.data.manager.SectionList();


    }
    this.ListenColor = ListenColor;
    function ListenColor() {
        var domain = $("form.add_route").find("input.color");
        domain.bind("change", ChangeColor);

    }
    function ChangeColor() {
        var domain = $("form.add_route").find("input.color");
        var color = domain.val();
        $(".fill").css("background-color", color);
        console.log(color);
//        var route_manager = new RouteMapManager();
//        route_manager.RouteMap(section_number);

    }

}



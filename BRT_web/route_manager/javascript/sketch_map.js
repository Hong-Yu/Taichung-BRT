/**
 * Created by CCT on 2014/3/18.
 */
function SketchMap() {
    // Public member ----------------------------------------------------------
    this.Append = Append;
    function Append(section_total) {
        return this.AppendForm(section_total);

    }
    // Private member ----------------------------------------------------------
    this.AppendForm = AppendForm;
    function AppendForm(section_total) {
        var str_html = "";
        str_html += this.StartingPoint();
        for (var road_index = 0; road_index < section_total; ++road_index) {
            var remainder = (road_index + 1) % 12;
            if (remainder == 0) remainder = 12;
            if (remainder <= 6) {
                str_html += AppendCrossroad(0, "left");
                if (remainder == 6) str_html += AppendRightSide();
            } else {
                str_html += AppendCrossroad(0, "right");
                if (remainder == 12) str_html += AppendLeftSide();

            }
        }
        var direction = ["right", "left"];
        var direction_index = Math.floor(section_total/6) % 2;
        str_html += AppendCrossroadEnd(0, direction[direction_index]);
        str_html += "</div>";
        return str_html;

    }
    function AppendCrossroad(road_index, type) {
        var arrow_direction = (type == "left" ? "right" : "left");
        var crossroad="";
        crossroad += "<div class=\"width_100 float_" + type + "\">";
        crossroad += "<div class=\"height_30 sfont relative crossroad_title\" style='height:30px;'><\/div>";
//      crossroad += "<div class=''><spqn style='height:10px;padding:0px;'>555</spqn><\/div>";
        crossroad += "<div class=\"height_10 fill relative\">";
        crossroad += "<div class=\"icon_arrow_" + arrow_direction + "\"><\/div>";
        crossroad += "<\/div>";
        crossroad += "<div class=\" crossroad_div\" >";
        crossroad += "<select class=\"crossroad_select\">";
//      crossroad += "<option selected=\"selected\">1<\/option>";
        crossroad += "<\/select>";
        crossroad += "<\/div>";
        crossroad += "<\/div>";
        return crossroad;

    }

    function AppendCrossroadEnd(road_index, direction) {

        var crossroad="";

        switch(direction) {
            case "right":
                crossroad += Right("left");
                break;
            case "left":
                crossroad += Left("right");
                break;
        }
        return crossroad;

        function Right(type) {
            var crossroad="";
            crossroad += "<div class=\"width_100 float_" + type + "\" style='width:8px;'> ";
            crossroad += "<div class=\"height_30 sfont relative\"><\/div>";
            crossroad += "<div class=\"height_10 fill relative\">";
            crossroad += "<div class='icon_terminal'><\/div>";
            crossroad += "<\/div>";
            crossroad += "<div class=\" crossroad_div\" >";
//           crossroad += "<select class=\"crossroad_select\">";
//           crossroad += "<option selected=\"selected\">1<\/option>";
//           crossroad += "<option>2<\/option>";
//           crossroad += "<option>9999<\/option>";
//           crossroad += "<\/select>";
            crossroad += "<\/div>";
            crossroad += "<\/div>";
            return crossroad;
        }
        function Left(type) {
            var crossroad="";
            crossroad += "<div class=\"width_100 float_" + type + "\" > ";
            crossroad += "<div class=\"height_30 sfont relative\"><\/div>";
            crossroad += "<div class=\"height_10 fill relative\">";
            crossroad += "<div class='icon_terminal'><\/div>";
            crossroad += "<\/div>";
            crossroad += "<div class=\" crossroad_div\" >";
//           crossroad += "<select class=\"crossroad_select\">";
//           crossroad += "<option selected=\"selected\">1<\/option>";
//           crossroad += "<option>2<\/option>";
//           crossroad += "<option>9999<\/option>";
//           crossroad += "<\/select>";
            crossroad += "<\/div>";
            crossroad += "<\/div>";
            return crossroad;
        }
    }

    function AppendRightSide() {
        var side_right="";
        side_right += "<div class=\"width_8 float_left\">";
        side_right += "<div class=\"height_30\" style='height:30px;'><\/div>";
        side_right += "<div class=\"height_10 \"><\/div>";
        side_right += DottedSide(4);

//      side_right += "<div class=\"height_80 fill\" style='height:90px;'><\/div>";
        side_right += "<\/div>";
        side_right += "<div class=\"clear\"><\/div>";
        side_right += "<div class=\"width_8 float_right\">";
        side_right += DottedSide(1);
        side_right += "<div class=\"dotted_side \"><\/div>";

//      side_right += "<div class=\"height_30 fill\"><\/div>";
//      side_right += "<div class=\"height_10 \"><\/div>";
//      side_right += "<div class=\"height_10 fill\"><\/div>";
//      side_right += "<div class=\"height_80\"><\/div>";
        side_right += "<\/div>";
        return side_right;
    }

    function AppendLeftSide() {
        var side_left="";

        side_left += "<div class=\"width_100 float_right\" style='width:92px;'>";
        side_left += "<div class=\"height_30\"><\/div>";
        side_left += "<div class=\"height_10 fill\"><\/div>";
        side_left += "<div class=\"height_80\"><\/div>";
        side_left += "<\/div>";
        side_left += "<div class=\"width_8 float_right\" >";
        side_left += "<div class=\"height_30\"><\/div>";
        side_left += "<div class=\"height_10 \"><\/div>";
        side_left += DottedSide(4);
//      side_left += "<div class=\"height_10 fill\"><\/div>";
//      side_left += "<div class=\"height_80 fill\"><\/div>";
        side_left += "<\/div>";
        side_left += "<div class=\"clear\"><\/div>";
        side_left += "<div class=\"width_8 float_left\">";
        side_left += DottedSide(1);
        side_left += "<div class=\"dotted_side \"><\/div>";
//      side_left += "<div class=\"height_30 fill\"><\/div>";
//      side_left += "<div class=\"height_10 fill\"><\/div>";
//      side_left += "<div class=\"height_80\"><\/div>";
        side_left += "<\/div>";
        side_left += "<div class=\"width_100 float_left\" style='width:92px;'>";
        side_left += "<div class=\"height_30\"><\/div>";
        side_left += "<div class=\"height_10 fill\"><\/div>";
        side_left += "<\/div>";
        return side_left;

    }

    function DottedSide(number) {
        var html = "";
        while (number--) {
            html += "<div class=\"dotted_side \"><\/div>";
            html += "<div class=\"height_10 \"><\/div>";
        }
        return html;
    }
    this.StartingPoint = StartingPoint;
    function StartingPoint() {
        var str_html="";
        str_html += "<div class=\"width_100 float_left\">";
        str_html += "<div class=\"height_30 sfont relative\">火車站<\/div>";
        str_html += "<div class=\"height_10 fill relative\">";
        str_html += "<div class=\"icon_terminal\"><\/div>";
        str_html += "<\/div>";
        str_html += "<div class=\"height_80 relative\">";
        str_html += "<div class=\"stopName\"><span class=\"center\">公車起始站<\/span><\/div>";
        str_html += "<\/div>";
        str_html += "<\/div>";
        return str_html;


    }


}

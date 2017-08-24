/**
 * Created by CCT on 2014/5/21.
 */
function AnimateProgressBar() {
// Public member ----------------------------------------------------------
    this.Reset = Reset;
    function Reset(message_max) {
        this.message_max = message_max;
        this.row_index = 0;
        this.progress_bar = $('#centerview').find("div.progress-striped");
        this.progress_bar.empty();
        var html = '<option>Waiting To Connect to Server ...</option>';
        $('#centerview').find("select.form-control").empty().append(html);
    }
    this.Touch = Touch;
    function Touch(input_data, type) {
        this.row_index++;
        CommunicateInformation(input_data, this.message_max, this.row_index, type);
        ProgressBar(this.progress_bar, this.message_max, this.row_index, type);

    }
// Private member ----------------------------------------------------------


    function CommunicateInformation(input_data, message_max, line_index, type) {
//        CommunicateInformation.line_index = CommunicateInformation.line_index || 1;
//        var line_index = CommunicateInformation.line_index;
        var text_area = $('#centerview').find("select.form-control");
        text_area.find("option").removeAttr( "selected" );
        if (type == 'success') {
            var text_comm = "<option class='success' selected='selected'> "+ line_index +"/"+ message_max +"  "+ input_data.CommandContents +"</option>";
        } else {
            var text_comm = "<option class='error' selected='selected'> "+ line_index +"/"+ message_max +"  "+ input_data.ErrororCode +"</option>";
//            var text_comm = "<option class='error' selected='selected'>"+ line_index +" "+ input_data.ErrororCode +"</option>";
        }
        text_area.append(text_comm);
        $('select.form-control').scrollTop((line_index - 3) * 20);
        CommunicateInformation.line_index++;
    }

    function ProgressBar(progress_bar, message_max, row_index, type) {
        //        console.log(this.message_max + "  " + this.row_index);
        var html = '';
        switch(type) {
            case 'success':
                html = '<div class="bar bar-success" ></div>';
                break;
            case 'error':
                html = '<div class="bar bar-danger" ></div>';
                break;
        }
        var percentage = 100/message_max + "%";
        progress_bar.append(html);
        var slice_index = row_index - 1;
        var slice = progress_bar[0].getElementsByTagName('div')[slice_index];
//        console.log(" ", slice, "percentage: ", percentage);
        $(slice).animate({
            width: percentage
        },100);

    }

}

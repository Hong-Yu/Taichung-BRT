function Query() {
	this.Initialize = Initialize;

	function Initialize() {
		$('#current_section').empty();
         $('#current_section').text('目前所選設備編號: '+2001);
	}
	this.set_web_socket = set_web_socket;

	function set_web_socket(web_socket) {
		this.web_socket = web_socket;
	}
	this.Listen = Listen;

	function Listen() {
		ListenSelect(this.web_socket);
		ListenClean();
	}

	function ListenSelect(web_socket) {
		var btn = $('#question_area :button');
		btn.click(function() {
		var equipment_id = $("div.intersection select").find("option:selected").attr("mark");
			var type = this.value;
			var fun_no, msg_no;
			var query_data = {};
			switch (type) {
				case '0F45':
					fun_no = '0F';
					msg_no = '45';
					break;
				case '0F42':
					fun_no = '0F';
					msg_no = '42';
					break;
				case '0F44':
					fun_no = '0F';
					msg_no = '44';
					break;
				case '5F40':
					fun_no = '5F';
					msg_no = '40';
					break;
				case '0F43':
					fun_no = '0F';
					msg_no = '43';
					break;
				case '0F40':
					fun_no = '0F';
					msg_no = '40';
					query_data.EquipmentNo = 0;
					break;
				case '5045':
					fun_no = '50';
					msg_no = '45';
					break;
				case '5044':
					fun_no = '50';
					msg_no = '44';
					break;
				case '5F6F-1':
					fun_no = '5F';
					msg_no = '6F';
					query_data.TransmitType = 1;
					break;
				case '5F6F-2':
					fun_no = '5F';
					msg_no = '6F';
					query_data.TransmitType = 2;
					break;
				default:
					console.log('query btn get error.');
					break;
			}
			query_data.FunctionNo = fun_no;
			query_data.MsgTypeNo = msg_no;
			query_data.MsgTime = GetCurrentTime();
			query_data.LCN = equipment_id;
			// console.log(JSON.stringify(query_data));
			// var json = JSON.stringify(query_data);
			web_socket.Send(query_data);
		});
	}

	function ListenClean(){
		$('#clean_result').click(function(){
			$('#query_result').empty();
		});
	}

	function GetCurrentTime() {
		var d = new Date();
		var output = d.getFullYear() + '-' + Makeup(d.getMonth() + 1) + '-';
		output += Makeup(d.getDate()) + " " + Makeup(d.getHours()) + ":";
		output += Makeup(d.getMinutes()) + ":" + Makeup(d.getSeconds());
		return output;

		function Makeup(value) {
			var value = (value < 10 ? '0' : '') + value;
			return value;

		}
	}
}
// 萬年曆公式
var getYearFirstDate=function(y,m,d){
	var a1,a2;
	a2=numbersOfMonth(y,m);

	// 防呆
	if(y<=0 || m<=0 || d<=0 || d>a2 || m>12) throw('數字有誤!');

	var W=[6, 2, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
	var y, m, d, w;
	w=W[m-1]+y+parseInt(y/4)-parseInt(y/100)+parseInt(y/400);

	/*
	console.log(
		W[m-1],
		y,
		parseInt(y/4),
		parseInt(y/100),
		parseInt(y/400)
	);
	*/

	if( (parseInt(y%4)==0) && (m<3) ){
		w--;
		if(parseInt(y%100)==0) w++;
		if(parseInt(y%400)==0) w--;
	};

	a1=parseInt((w+d)%7)

	//console.log( '此日為星期幾?( 1~6：周一 ~ 周六、0：日 )->', a1 );
	//console.log( '此月計天數共?', a2 );

	return { firstDay:a1 , monthDays:a2 };
};

// 求出當前月天數
function numbersOfMonth(year,month){
	var numberDays=new Array(31,28,31,30,31,30,31,31,30,31,30,31);

	/* 閏年部分的修改天數 */
	if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) numberDays[1] = 29;

	var n=numberDays[month-1];		// m1->0, m12->11

	return n;
}
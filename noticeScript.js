async function updateNotice(){
  	var DataFrame = dfjs.DataFrame;
  
	let temp = [];
  	const NOTICE_URL = 'https://docs.google.com/spreadsheets/d/1LkhhtJj1M-6rQ2aBEsI6UXIu0ZVJ8AlDS2yDNTfAvfQ/export?format=csv';
  
	await DataFrame.fromCSV(NOTICE_URL).then(df => {
	temp = df.toCollection();
	});
	
	
	const LATEST_NOTICE = temp[0]["공지사항"];
	document.getElementById('notice').innerHTML = "<b>"+LATEST_NOTICE+"</b>";
}

//마커 및 정보창 생성
window.addEventListener('DOMContentLoaded', updateNotice);


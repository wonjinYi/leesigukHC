async function updateNotice(){
  	var DataFrame = dfjs.DataFrame;
	
	//for assigning ONLY THE latest notice
	let notice;
	
	//for assigning every notices
	//let notice = [];
	

	const NOTICE_URL = 'https://spreadsheets.google.com/feeds/list/1LkhhtJj1M-6rQ2aBEsI6UXIu0ZVJ8AlDS2yDNTfAvfQ/1/public/full?alt=json';
  	console.log("AAAAAA");
	
	var request = new XMLHttpRequest();
	request.open('GET', NOTICE_URL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		
		//////////////////////////////////////
		//for assigning ONLY THE latest notice
		var temp = request.response;
		notice = temp['feed']['entry'][0].gsx$공지사항.$t;
		//console.log(notice);
		document.getElementById('notice').innerHTML = "<b>"+notice+"</b>";
		//////////////////////////////////////
		
		
		/////////////////////////////
		//for assigning every notices 
		/*
		temp = temp['feed']['entry'];
		for(var i=0; i<Object.keys(temp).length; i++){
			notice[i] = temp[i].gsx$공지사항.$t
		}
		console.log(notice);
		*/
		/////////////////////////////
		
	}
}

//마커 및 정보창 생성
window.addEventListener('DOMContentLoaded', updateNotice);
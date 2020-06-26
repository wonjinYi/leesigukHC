//let DATA = [];
 
window.addEventListener('DOMContentLoaded', makeMarker);
async function makeMarker(){
	//let DATA=[];
	const SOURCE={
			'HCC_SOURCE':'https://spreadsheets.google.com/feeds/list/1G6WfRePThxwTO6hCypL2Jr2jxQoVSXbUVY7wqVp0iQE/1/public/full?alt=json'
			, 'HOSPITAL_SOURCE':'https://spreadsheets.google.com/feeds/list/1JRMu2YDemwclWB1cB7fPJmboVnEp2EmzcT6W2eoO4Gg/1/public/full?alt=json'
		}
	const COL = ['기관명', '기관유형', '대표전화번호', '일반용가격', '일반용시행', '주소', '시도', 'latitude', 'longitude'];
		
	let temp=[];
	let DATA=[];
	
	temp[0] = await makeArrayFromJson(SOURCE['HCC_SOURCE'], COL);
	temp[1] = await makeArrayFromJson(SOURCE['HOSPITAL_SOURCE'], COL);

	console.log(temp)
	DATA = temp[0].concat(temp[1]);
	console.log(DATA);
	
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	// 마커 및 정보창 생성
	let marker = [];
	let infoWindow = [];
	let contentString = [];

	for(let i=0; i<Object.keys(DATA).length; i++){
		//마커 생성
		marker[i] = new naver.maps.Marker({
		  position: new naver.maps.LatLng(DATA[i]['latitude'], DATA[i]['longitude']),
		  map: map,
		  icon: {
			url : "res/" + selectMarkerType(DATA[i]['일반용시행'], DATA[i]['기관유형']),
			size: new naver.maps.Size(25, 39),
			origin: new naver.maps.Point(0, 0),
		  }
		});

		//정보창 생성
		var infoMapURL;
		if(window.innerWidth<769){
			infoMapURL = 'https://m.map.naver.com/search2/search.nhn?query=' + DATA[i]["기관명"]+'&sm=hty&style=v5';
		}
		else{
			infoMapURL = 'https://map.naver.com/v5/search/' + DATA[i]["기관명"];
		}

		contentString = [
		  '<div style="padding:10px; text-align:left; color:#262626;">',
		  '   <a style="display:inline; text-decoration: none; font-size:20px; color:#262626;" href="'
				  +infoMapURL+'" target="_blank"> <strong>'+DATA[i]["기관명"]+' </strong> </a>',
		  '   <h3 style="display:inline; text-align:center; color:#EB5757;">'+isWorking(DATA[i]['일반용시행'])+'</h3><br />',
		  '   <hr color="#727272">',
		  '   <p style="margin:0;">',
		  '       전화번호 : '+DATA[i]['대표전화번호']+'<br />',
		  '       주소 : '+DATA[i]['주소']+'<br />',
		  '       가격 : '+isNull(DATA[i]['일반용가격']),
		  '   </p>',
		  '</div>'
		].join('');

		infoWindow[i] = new naver.maps.InfoWindow({
		  content: contentString,
		  maxWidth:(document.getElementById('map').style.width - 10 ),
		  backgroundColor: "rgba(255,255,255,0.6)",
		  borderColor: "#727272",
		  borderWidth: 2,
		  anchorSize: new naver.maps.Size(0, 0),
		  pixelOffset: new naver.maps.Point(0, -10)
		});


		naver.maps.Event.addListener(marker[i], "click", function(e) {
		  if (infoWindow[i].getMap()) {
			  infoWindow[i].close();
		  } else {
			  infoWindow[i].open(map, marker[i]);
		  }
		});

	}
	
}


//데이터 받아오기
async function makeArrayFromJson(url, columns){

	const res = await fetch(url);
  	let temp = await res.json();
 	temp = temp['feed']['entry'];
	
	let _DATA = [];
	for(var i=0; i<Object.keys(temp).length; i++){
		//var keystr = name+'_'+i;
		_DATA[i]={};
		for(var k=0; k<Object.keys(columns).length; k++){
			_DATA[i][columns[k]] = temp[i]['gsx$'+columns[k]]['$t'];
		}
	}
	console.log(_DATA);
	
	return _DATA;
}

function isNull(str){
  if(str===''){return "정보가 없습니다";}
  else{return str;}
}

function isWorking(isIssuing){
  if(isIssuing=="FALSE"){return " < 발급업무 중단 >";}
  else {return '';}
}

function selectMarkerType(isIssuing, type){
  if(isIssuing=="FALSE"){return "marker_grey.png";}
  else if(type=="보건소" || type=="보건지소"){return "marker_blue.png";}
  else if(type=="민간병원" || type=="종합병원" || type=="의원"){return "marker_green.png";}
}

// #######################################################################################################################
// #######################################################################################################################
// #######################################################################################################################

// 네이버 맵 생성
var mapOptions = {
    center: new naver.maps.LatLng(36.583853, 128.119446),
    zoom: 7
};
let map = new naver.maps.Map('map', mapOptions);

// 네이버 맵 크기조정
window.addEventListener('DOMContentLoaded', function(){
	resize();
	window.addEventListener('resize', resize);
});


function resize(){
	var mapWidth = window.innerWidth;
	var mapHeight = window.innerHeight - document.getElementById('appHead').offsetHeight;
	//var mapHeight = window.innerHeight - document.getElementById('appHead').offsetHeight - document.getElementById('appFooter').offsetHeight;
	var Size = new naver.maps.Size(mapWidth, mapHeight);
	map.setSize(Size);
}

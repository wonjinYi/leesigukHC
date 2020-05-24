async function makeMarker(){
  // csv파일 받아와 dictionary로 변환
  var DataFrame = dfjs.DataFrame;
  
  let temp = [];
  const HCC_SOURCE_URL = 'https://docs.google.com/spreadsheets/d/1G6WfRePThxwTO6hCypL2Jr2jxQoVSXbUVY7wqVp0iQE/export?format=csv';
  const HOSPITAL_SOURCE_URL = 'https://docs.google.com/spreadsheets/d/1JRMu2YDemwclWB1cB7fPJmboVnEp2EmzcT6W2eoO4Gg/export?format=csv';
  
  await DataFrame.fromCSV(HCC_SOURCE_URL).then(df => {
    temp[0] = df.toCollection();
  });
  await DataFrame.fromCSV(HOSPITAL_SOURCE_URL).then(df => {
    temp[1] = df.toCollection();
  });
  const DATA = temp[0].concat(temp[1]);

  // 마커 및 정보창 생성
  let marker = [];
  let infoWindow = [];
  let contentString = [];

  for(let i=0; i<Object.keys(DATA).length; i++){
    //마커 생성
    marker[i] = new naver.maps.Marker({
      position: new naver.maps.LatLng(DATA[i]['Latitude'], DATA[i]['Longitude']),
      map: map,
      icon: {
        url : "res/" + selectMarkerType(DATA[i]['일반용시행'], DATA[i]['기관유형']),
        size: new naver.maps.Size(25, 39),
        origin: new naver.maps.Point(0, 0),
      }
    });

    //정보창 생성
    var infoMapURL = 'https://map.naver.com/v5/search/' + DATA[i]["기관명"];
    //var infoMapURL = 'https://m.map.naver.com/search2/search.nhn?query=' + DATA[i]["기관명"]+'&sm=hty&style=v5';
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
  else if(type=="보건소"){return "marker_blue.png";}
  else if(type=="민간병원"){return "marker_green.png";}
}

// #######################################################################################################################
// #######################################################################################################################
// #######################################################################################################################

// 네이버 맵 생성
var mapOptions = {
    center: new naver.maps.LatLng(37.550179, 127.073627),
    zoom: 12
};
let map = new naver.maps.Map('map', mapOptions);

// 네이버 맵 크기조정
window.addEventListener('DOMContentLoaded', function(){
	resize();
	window.addEventListener('resize', resize);
});


function resize(){
	var mapWidth = window.innerWidth;
	var mapHeight = window.innerHeight - document.getElementById('appHead').offsetHeight - document.getElementById('appFooter').offsetHeight;
	var Size = new naver.maps.Size(mapWidth, mapHeight);
	map.setSize(Size);
}
						
//마커 및 정보창 생성
makeMarker();

//지역선택창 만들기



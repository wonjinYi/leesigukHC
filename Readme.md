LeesigukHC
![leesiguklogo](./res/logo.png)

# 라이센스와 적용범위
license.md의 내용대로 BOB Please License를 적용합니다.
적용 대상은 해당 repository에 있는 모든 리소스입니다.
라이센스를 정상적으로 적용하지 않을시, 모든 민형사적 법적조치가 취해지지는 않으니 안심하셔도 됩니다.
별도 협의없이 어떤 형태로든 변형해도 되고, 어떤 일이든 사용하셔도 됩니다.

# 개발목적
코로나19 대응에 따라 일부 보건소 민원업무의 일부 또는 전부가 중단되었습니다. 이에 따라 건강진단결과서(구 보건증)를 받고자 하는 사람은, 보건소에서 건강진단결과서 발급을 대행토록 한 민간 병/의원에서 검사를 받아야 합니다.

여기에는 다음과 같은 문제가 있습니다.
1. 민원인의 정보 부족으로 위치와 가격정보 비교 불가
2. 보건소 및 관할 시군구청의 공지정보 자체의 파편화 및 양식/형태의 차이 발생
3. 보건소 일부(또는 전부) 업무 중단사실 자체의 홍보부족

코로나로 보건소 업무가 중단된 동안 위 문제를 해결하여, 건강진단결과서를 필요로 하는 사람들에게 도움이 되고자 합니다.

# 구축 데이터

한계 : 유흥용이 아닌 일반용(일반요식업 및 단체급식용)만을 대상으로 조사하였습니다.
유흥용 건강진단결과서에 대한 정보 얻기가 상당히 어려워 일단 보류하였습니다.

두 세트의 데이터를 지속적으로 구축 및 수정하고 있습니다.
각 데이터는 시도별로 시트를 분리하였습니다.
(2020.06.14 현재 서울 완전구축, 인천/성남/대구 부분구축, 대구 구축 기초작업중)

여기서 '기관유형'은 아직 완벽히 작성되지 않아, 수정예정입니다.
1. 보건소 현황 : 시도, 시군구, 대표전화번호, 기관유형, 기관명, 주소, 위도, 경도, 일반용시행, 일반용가격, 시행판단근거
> https://docs.google.com/spreadsheets/d/1G6WfRePThxwTO6hCypL2Jr2jxQoVSXbUVY7wqVp0iQE/edit?usp=sharing

2. 건강진단결과서 발급 가능 민간의료기관 현황 : 시도, 시군구, 대표전화번호, 기관유형, 기고나명, 주소, 위도, 경고, 일반용시행, 일반용가격
> https://docs.google.com/spreadsheets/d/1JRMu2YDemwclWB1cB7fPJmboVnEp2EmzcT6W2eoO4Gg/edit?usp=sharing

위 데이터는 "기초 데이터"를 기반으로 정리, 수정, 가공 및 추가수집(검색, 전화문의, 온라인문의 등)과정을 거쳐 구축하였습니다. 별도 협의없이 어떤 형태로든 변형해도 되고, 어떤 일이든 사용하셔도 됩니다.

# 기초 데이터
1. 보건복지부 전국보건소 현황
> http://www.mohw.go.kr/react/gm/sgm0601vw.jsp?PAR_MENU_ID=13&MENU_ID=1304020502&page=1&CONT_SEQ=293042

2. 각 지역 관할 보건소의 '보건증 발급가능 민간의료기관 안내'
> "구축 데이터"의 1번 "보건소 현황"의 "근거"컬럼 등

# 사용한 오픈소스프로젝트 / 서비스 / 기타 리소스
* dataframe-js (MIT Lisence, Copyright (c) 2016 Guillaume Mousnier)
> https://www.npmjs.com/package/dataframe-js 
구글 스프레드 시트에서 추출된 csv를 지도작업에 알맞게 가공하는데 사용하였음

* NAVER Maps API 
> https://navermaps.github.io/maps.js.ncp/
지도 표시에 사용하였음

* Google SpreadsSheet 
> https://www.google.com/intl/ko_kr/sheets/about/
구축된 데이터를 웹서비스에서 사용하고 공유가 용이하도록 사실상의 DB로 활용하였음

* 배달의 민족 주아 글꼴
> http://font.woowahan.com/jua/
로고에 사용한 폰트입니다

* 나눔고딕 웹폰트
> https://fonts.google.com/specimen/Nanum+Gothic
페이지 전체에 사용한 폰트입니다.

* 로고 및 마커 이미지
> https://pixabay.com/images/id-1337908/
로고에 마커+문서 이미지, 지도 마커에 마커 이미지를 사용하였습니다.

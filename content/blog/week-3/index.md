---
title: STEP1 Twitter API를 이용하여, 지하철 정보 수집하기
date: "2023-01-24T14:12:03.284Z"
description: "Twitter API를 활용하여 간단한 파이프라인 만들어보기 PROJ"
tags:
  - Twitter API
---

# 1. 프로젝트 목적

데이터 ETL 프로젝트를 구현해나가며, 흔히 사용하는 Tool들의 기능 및 목적을 공부하기 위해, 간단한 파이프라인을 설계하여, 함께 공부해보고자 한다

> 간단한 프로젝트지만, 목적성이 있으면 하여, 일상에서 밀접한 context를 주제로 선정하기로 했다.
> 최근 시위 및 사고, 지연 등으로 열차가 지연되는 사례가 잦아, 실시간 트윗들을 대시보드 형태로 시각화해주는 것은 어떨까

# 2. 데이터 수집하기

## 지하철 역 정보 크롤링

```python
import requests
from bs4 import BeautifulSoup
from html_table_parser import parser_functions
import pandas as pd

req = requests.get("https://ko.wikipedia.org/wiki/%EC%88%98%EB%8F%84%EA%B6%8C_%EC%A0%84%EC%B2%A0%EC%97%AD_%EB%AA%A9%EB%A1%9D")
soup = BeautifulSoup(req.text, 'html.parser')
tables = soup.find_all("table", {'class': "wikitable"})

stations_list = []
for data in tables:
    table = parser_functions.make2d(data)
    df = pd.DataFrame(data = table[1:], columns= table[0])
    for station in df['철도역']:
        stations_list.append(station)
stations_list
```

```python
for i, station in enumerate(stations_list):
    stations_text = ""
    if i % 25:
        stations_text += station + "역 OR "
# 역 리스트 n size chunk로 분할하기
def divide_chunks(l, n):
    total = []
    for i in range(0, len(l), n):
        total.append(l[i:i + n])
    return total

# 역 40개씩 총 Rule 20개로 split하기
num = 0
for chunk in divide_chunks(stations_list, 40):
    num += 1
    stations_text = ""
    for station in chunk:
        stations_text += station + "역 OR "
    print(num, stations_text[:-4])
```

<details>
<summary>수집한 전체 역명 모음.zip</summary>
<div markdown="1">       
가능역 OR 가락시장역 OR 가락시장역 OR 가산디지털단지역 OR 가산디지털단지역 OR 가양역 OR 가오리역 OR 가재울역 OR 가정역 OR 가정중앙시장역 OR 가좌역 OR 가천대역 OR 가평역 OR 간석역 OR 간석오거리역 OR 갈매역 OR 갈산역 OR 강남역 OR 강남역 OR 강남구청역 OR 강남구청역 OR 강남대역 OR 강동역 OR 강동구청역 OR 강매역 OR 강변역 OR 강일역 OR 강촌역 OR 개롱역 OR 개봉역 OR 개포동역 OR 개화역 OR 개화산역 OR 거여역 OR 건대입구역 OR 건대입구역 OR 걸포북변역 OR 검단사거리역 OR 검단오류역 OR 검바위역 OR 검암역 OR 검암역 OR 경기광주역 OR 경기도청북부청사역 OR 경마공원역 OR 경복궁역 OR 경인교대입구역 OR 경전철의정부역 OR 경찰병원역 OR 계산역 OR 계양역 OR 계양역 OR 고덕역 OR 고려대역 OR 고색역 OR 고속터미널역 OR 고속터미널역 OR 고속터미널역 OR 고잔역 OR 고잔역 OR 고진역 OR 고촌역 OR 곡산역 OR 곤제역 OR 곤지암역 OR 공덕역 OR 공덕역 OR 공덕역 OR 공덕역 OR 공릉역 OR 공항시장역 OR 공항화물청사역 OR 과천역 OR 관악역 OR 관악산역 OR 광교역 OR 광교중앙역 OR 광나루역 OR 광명역 OR 광명사거리역 OR 광운대역 OR 광운대역 OR 광화문역 OR 광흥창역 OR 교대역 OR 교대역 OR 구래역 OR 구로역 OR 구로디지털단지역 OR 구룡역 OR 구리역 OR 구반포역 OR 구산역 OR 구성역 OR 구의역 OR 구일역 OR 구파발역 OR 국수역 OR 국제업무지구역 OR 국회의사당역 OR 군자역 OR 군자역 OR 군포역 OR 굴봉산역 OR 굴포천역 OR 굽은다리역 OR 귤현역 OR 금곡역 OR 금릉역 OR 금정역 OR 금정역 OR 금천구청역 OR 금촌역 OR 금호역 OR 기흥역 OR 기흥역 OR 길동역 OR 길음역 OR 김량장역 OR 김유정역 OR 김포공항역 OR 김포공항역 OR 김포공항역 OR 김포공항역 OR 까치산역 OR 까치산역 OR 까치울역 OR 낙성대역 OR 남구로역 OR 남동구청역 OR 남동인더스파크역 OR 남부터미널역 OR 남성역 OR 남영역 OR 남위례역 OR 남춘천역 OR 남태령역 OR 남한산성입구역 OR 내방역 OR 노들역 OR 노량진역 OR 노량진역 OR 노원역 OR 노원역 OR 녹번역 OR 녹사평역 OR 녹양역 OR 녹천역 OR 논현역 OR 논현역 OR 능곡역 OR 단대오거리역 OR 달미역 OR 달월역 OR 답십리역 OR 당고개역 OR 당곡역 OR 당산역 OR 당산역 OR 당정역 OR 대곡역 OR 대곡역 OR 대공원역 OR 대림역 OR 대림역 OR 대모산입구역 OR 대방역 OR 대방역 OR 대성리역 OR 대야미역 OR 대청역 OR 대치역 OR 대화역 OR 대흥역 OR 덕계역 OR 덕소역 OR 덕정역 OR 도곡역 OR 도곡역 OR 도농역 OR 도라산역 OR 도림천역 OR 도봉역 OR 도봉산역 OR 도봉산역 OR 도심역 OR 도원역 OR 도화역 OR 독립문역 OR 독바위역 OR 독산역 OR 독정역 OR 돌곶이역 OR 동대문역 OR 동대문역 OR 동대문역사문화공원역 OR 동대문역사문화공원역 OR 동대문역사문화공원역 OR 동대입구역 OR 동두천역 OR 동두천중앙역 OR 동묘앞역 OR 동묘앞역 OR 동막역 OR 동백역 OR 동수역 OR 동암역 OR 동오역 OR 동인천역 OR 동작역 OR 동작역 OR 동천역 OR 동춘역 OR 두정역 OR 둔전역 OR 둔촌동역 OR 둔촌오륜역 OR 등촌역 OR 디지털미디어시티역 OR 디지털미디어시티역 OR 디지털미디어시티역 OR 뚝섬역 OR 뚝섬유원지역 OR 마곡역 OR 마곡나루역 OR 마곡나루역 OR 마두역 OR 마들역 OR 마산역 OR 마석역 OR 마장역 OR 마전역 OR 마천역 OR 마포역 OR 마포구청역 OR 만수역 OR 망우역 OR 망우역 OR 망원역 OR 망월사역 OR 망포역 OR 매교역 OR 매봉역 OR 매탄권선역 OR 먹골역 OR 면목역 OR 명동역 OR 명일역 OR 명지대역 OR 명학역 OR 모란역 OR 모란역 OR 모래내시장역 OR 목동역 OR 몽촌토성역 OR 무악재역 OR 문래역 OR 문산역 OR 문정역 OR 문학경기장역 OR 미금역 OR 미금역 OR 미사역 OR 미아역 OR 미아사거리역 OR 박촌역 OR 반월역 OR 반포역 OR 발곡역 OR 발산역 OR 방배역 OR 방이역 OR 방학역 OR 방화역 OR 배방역 OR 백마역 OR 백석역 OR 백양리역 OR 백운역 OR 버티고개역 OR 범계역 OR 범골역 OR 별내역 OR 별내별가람역 OR 병점역 OR 보라매역 OR 보라매역 OR 보라매공원역 OR 보라매병원역 OR 보산역 OR 보문역 OR 보문역 OR 보정역 OR 보평역 OR 복정역 OR 복정역 OR 봉명역 OR 봉은사역 OR 봉천역 OR 봉화산역 OR 부개역 OR 부발역 OR 부천역 OR 부천시청역 OR 부천종합운동장역 OR 부평역 OR 부평역 OR 부평구청역 OR 부평구청역 OR 부평삼거리역 OR 부평시장역 OR 북한산보국문역 OR 북한산우이역 OR 불광역 OR 불광역 OR 사가정역 OR 사당역 OR 사당역 OR 사리역 OR 사릉역 OR 사우역 OR 사평역 OR 산곡역 OR 산본역 OR 산성역 OR 삼가역 OR 삼각지역 OR 삼각지역 OR 삼동역 OR 삼산체육관역 OR 삼성역 OR 삼성중앙역 OR 삼송역 OR 삼양역 OR 삼양사거리역 OR 삼전역 OR 상갈역 OR 상계역 OR 상도역 OR 상동역 OR 상록수역 OR 상봉역 OR 상봉역 OR 상봉역 OR 상수역 OR 상왕십리역 OR 상월곡역 OR 상일동역 OR 상천역 OR 상현역 OR 새말역 OR 새절역 OR 샛강역 OR 샛강역 OR 서강대역 OR 서구청역 OR 서대문역 OR 서동탄역 OR 서부여성회관역 OR 서빙고역 OR 서원역 OR 서울대입구역 OR 서울대벤처타운역 OR 서울지방병무청역 OR 서울숲역 OR 서울역역 OR 서울역역 OR 서울역역 OR 서울역역 OR 서정리역 OR 서초역 OR 서현역 OR 석계역 OR 석계역 OR 석남역 OR 석남역 OR 석바위시장역 OR 석수역 OR 석천사거리역 OR 석촌역 OR 석촌역 OR 석촌고분역 OR 선릉역 OR 선릉역 OR 선바위역 OR 선부역 OR 선유도역 OR 선정릉역 OR 선정릉역 OR 선학역 OR 성균관대역 OR 성복역 OR 성수역 OR 성신여대입구역 OR 성신여대입구역 OR 성환역 OR 세류역 OR 세마역 OR 세종대왕릉역 OR 센트럴파크역 OR 소래포구역 OR 소사역 OR 소사역 OR 소새울역 OR 소요산역 OR 솔샘역 OR 솔밭공원역 OR 송내역 OR 송도역 OR 송도달빛축제공원역 OR 송산역 OR 송정역 OR 송탄역 OR 송파역 OR 송파나루역 OR 수내역 OR 수락산역 OR 수리산역 OR 수색역 OR 수서역 OR 수서역 OR 수원역 OR 수원역 OR 수원시청역 OR 수유역 OR 수지구청역 OR 수진역 OR 숙대입구역 OR 숭실대입구역 OR 숭의역 OR 시민공원역 OR 시우역 OR 시청역 OR 시청역 OR 시청·용인대역 OR 시흥능곡역 OR 시흥대야역 OR 시흥시청역 OR 신갈역 OR 신금호역 OR 신길역 OR 신길역 OR 신길온천역 OR 신길온천역 OR 신내역 OR 신내역 OR 신논현역 OR 신논현역 OR 신답역 OR 신당역 OR 신당역 OR 신대방역 OR 신대방삼거리역 OR 신도림역 OR 신도림역 OR 신둔도예촌역 OR 신림역 OR 신림역 OR 신목동역 OR 신반포역 OR 신방화역 OR 신사역 OR 신사역 OR 신설동역 OR 신설동역 OR 신설동역 OR 신연수역 OR 신용산역 OR 신원역 OR 신이문역 OR 신정역 OR 신정네거리역 OR 신중동역 OR 신창역 OR 신천역 OR 신촌(2)역 OR 신촌(경)역 OR 신포역 OR 신풍역 OR 신현역 OR 신흥역 OR 쌍문역 OR 쌍용역 OR 아산역 OR 아시아드경기장역 OR 아신역 OR 아차산역 OR 아현역 OR 안국역 OR 안산역 OR 안산역 OR 안암역 OR 안양역 OR 암사역 OR 압구정역 OR 압구정로데오역 OR 애오개역 OR 야당역 OR 야목역 OR 야탑역 OR 약수역 OR 약수역 OR 양수역 OR 양원역 OR 양재역 OR 양재역 OR 양재시민의숲역 OR 양정역 OR 양주역 OR 양천구청역 OR 양천향교역 OR 양촌역 OR 양평(5)역 OR 양평(중)역 OR 어룡역 OR 어린이대공원역 OR 어정역 OR 어천역 OR 언주역 OR 여의나루역 OR 여의도역 OR 여의도역 OR 여주역 OR 역곡역 OR 역삼역 OR 역촌역 OR 연수역 OR 연신내역 OR 연신내역 OR 염창역 OR 영등포역 OR 영등포구청역 OR 영등포구청역 OR 영등포시장역 OR 영종역 OR 영통역 OR 예술회관역 OR 오금역 OR 오금역 OR 오남역 OR 오류동역 OR 오리역 OR 오목교역 OR 오목천역 OR 오빈역 OR 오산역 OR 오산대역 OR 오이도역 OR 오이도역 OR 옥수역 OR 옥수역 OR 온수역 OR 온수역 OR 온양온천역 OR 올림픽공원역 OR 올림픽공원역 OR 완정역 OR 왕길역 OR 왕십리역 OR 왕십리역 OR 왕십리역 OR 왕십리역 OR 외대앞역 OR 용답역 OR 용두역 OR 용마산역 OR 용문역 OR 용산역 OR 용산역 OR 우장산역 OR 운길산역 OR 운동장·송담대역 OR 운서역 OR 운양역 OR 운연역 OR 운정역 OR 운천역 OR 원당역 OR 원덕역 OR 원시역 OR 원인재역 OR 원인재역 OR 원흥역 OR 월계역 OR 월곡역 OR 월곶역 OR 월드컵경기장역 OR 월롱역 OR 을지로입구역 OR 을지로3가역 OR 을지로3가역 OR 을지로4가역 OR 을지로4가역 OR 응봉역 OR 응암역 OR 의왕역 OR 의정부역 OR 의정부시청역 OR 의정부중앙역 OR 이대역 OR 이매역 OR 이매역 OR 이수역 OR 이수역 OR 이천역 OR 이촌역 OR 이촌역 OR 이태원역 OR 인덕원역 OR 인천역 OR 인천역 OR 인천가좌역 OR 인천공항1터미널역 OR 인천공항2터미널역 OR 인천논현역 OR 인천대공원역 OR 인천대입구역 OR 인천시청역 OR 인천시청역 OR 인천터미널역 OR 인하대역 OR 일산역 OR 일원역 OR 임진강역 OR 임학역 OR 작전역 OR 잠실역 OR 잠실역 OR 잠실나루역 OR 잠실새내역 OR 잠원역 OR 장기역 OR 장승배기역 OR 장암역 OR 장지역 OR 장한평역 OR 전대·에버랜드역 OR 정릉역 OR 정발산역 OR 정부과천청사역 OR 정왕역 OR 정왕역 OR 정자역 OR 정자역 OR 제기동역 OR 제물포역 OR 종각역 OR 종로3가역 OR 종로3가역 OR 종로3가역 OR 종로5가역 OR 종합운동장역 OR 종합운동장역 OR 주안역 OR 주안역 OR 주안국가산단역 OR 주엽역 OR 죽전역 OR 중계역 OR 중곡역 OR 중동역 OR 중랑역 OR 중랑역 OR 중앙역 OR 중앙역 OR 중앙보훈병원역 OR 중화역 OR 증미역 OR 증산역 OR 지석역 OR 지식정보단지역 OR 지축역 OR 지평역 OR 지행역 OR 직산역 OR 진위역 OR 진접역 OR 창동역 OR 창동역 OR 창신역 OR 천마산역 OR 천안역 OR 천왕역 OR 천호역 OR 천호역 OR 철산역 OR 청구역 OR 청구역 OR 청담역 OR 청라국제도시역 OR 청량리역 OR 청량리역 OR 청량리역 OR 청량리역 OR 청명역 OR 청평역 OR 초당역 OR 초월역 OR 초지역 OR 초지역 OR 초지역 OR 춘의역 OR 춘천역 OR 충무로역 OR 충무로역 OR 충정로역 OR 충정로역 OR 캠퍼스타운역 OR 탄현역 OR 탑석역 OR 탕정역 OR 태릉입구역 OR 태릉입구역 OR 태평역 OR 테크노파크역 OR 퇴계원역 OR 파주역 OR 판교역 OR 판교역 OR 팔당역 OR 평내호평역 OR 평촌역 OR 평택역 OR 평택지제역 OR 풍무역 OR 풍산역 OR 하계역 OR 하남검단산역 OR 하남시청역 OR 하남풍산역 OR 학동역 OR 학여울역 OR 한강진역 OR 한남역 OR 한대앞역 OR 한대앞역 OR 한성대입구역 OR 한성백제역 OR 한양대역 OR 한티역 OR 합정역 OR 합정역 OR 행당역 OR 행신역 OR 혜화역 OR 호구포역 OR 홍대입구역 OR 홍대입구역 OR 홍대입구역 OR 홍제역 OR 화계역 OR 화곡역 OR 화랑대역 OR 화서역 OR 화전역 OR 화정역 OR 회기역 OR 회기역 OR 회기역 OR 회룡역 OR 회룡역 OR 회현역 OR 효자역 OR 효창공원앞역 OR 효창공원앞역 OR 흑석역 OR 흥선역 OR 4·19민주묘지역
</div>
</details>

## Twitter Streaming API

[Tiwtter 라이브러리 git](https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/main/Filtered-Stream/filtered_stream.py)

### 1. twitter api 세팅

```python
import os
TWIT_API_BEARER = os.environ.get("TWIT_API_BEARER")
```

### 2. Streaming Client 정의

tweepy의 Streaming Client를 상속하여, on_data 메서드에서 파싱 처리

```python
class TwitterStream(tweepy.StreamingClient):
    def on_data(self, status):
        twit = status.decode('utf-8')
        print(twit)


    def on_error(self, status_code):
        if status_code ==420:
            return False



def delete_all_rules(client, rules):
    # 규칙 값이 없는 경우 None 으로 들어온다.
    if rules is None or rules.data is None:
        return None
    stream_rules = rules.data
    ids = list(map(lambda rule: rule.id, stream_rules))
    client.delete_rules(ids=ids)

```

### 3. Filter Rule 정의

streaming 규칙 추가

```python
def make_rules():
    # 스트림 규칙 추가1 - 1-9호선
    all_lines = "1호선 OR 2호선 OR 3호선 OR 4호선 OR 5호선 OR 6호선 OR 7호선 OR 8호선 OR 9호선 OR 경의중앙선 OR 신분당선 OR 수인분당선 OR 공항철도 OR 경춘선 OR 인천1호선 OR 경강선 OR 신림선"
    rules = [tweepy.StreamRule(all_lines)]

    # 스트림 규칙 추가2 - 모든 역을 20개의 Rule에 추가
    all_station_names = "<역이름 추가>"
    station_list = all_station_names.split(" OR ")
    for i in range(0, len(station_list), int(len(station_list) / 20) + 1):
        rules.append(
            tweepy.StreamRule(
                value=" OR ".join(station_list[i : i + int(len(station_list) / 20) + 1])
            )
        )
    return rules

```

### 4. 메인 함수

```python
# 트위치 클라이언트 인스턴스 생성
client = TwitterStream(TWIT_API_BEARER)
rules = client.get_rules()

# 기존 모든 규칙 제거
delete_all_rules(client, rules)

# 지하철 호선, 역명 규칙 생성
rules = make_rules()

# client 스트림 규칙 추가
for rule in rules:
    client.add_rules(rule)

print(client.get_rules())
```

### 5. 스트림 시작(한국어 필터링을 위한, "lang" 필드 추가

```python
# 스트림 시작
client.filter()
```

---

## 3. Java로 Tiwtter API 수집하기

### 1. 현재 streaming URI 내 존재하는 rule 찾기

```java
private static List<String> getRules(String bearerToken) throws URISyntaxException, IOException {
        List<String> rules = new ArrayList<>();
        HttpClient httpClient = HttpClients.custom()
                .setDefaultRequestConfig(RequestConfig.custom()
                        .setCookieSpec(CookieSpecs.STANDARD).build())
                .build();

        URIBuilder uriBuilder = new URIBuilder("https://api.twitter.com/2/tweets/search/stream/rules");

        HttpGet httpGet = new HttpGet(uriBuilder.build());
        httpGet.setHeader("Authorization", String.format("Bearer %s", bearerToken));
        httpGet.setHeader("content-type", "application/json");
        HttpResponse response = httpClient.execute(httpGet);
        HttpEntity entity = response.getEntity();
        if (null != entity) {
            JSONObject json = new JSONObject(EntityUtils.toString(entity, "UTF-8"));
            if (json.length() > 1) {
                JSONArray array = (JSONArray) json.get("data");
                for (int i = 0; i < array.length(); i++) {
                    JSONObject jsonObject = (JSONObject) array.get(i);
                    rules.add(jsonObject.getString("id"));
                }
            }
        }
        return rules;
    }
```

### 2. 찾은 rule 제거

```java
private static void deleteRules(String bearerToken, List<String> existingRules) throws URISyntaxException, IOException {
        HttpClient httpClient = HttpClients.custom()
                .setDefaultRequestConfig(RequestConfig.custom()
                        .setCookieSpec(CookieSpecs.STANDARD).build())
                .build();

        URIBuilder uriBuilder = new URIBuilder("https://api.twitter.com/2/tweets/search/stream/rules");

        HttpPost httpPost = new HttpPost(uriBuilder.build());
        httpPost.setHeader("Authorization", String.format("Bearer %s", bearerToken));
        httpPost.setHeader("content-type", "application/json");
        StringEntity body = new StringEntity(getFormattedString("{ \"delete\": { \"ids\": [%s]}}", existingRules));
        httpPost.setEntity(body);
        HttpResponse response = httpClient.execute(httpPost);
        HttpEntity entity = response.getEntity();
        if (null != entity) {
            System.out.println(EntityUtils.toString(entity, "UTF-8"));
        }
    }
```

### 3. 원하는 rule 설정

```java
private static void createRules(String bearerToken, Map<String, String> rules) throws URISyntaxException, IOException {
        HttpClient httpClient = HttpClients.custom()
                .setDefaultRequestConfig(RequestConfig.custom()
                        .setCookieSpec(CookieSpecs.STANDARD).build())
                .build();

        URIBuilder uriBuilder = new URIBuilder("https://api.twitter.com/2/tweets/search/stream/rules");

        // POST method
        HttpPost httpPost = new HttpPost(uriBuilder.build());
        httpPost.setHeader("Authorization", String.format("Bearer %s", bearerToken));
        httpPost.setHeader("content-type", "application/json");
        StringEntity body = new StringEntity(getFormattedString("{\"add\": [%s]}", rules), ContentType.APPLICATION_JSON);
        httpPost.setEntity(body);
        HttpResponse response = httpClient.execute(httpPost);
        HttpEntity entity = response.getEntity();
        if (null != entity) {
            System.out.println(EntityUtils.toString(entity));
        }
    }
```

#### 3-1. rule에 사용된 언어에 따라 encoding 다르게 적용 필요

```java
StringEntity body = new StringEntity(getFormattedString("{\"add\": [%s]}", rules), ContentType.APPLICATION_JSON);
```

### 4. streaming 진행

```java
private static void connectStream(String bearerToken) throws IOException, URISyntaxException {

        HttpClient httpClient = HttpClients.custom()
                .setDefaultRequestConfig(RequestConfig.custom()
                        .setCookieSpec(CookieSpecs.STANDARD).build())
                .build();

        URIBuilder uriBuilder = new URIBuilder("https://api.twitter.com/2/tweets/search/stream");

        // GET Method 사용해서 url 호출
        HttpGet httpGet = new HttpGet(uriBuilder.build());
        httpGet.setHeader("Authorization", String.format("Bearer %s", bearerToken));

        HttpResponse response = httpClient.execute(httpGet);
        HttpEntity entity = response.getEntity();
        JSONArray tweets = new JSONArray();
        if (null != entity) {
            BufferedReader reader = new BufferedReader(new InputStreamReader((entity.getContent())));
            System.out.println("start!");
            String line = reader.readLine();
            while (line != null) {
                if (line.length() == 0){
                    line = reader.readLine();
                }
                else if (line.charAt(0) == '{') {
                    JSONObject data = (JSONObject) new JSONObject(line).get("data");
                    System.out.println(data.get("text"));
                    tweets.put(data);
                    line = reader.readLine();
                }
                else {
                    line = reader.readLine();
                }
            }
        }
    }
```

---

> 고민거리들.\
> 생각보다 "역명"으로 데이터를 조회했을 때, 수집량이 많지 않았다.

twitter API로 실시간 데이터 처리를 해보았는데, 다음 주에는 Spark를 사용하여, 데이터 처리를 해보면서, Spark에 대한 기초를 공부해보자.

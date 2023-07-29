import requests 

response = requests.get("https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark Magician")

saved_response = response
saved_response_json = response.json()

print(saved_response_json.data.name)

print('haha')

print(saved_response)
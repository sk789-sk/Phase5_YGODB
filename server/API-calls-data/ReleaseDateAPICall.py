#Lets write the the into to get the data 

import requests


url = 'https://db.ygoprodeck.com/api/v7/cardsets.php'

response = requests.get(url)

sets_info = response.json()

for card_set in sets_info:
    print(card_set['set_name'])


def getdata(file):
    f = open(file)
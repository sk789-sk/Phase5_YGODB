from random import randint, choice as rc

from faker import Faker
import requests
from app import app
from models import *
import json 

fake = Faker()


f = open("ErrorList.txt",'w')
q = open("ReleaseSets.txt",'w')

#When filling out the card DB we have to match set name to DB it. We can manage that with a dictionary for everytime we upload to the DB we add to the dict. 

set_to_id_map = {}

def get_release_sets():
    #issue is that the Adidas collaboration card does not have a tcg release date

    #I should probably save all this data onto a file in my pc as well in case there are changes to the APi in the future for database seeding

    url = 'https://db.ygoprodeck.com/api/v7/cardsets.php'
    response = requests.get(url)
    sets_info = response.json()
    outlist = []
    error_list = []
    j=0
    for card_set in sets_info:        
        try:
            pack = ReleaseSet(
                name = card_set['set_name'],
                releaseDate = card_set['tcg_date'],
                card_count = card_set['num_of_cards'],    
                set_code = card_set['set_code']       
            )
            j+=1
            set_to_id_map[card_set['set_name']] = j
            q.write(str(pack)+'\n') 
        except:
            error_list.append((i,card_set))
            f.write(str(card_set)+'\n')
            continue
        
        outlist.append(pack)

    with open("SetMap.txt",'w') as fp:
        json.dump(set_to_id_map,fp)
    print('sets saved')

    print(error_list)
    return outlist


i = 0

def create_Normal_Monster_Cards():
    
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Normal%20Monster'
    
    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID

        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]
            
        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = False,
                    isTuner = False,
                    isFlip = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = False,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                global i 
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist


def create_normal_Tuner_Monster():

    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Normal%20Tuner%20Monster'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = False,
                    isTuner = False,
                    isFlip = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = False,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                global i 
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist

            
            

def create_effect_Monster():

    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Effect%20Monster'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []


    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID

        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isTuner = False,
                    isFlip = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = False,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                global i 
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist

def create_tuner_Monster():
    
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Tuner%20Monster'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID

            name_card = card['name']
            description_card = card['desc']
            attack_card = card["atk"]
            defense_card = card ['def']
            level_card = card ['level']
            # card_type_card = card ['type']
            card_race_card = card['race']
            card_attribute_card = card['attribute']
            card_image_card = card['card_images'][0]["image_url"]
            
            if "card_sets" in card:

                try:
                    a = Card(
                        name = name_card,
                        description = description_card,
                        attack = attack_card,
                        defense = defense_card,
                        level = level_card,
                        card_type = 'Monster',
                        card_race = card_race_card,
                        card_attribute = card_attribute_card,
                        card_image = card_image_card,
                        isEffect = True,
                        isFlip = False,
                        isTuner = True,
                        isSpirit = False,
                        isUnion = False,
                        isGemini = False,
                        isPendulum = False,
                        isRitual = False,
                        isToon = False,
                        isFusion = False,
                        isSynchro = False,
                        isXYZ = False,
                        isLink = False
                    )
                    global i 
                    i+=1
                    card_outlist.append(a)
                except:
                    continue
                
                for setname in card['card_sets']:
                #Here we put all the releases for them 

                    try:
                        release = CardinSet(
                            rarity = setname['set_rarity'],
                            card_code = setname['set_code'],
                            set_id = set_to_id_map[setname['set_name']],
                            card_id = i
                        )
                        releaseCard_outlist.append(release)
                    except:  #unreleased info in api also
                        continue
    return card_outlist,releaseCard_outlist

def create_Flip_Effect_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Flip%20Effect%20Monster'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []


    for card in card_info['data']: 

        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]
            
        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = True,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = False,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                global i 
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
            #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue

    return card_outlist,releaseCard_outlist

def create_Spirit_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Spirit%20Monster'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    for card in card_info['data']: #now each card is a dict i think
            #for the released set we will need a dictionary map for name to ID
            name_card = card['name']
            description_card = card['desc']
            attack_card = card["atk"]
            defense_card = card ['def']
            level_card = card ['level']
            # card_type_card = card ['type']
            card_race_card = card['race']
            card_attribute_card = card['attribute']
            card_image_card = card['card_images'][0]["image_url"]

            if "card_sets" in card:
                try:
                    a = Card(
                        name = name_card,
                        description = description_card,
                        attack = attack_card,
                        defense = defense_card,
                        level = level_card,
                        card_type = 'Monster',
                        card_race = card_race_card,
                        card_attribute = card_attribute_card,
                        card_image = card_image_card,
                        isEffect = True,
                        isFlip = False,
                        isTuner = False,
                        isSpirit = True,
                        isUnion = False,
                        isGemini = False,
                        isPendulum = False,
                        isRitual = False,
                        isToon = False,
                        isFusion = False,
                        isSynchro = False,
                        isXYZ = False,
                        isLink = False
                    )
                    global i 
                    i+=1
                    card_outlist.append(a)
                except:
                    continue

                for setname in card['card_sets']:
                    #Here we put all the releases for them 

                    try:
                        release = CardinSet(
                            rarity = setname['set_rarity'],
                            card_code = setname['set_code'],
                            set_id = set_to_id_map[setname['set_name']],
                            card_id = i
                        )
                        releaseCard_outlist.append(release)
                    except:  #unreleased info in api also
                        continue
    return card_outlist,releaseCard_outlist


def create_UnionEffectMonster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Union%20Effect%20Monster'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = False,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = True,
                    isGemini = False,
                    isPendulum = False,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                global i 
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist

def create_Gemini_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Gemini%20Monster'


    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = False,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = True,
                    isPendulum = False,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                global i 
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist


def create_Pendulum_Effect_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Pendulum%20Effect%20Monster'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = False,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = True,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                global i 
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist

def create_Pendulum_Normal_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Pendulum%20Normal%20Monster'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = False,
                    isFlip = False,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = True,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                global i 
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist



def create_Pendulum_Tuner_Effect_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Pendulum%20Tuner%20Effect%20Monster'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = False,
                    isTuner = True,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = True,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                global i 
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist



def create_Ritual_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Ritual%20Monster'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []


    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = False,
                    isFlip = False,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = False,
                    isRitual = True,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                global i 
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist



def create_Ritual_Effect_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Ritual%20Effect%20Monster'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = False,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = False,
                    isRitual = True,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist



def create_Toom_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Toon%20Monster'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = False,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = False,
                    isRitual = False,
                    isToon = True,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist

def create_Fusion_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Fusion%20Monster'
    #there is no split here for normal and effect fusions

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = False,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = False,
                    isRitual = False,
                    isToon = False,
                    isFusion = True,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist


def create_Synchro_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Synchro%20Monster'
    
    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = False,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = False,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = True,
                    isXYZ = False,
                    isLink = False
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist

def create_Synchro_Tuner_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Synchro%20Tuner%20Monster'
 
    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = False,
                    isTuner = True,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = False,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = True,
                    isXYZ = False,
                    isLink = False
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist



def create_Synchro_Pendulum_Effect_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Synchro%20Pendulum%20Effect%20Monster'
 
    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = False,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = True,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = True,
                    isXYZ = False,
                    isLink = False
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist


def create_XYZ_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=XYZ%20Monster'
 
    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = False,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = False,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = True,
                    isLink = False
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist



def create_XYZ_Pendulum_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=XYZ%20Pendulum%20Effect%20Monster'
 
    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = False,
                    isTuner = False,
                    isFlip = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = False,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist



def create_Link_Monster():

    #Link Levels are stored as level of the card for searching purposes and to not add a new column to db that will be empty for most of the values
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Link%20Monster'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = None
        level_card = card['linkval']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = False,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = False,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = True
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist


def create_Pendulum_Flip_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Pendulum%20Flip%20Effect%20Monster'
 
    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = True,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = True,
                    isRitual = False,
                    isToon = False,
                    isFusion = False,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist



def create_Pendulum_Effect_Fusion_Monster():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Pendulum%20Effect%20Fusion%20Monster'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i

    for card in card_info['data']: #now each card is a dict i think
        #for the released set we will need a dictionary map for name to ID
        name_card = card['name']
        description_card = card['desc']
        attack_card = card["atk"]
        defense_card = card ['def']
        level_card = card ['level']
        # card_type_card = card ['type']
        card_race_card = card['race']
        card_attribute_card = card['attribute']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = attack_card,
                    defense = defense_card,
                    level = level_card,
                    card_type = 'Monster',
                    card_race = card_race_card,
                    card_attribute = card_attribute_card,
                    card_image = card_image_card,
                    isEffect = True,
                    isFlip = False,
                    isTuner = False,
                    isSpirit = False,
                    isUnion = False,
                    isGemini = False,
                    isPendulum = True,
                    isRitual = False,
                    isToon = False,
                    isFusion = True,
                    isSynchro = False,
                    isXYZ = False,
                    isLink = False
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist




#SPELL CARDS NOW 

def create_normal_Spell():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card&race=normal'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i 

    for card in card_info['data']: #now each card is a dict i think

        name_card = card['name']
        description_card = card['desc']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
                
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = None,
                    defense = None,
                    level = None,
                    card_type = 'Spell',
                    card_race = 'Normal',
                    card_attribute = None,
                    card_image = card_image_card,
                    isEffect = None,
                    isFlip = None,
                    isTuner = None,
                    isSpirit = None,
                    isUnion = None,
                    isGemini = None,
                    isPendulum = None,
                    isRitual = None,
                    isToon = None,
                    isFusion = None,
                    isSynchro = None,
                    isXYZ = None,
                    isLink = None
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist



def create_field_Spell():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card&race=field'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i 

    for card in card_info['data']: #now each card is a dict i think

        name_card = card['name']
        description_card = card['desc']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
                
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = None,
                    defense = None,
                    level = None,
                    card_type = 'Spell',
                    card_race = 'Field',
                    card_attribute = None,
                    card_image = card_image_card,
                    isEffect = None,
                    isFlip = None,
                    isTuner = None,
                    isSpirit = None,
                    isUnion = None,
                    isGemini = None,
                    isPendulum = None,
                    isRitual = None,
                    isToon = None,
                    isFusion = None,
                    isSynchro = None,
                    isXYZ = None,
                    isLink = None
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist

def create_equip_Spell():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card&race=equip'
    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i 

    for card in card_info['data']: #now each card is a dict i think

        name_card = card['name']
        description_card = card['desc']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
                
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = None,
                    defense = None,
                    level = None,
                    card_type = 'Spell',
                    card_race = 'Equip',
                    card_attribute = None,
                    card_image = card_image_card,
                    isEffect = None,
                    isFlip = None,
                    isTuner = None,
                    isSpirit = None,
                    isUnion = None,
                    isGemini = None,
                    isPendulum = None,
                    isRitual = None,
                    isToon = None,
                    isFusion = None,
                    isSynchro = None,
                    isXYZ = None,
                    isLink = None
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist

def create_Continuous_Spell():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card&race=Continuous'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i 

    for card in card_info['data']: #now each card is a dict i think

        name_card = card['name']
        description_card = card['desc']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
                
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = None,
                    defense = None,
                    level = None,
                    card_type = 'Spell',
                    card_race = 'Continous',
                    card_attribute = None,
                    card_image = card_image_card,
                    isEffect = None,
                    isFlip = None,
                    isTuner = None,
                    isSpirit = None,
                    isUnion = None,
                    isGemini = None,
                    isPendulum = None,
                    isRitual = None,
                    isToon = None,
                    isFusion = None,
                    isSynchro = None,
                    isXYZ = None,
                    isLink = None
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist

def create_Quick_Spell():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card&race=Quick-Play'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i 

    for card in card_info['data']: #now each card is a dict i think

        name_card = card['name']
        description_card = card['desc']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
                
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = None,
                    defense = None,
                    level = None,
                    card_type = 'Spell',
                    card_race = 'Quick',
                    card_attribute = None,
                    card_image = card_image_card,
                    isEffect = None,
                    isFlip = None,
                    isTuner = None,
                    isSpirit = None,
                    isUnion = None,
                    isGemini = None,
                    isPendulum = None,
                    isRitual = None,
                    isToon = None,
                    isFusion = None,
                    isSynchro = None,
                    isXYZ = None,
                    isLink = None
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist

def create_Ritual_Spell():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card&race=Ritual'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i 

    for card in card_info['data']: #now each card is a dict i think

        name_card = card['name']
        description_card = card['desc']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
                
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = None,
                    defense = None,
                    level = None,
                    card_type = 'Spell',
                    card_race = 'Ritual',
                    card_attribute = None,
                    card_image = card_image_card,
                    isEffect = None,
                    isFlip = None,
                    isTuner = None,
                    isSpirit = None,
                    isUnion = None,
                    isGemini = None,
                    isPendulum = None,
                    isRitual = None,
                    isToon = None,
                    isFusion = None,
                    isSynchro = None,
                    isXYZ = None,
                    isLink = None
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist

#TRAP CARDS
def create_normal_Trap():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=trap%20card&race=normal'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i 

    for card in card_info['data']: #now each card is a dict i think

        name_card = card['name']
        description_card = card['desc']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
                
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = None,
                    defense = None,
                    level = None,
                    card_type = 'Trap',
                    card_race = 'Normal',
                    card_attribute = None,
                    card_image = card_image_card,
                    isEffect = None,
                    isFlip = None,
                    isTuner = None,
                    isSpirit = None,
                    isUnion = None,
                    isGemini = None,
                    isPendulum = None,
                    isRitual = None,
                    isToon = None,
                    isFusion = None,
                    isSynchro = None,
                    isXYZ = None,
                    isLink = None
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist


def create_continuous_Trap():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=trap%20card&race=Continuous'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i 

    for card in card_info['data']: #now each card is a dict i think

        name_card = card['name']
        description_card = card['desc']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
                
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = None,
                    defense = None,
                    level = None,
                    card_type = 'Trap',
                    card_race = 'Continous',
                    card_attribute = None,
                    card_image = card_image_card,
                    isEffect = None,
                    isFlip = None,
                    isTuner = None,
                    isSpirit = None,
                    isUnion = None,
                    isGemini = None,
                    isPendulum = None,
                    isRitual = None,
                    isToon = None,
                    isFusion = None,
                    isSynchro = None,
                    isXYZ = None,
                    isLink = None
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist

def create_counter_Trap():
    url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=trap%20card&race=Counter'

    response = requests.get(url)
    card_info = response.json()
    card_outlist = []
    releaseCard_outlist = []

    global i 

    for card in card_info['data']: #now each card is a dict i think

        name_card = card['name']
        description_card = card['desc']
        card_image_card = card['card_images'][0]["image_url"]

        if "card_sets" in card:
                
            try:
                a = Card(
                    name = name_card,
                    description = description_card,
                    attack = None,
                    defense = None,
                    level = None,
                    card_type = 'Trap',
                    card_race = 'Counter',
                    card_attribute = None,
                    card_image = card_image_card,
                    isEffect = None,
                    isFlip = None,
                    isTuner = None,
                    isSpirit = None,
                    isUnion = None,
                    isGemini = None,
                    isPendulum = None,
                    isRitual = None,
                    isToon = None,
                    isFusion = None,
                    isSynchro = None,
                    isXYZ = None,
                    isLink = None
                )
                i+=1
                card_outlist.append(a)
            except:
                continue

            for setname in card['card_sets']:
                #Here we put all the releases for them 

                try:
                    release = CardinSet(
                        rarity = setname['set_rarity'],
                        card_code = setname['set_code'],
                        set_id = set_to_id_map[setname['set_name']],
                        card_id = i
                    )
                    releaseCard_outlist.append(release)
                except:  #unreleased info in api also
                    continue
    return card_outlist,releaseCard_outlist

if __name__ == '__main__':

    with app.app_context():
        print("Clearing db...")


        # User.query.delete()
        ReleaseSet.query.delete()


        Card.query.delete()
        # CardinDeck.query.delete()
        CardinSet.query.delete()
        # Inventory.query.delete()

        print("Seeding activities...")
        # usertest = User(
        #     username = 'bob',
        #     password = 'bob2',
        #     email = 'haha@gmail.com',
        #     profile = 'path2file'
        # )

        # db.session.add(usertest)

        # cards = create_cards()
        # db.session.add_all(cards)
        
        releaseSets = get_release_sets()


        ##CAUSE of ERROR
        #Since card creation does not check the actual database but instead uses a counter to see where in the database it would exist when seeding. The order in which create the cards has to match the order in which they are added into the database. If we do not do this then the mapping of the individual cards to the releases in sets will be incorrect. Safer method would be to add all the cards into the database then for each card get the DB value and then match that with release set and seed both seperately. 

        normal_monster_cards = create_Normal_Monster_Cards()
        print(i)
        normal_tuner_monster_cards = create_normal_Tuner_Monster()
        print(i)
        effect_monster_cards = create_effect_Monster()
        print(i)
        tuner_monster_cards = create_tuner_Monster()
        print(i)
        flip_effect_monster = create_Flip_Effect_Monster()
        print(i)
        spirit_monster = create_Spirit_Monster()
        print(i)
        union_effect_monster = create_UnionEffectMonster()
        print(i)
        gemini_monsters = create_Gemini_Monster()
        print(i)
        pendulum_effect_monster = create_Pendulum_Effect_Monster()
        print(i)
        pendulum_normal_monster = create_Pendulum_Normal_Monster()
        print(i)
        pendulum_tuner_effect_monster = create_Pendulum_Tuner_Effect_Monster()
        print(i)
        ritual_monster = create_Ritual_Monster()
        print(i)
        ritual_effect_monster = create_Ritual_Effect_Monster()
        print(i)
        toon_monster = create_Toom_Monster()
        print(i)
        fusion_monsters = create_Fusion_Monster()
        print(i)
        synchro_monster = create_Synchro_Monster()
        print(i)
        synchro_tuner_monster = create_Synchro_Tuner_Monster()
        print(i)
        synchro_pendulum_effect_monster = create_Synchro_Pendulum_Effect_Monster()
        print(i)
        XYZ_monster = create_XYZ_Monster()
        print(i)
        XYZ_pendulum = create_XYZ_Pendulum_Monster()
        print(i)
        Link_Monster = create_Link_Monster()
        print(i)
        pendulum_flip_effect = create_Pendulum_Flip_Monster()
        print(i)
        pendulum_Effect_Fusion_Monster = create_Pendulum_Effect_Fusion_Monster()
        print(i)
        normal_spell = create_normal_Spell()
        print(i)
        field_spell = create_field_Spell()
        print(i)
        equip_spell = create_equip_Spell()
        print(i)
        continous_spell = create_Continuous_Spell()
        print(i)
        quickplay_spell = create_Quick_Spell()
        print(i)
        ritual_spell = create_Ritual_Spell()
        print(i)
        normal_trap = create_normal_Trap()
        print(i)
        continous_trap = create_continuous_Trap()
        print(i)
        counter_trap = create_counter_Trap()
        print(i)


        db.session.add_all(releaseSets)
        db.session.add_all(normal_monster_cards[0]) #Card info
        db.session.add_all(normal_monster_cards[1]) #releaseCards info
        
        db.session.add_all(normal_tuner_monster_cards[0])
        db.session.add_all(normal_tuner_monster_cards[1])

        db.session.add_all(effect_monster_cards[0])
        db.session.add_all(effect_monster_cards[1])

        db.session.add_all(tuner_monster_cards[0])
        db.session.add_all(tuner_monster_cards[1])

        db.session.add_all(flip_effect_monster[0])
        db.session.add_all(flip_effect_monster[1])

        db.session.add_all(spirit_monster[0])
        db.session.add_all(spirit_monster[1])

        db.session.add_all(union_effect_monster[0])
        db.session.add_all(union_effect_monster[1])

        db.session.add_all(gemini_monsters[0])
        db.session.add_all(gemini_monsters[1])

        db.session.add_all(pendulum_effect_monster[0])
        db.session.add_all(pendulum_effect_monster[1])

        db.session.add_all(pendulum_normal_monster[0])
        db.session.add_all(pendulum_normal_monster[1])

        db.session.add_all(pendulum_tuner_effect_monster[0])
        db.session.add_all(pendulum_tuner_effect_monster[1])

        db.session.add_all(ritual_monster[0])
        db.session.add_all(ritual_monster[1])

        db.session.add_all(ritual_effect_monster[0])
        db.session.add_all(ritual_effect_monster[1])

        db.session.add_all(toon_monster[0])
        db.session.add_all(toon_monster[1])

        db.session.add_all(fusion_monsters[0])
        db.session.add_all(fusion_monsters[1])

        db.session.add_all(synchro_monster[0])
        db.session.add_all(synchro_monster[1])

        db.session.add_all(synchro_tuner_monster[0])
        db.session.add_all(synchro_tuner_monster[1])

        db.session.add_all(synchro_pendulum_effect_monster[0])
        db.session.add_all(synchro_pendulum_effect_monster[1])

        db.session.add_all(XYZ_monster[0])
        db.session.add_all(XYZ_monster[1])

        db.session.add_all(XYZ_pendulum[0])
        db.session.add_all(XYZ_pendulum[1])

        db.session.add_all(Link_Monster[0])
        db.session.add_all(Link_Monster[1])

        db.session.add_all(pendulum_flip_effect[0])
        db.session.add_all(pendulum_flip_effect[1])

        db.session.add_all(pendulum_Effect_Fusion_Monster[0])
        db.session.add_all(pendulum_Effect_Fusion_Monster[1])

        #Start of spells

        db.session.add_all(normal_spell[0])
        db.session.add_all(normal_spell[1])
        #Working test


        db.session.add_all(field_spell[0])
        db.session.add_all(field_spell[1])

        db.session.add_all(equip_spell[0])
        db.session.add_all(equip_spell[1])

        db.session.add_all(continous_spell[0])
        db.session.add_all(continous_spell[1])

        db.session.add_all(quickplay_spell[0])
        db.session.add_all(quickplay_spell[1])

        db.session.add_all(ritual_spell[0])
        db.session.add_all(ritual_spell[1])

        #Start of Traps

        db.session.add_all(normal_trap[0])
        db.session.add_all(normal_trap[1])

        db.session.add_all(continous_trap[0])
        db.session.add_all(continous_trap[1])

        db.session.add_all(counter_trap[0])
        db.session.add_all(counter_trap[1])


        db.session.commit()



        print("Done seeding!")

        f.close()
        q.close()






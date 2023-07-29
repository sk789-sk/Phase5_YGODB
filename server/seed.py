from random import randint, choice as rc

from faker import Faker
import requests
from app import app
from models import *

fake = Faker()

#add some test data to see if the relationships are working in the DB


# def create_activities():
#     activities = []
#     for _ in range(10):
#         a = Activity(
#             name=fake.sentence(),
#             difficulty=randint(1, 5)
#         )
#         activities.append(a)

#     return activities


def create_cards():
    cards = []
    for _ in range(20):
        a = Card(
            name = fake.name(),
            attack = (randint(0,25)*100),
            defense = (randint(0,25)*100),
            level = (randint(0,10)),
            card_type = fake.name(),
            card_attribute = fake.name(),
            LegalDate = '1.1.1',
            card_image = 'linktosrc',
            rarity = 'max'
        )
        cards.append(a)
    return cards


def get_release_sets():
    #issue is that the Adidas collaboration card does not have a tcg release date

    #I should probably save all this data onto a file in my pc as well in case there are changes to the APi in the future for database seeding

    url = 'https://db.ygoprodeck.com/api/v7/cardsets.php'
    response = requests.get(url)
    sets_info = response.json()
    outlist = []
    error_list = []
    i=0
    for card_set in sets_info:        
        print(i)
        i+=1
        try:
            pack = ReleaseSet(
                name = card_set['set_name'],
                releaseDate = card_set['tcg_date'],
                card_count = card_set['num_of_cards'],    
                set_code = card_set['set_code']        
            )
        except:
            error_list.append((i,card_set['set_name']))
            continue
        
        outlist.append(pack)

    print(error_list)
        # [(26, 'Adidas collaboration card'), (731, 'The Lost Art Promotion 2023'), (735, 'The Lost Art Promotion 2023 G')]
    return outlist



if __name__ == '__main__':

    with app.app_context():
        print("Clearing db...")
        # Activity.query.delete()

        User.query.delete()
        ReleaseSet.query.delete()

        print("Seeding activities...")
        usertest = User(
            username = 'bob',
            password = 'bob2',
            email = 'haha@gmail.com',
            profile = 'path2file'
        )

        db.session.add(usertest)

        cards = create_cards()
        db.session.add_all(cards)
        
        releaseSets = get_release_sets()

        db.session.add_all(releaseSets)
        
        db.session.commit()



        print("Done seeding!")







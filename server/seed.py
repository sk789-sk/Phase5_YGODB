from random import randint, choice as rc

from faker import Faker

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




if __name__ == '__main__':

    with app.app_context():
        print("Clearing db...")
        # Activity.query.delete()

        print("Seeding activities...")
        usertest = User(
            username = 'bob',
            password = 'bob2',
            email = 'haha@gmail.com',
            profile = 'path2file'
        )

        db.session.add(usertest)
        db.session.commit()



        print("Done seeding!")







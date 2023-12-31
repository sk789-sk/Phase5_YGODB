"""added public bool for decks

Revision ID: 01c65dff84d4
Revises: d68c075f23d5
Create Date: 2023-08-01 15:47:12.929640

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '01c65dff84d4'
down_revision = 'd68c075f23d5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Decks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('isPublic', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Decks', schema=None) as batch_op:
        batch_op.drop_column('isPublic')

    # ### end Alembic commands ###

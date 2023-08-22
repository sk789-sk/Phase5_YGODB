"""removed set_id and rarity from card, those should be placed in releasedsetcards

Revision ID: 680a0efe1bbb
Revises: a258366ea4a5
Create Date: 2023-08-15 15:36:24.330424

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '680a0efe1bbb'
down_revision = 'a258366ea4a5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Cards', schema=None) as batch_op:
        batch_op.drop_column('rarity')
        batch_op.drop_column('set_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Cards', schema=None) as batch_op:
        batch_op.add_column(sa.Column('set_id', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('rarity', sa.VARCHAR(), nullable=True))

    # ### end Alembic commands ###
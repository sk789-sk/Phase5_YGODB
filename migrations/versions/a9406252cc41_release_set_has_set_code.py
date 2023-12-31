"""release set has set_code

Revision ID: a9406252cc41
Revises: 6498110962aa
Create Date: 2023-07-29 00:42:13.050095

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a9406252cc41'
down_revision = '6498110962aa'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('ReleaseSets', schema=None) as batch_op:
        batch_op.add_column(sa.Column('set_code', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('ReleaseSets', schema=None) as batch_op:
        batch_op.drop_column('set_code')

    # ### end Alembic commands ###

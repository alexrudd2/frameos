"""create templates

Revision ID: 7bf9f6e19488
Revises: 143dac43cfa1
Create Date: 2023-10-16 21:54:22.363191

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import sqlite

# revision identifiers, used by Alembic.
revision = '7bf9f6e19488'
down_revision = '143dac43cfa1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('template',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('template', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=128), nullable=False))
        batch_op.add_column(sa.Column('description', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('scenes', sqlite.JSON(), nullable=True))
        batch_op.add_column(sa.Column('config', sqlite.JSON(), nullable=True))
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=36),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('settings')
    # ### end Alembic commands ###

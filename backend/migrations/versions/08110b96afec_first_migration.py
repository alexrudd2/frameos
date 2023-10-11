"""first migration

Revision ID: 08110b96afec
Revises: 
Create Date: 2023-08-12 15:34:26.691128

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '08110b96afec'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('frame',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('frame_host', sa.String(length=256), nullable=False),
    sa.Column('frame_port', sa.Integer(), nullable=True),
    sa.Column('ssh_user', sa.String(length=50), nullable=True),
    sa.Column('ssh_pass', sa.String(length=50), nullable=True),
    sa.Column('ssh_port', sa.Integer(), nullable=True),
    sa.Column('server_host', sa.String(length=256), nullable=True),
    sa.Column('server_port', sa.Integer(), nullable=True),
    sa.Column('server_api_key', sa.String(length=64), nullable=True),
    sa.Column('status', sa.String(length=15), nullable=False),
    sa.Column('version', sa.String(length=50), nullable=True),
    sa.Column('width', sa.Integer(), nullable=True),
    sa.Column('height', sa.Integer(), nullable=True),
    sa.Column('device', sa.String(length=256), nullable=True),
    sa.Column('color', sa.String(length=256), nullable=True),
    sa.Column('image_url', sa.String(length=256), nullable=True),
    sa.Column('interval', sa.Double(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('log',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=False),
    sa.Column('type', sa.String(length=10), nullable=False),
    sa.Column('line', sa.Text(), nullable=False),
    sa.Column('frame_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['frame_id'], ['frame.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('log')
    op.drop_table('frame')
    # ### end Alembic commands ###

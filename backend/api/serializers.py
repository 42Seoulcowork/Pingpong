from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['intra_id', 'created_at', 'game_status', 'win', 'lose']
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Client, Post, MediaFile, TeamActivity


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'logo', 'platforms', 'posts_count', 'is_active', 'created_at']


class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = [
            'id', 'client', 'client_name', 'content', 'platforms', 'media_urls', 
            'hashtags', 'mentions', 'status', 'scheduled_at', 'published_at', 
            'created_at', 'author', 'author_name'
        ]
    
    def get_author_name(self, obj):
        return obj.author.get_full_name() or obj.author.username
    
    def get_client_name(self, obj):
        return obj.client.name


class MediaFileSerializer(serializers.ModelSerializer):
    uploaded_by_name = serializers.SerializerMethodField()
    
    class Meta:
        model = MediaFile
        fields = [
            'id', 'filename', 'original_name', 'mime_type', 'size', 'url', 
            'client', 'uploaded_by', 'uploaded_by_name', 'created_at'
        ]
    
    def get_uploaded_by_name(self, obj):
        return obj.uploaded_by.get_full_name() or obj.uploaded_by.username


class TeamActivitySerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    
    class Meta:
        model = TeamActivity
        fields = ['id', 'user', 'user_name', 'action', 'target_type', 'target_id', 'details', 'created_at']
    
    def get_user_name(self, obj):
        return obj.user.get_full_name() or obj.user.username
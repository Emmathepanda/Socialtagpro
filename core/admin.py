from django.contrib import admin
from .models import Client, Post, MediaFile, TeamActivity


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active', 'posts_count', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name']
    readonly_fields = ['posts_count', 'created_at']


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['client', 'content_preview', 'status', 'author', 'created_at', 'scheduled_at']
    list_filter = ['status', 'platforms', 'created_at', 'client']
    search_fields = ['content', 'client__name', 'author__username']
    readonly_fields = ['created_at', 'published_at']
    
    def content_preview(self, obj):
        return obj.content[:50] + "..." if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content Preview'


@admin.register(MediaFile)
class MediaFileAdmin(admin.ModelAdmin):
    list_display = ['original_name', 'client', 'mime_type', 'size', 'uploaded_by', 'created_at']
    list_filter = ['mime_type', 'created_at', 'client']
    search_fields = ['original_name', 'filename', 'client__name']
    readonly_fields = ['created_at']


@admin.register(TeamActivity)
class TeamActivityAdmin(admin.ModelAdmin):
    list_display = ['user', 'action', 'target_type', 'target_id', 'created_at']
    list_filter = ['action', 'target_type', 'created_at']
    search_fields = ['user__username', 'action', 'details']
    readonly_fields = ['created_at']
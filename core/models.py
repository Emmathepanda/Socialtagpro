from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Client(models.Model):
    name = models.CharField(max_length=255)
    logo = models.URLField(blank=True, null=True)
    platforms = models.JSONField(default=list)
    posts_count = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Post(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('scheduled', 'Scheduled'),
        ('published', 'Published'),
    ]
    
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    platforms = models.JSONField(default=list)
    media_urls = models.JSONField(default=list)
    hashtags = models.JSONField(default=list)
    mentions = models.JSONField(default=list)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    scheduled_at = models.DateTimeField(blank=True, null=True)
    published_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')

    def __str__(self):
        return f"{self.client.name} - {self.content[:50]}..."
    
    def save(self, *args, **kwargs):
        if self.status == 'published' and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)


class MediaFile(models.Model):
    filename = models.CharField(max_length=255)
    original_name = models.CharField(max_length=255)
    mime_type = models.CharField(max_length=100)
    size = models.IntegerField()
    url = models.URLField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=True, null=True, related_name='media_files')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_files')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.original_name


class TeamActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    action = models.CharField(max_length=100)
    target_type = models.CharField(max_length=50)  # post, client, media
    target_id = models.IntegerField()
    details = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Team Activities'

    def __str__(self):
        return f"{self.user.username} {self.action} {self.target_type}"
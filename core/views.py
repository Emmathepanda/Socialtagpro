from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db.models import Count, Q
from django.utils import timezone
from .models import Client, Post, MediaFile, TeamActivity
from .serializers import (
    ClientSerializer, PostSerializer, MediaFileSerializer, 
    TeamActivitySerializer, UserSerializer
)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        active_clients = Client.objects.filter(is_active=True)
        serializer = self.get_serializer(active_clients, many=True)
        return Response(serializer.data)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        limit = int(request.query_params.get('limit', 10))
        recent_posts = Post.objects.select_related('client', 'author').order_by('-created_at')[:limit]
        serializer = self.get_serializer(recent_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def scheduled(self, request):
        scheduled_posts = Post.objects.filter(
            status='scheduled',
            scheduled_at__isnull=False
        ).select_related('client', 'author').order_by('scheduled_at')
        serializer = self.get_serializer(scheduled_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_client(self, request):
        client_id = request.query_params.get('client_id')
        if not client_id:
            return Response({'error': 'client_id parameter required'}, status=400)
        
        posts = Post.objects.filter(client_id=client_id).select_related('client', 'author')
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)


class MediaFileViewSet(viewsets.ModelViewSet):
    queryset = MediaFile.objects.all()
    serializer_class = MediaFileSerializer
    
    @action(detail=False, methods=['get'])
    def by_client(self, request):
        client_id = request.query_params.get('client_id')
        if not client_id:
            return Response({'error': 'client_id parameter required'}, status=400)
        
        media_files = MediaFile.objects.filter(client_id=client_id).select_related('uploaded_by')
        serializer = self.get_serializer(media_files, many=True)
        return Response(serializer.data)


class TeamActivityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamActivity.objects.all()
    serializer_class = TeamActivitySerializer
    
    def get_queryset(self):
        limit = int(self.request.query_params.get('limit', 10))
        return TeamActivity.objects.select_related('user').order_by('-created_at')[:limit]


class DashboardViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['get'])
    def stats(self, request):
        total_posts = Post.objects.count()
        active_clients = Client.objects.filter(is_active=True).count()
        scheduled_posts = Post.objects.filter(status='scheduled').count()
        
        # Mock engagement data for now
        total_engagement = 15847
        
        return Response({
            'total_posts': total_posts,
            'active_clients': active_clients,
            'scheduled_posts': scheduled_posts,
            'total_engagement': total_engagement
        })
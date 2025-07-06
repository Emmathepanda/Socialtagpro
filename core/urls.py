from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'clients', views.ClientViewSet)
router.register(r'posts', views.PostViewSet)
router.register(r'media', views.MediaFileViewSet)
router.register(r'team-activity', views.TeamActivityViewSet)
router.register(r'dashboard', views.DashboardViewSet, basename='dashboard')

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('', include(router.urls)),
]
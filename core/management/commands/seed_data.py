from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
from core.models import Client, Post, MediaFile, TeamActivity


class Command(BaseCommand):
    help = 'Seed the database with sample data for Tagzo'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database with sample data...')
        
        # Create sample users
        users_data = [
            {
                'username': 'sarah.johnson',
                'email': 'sarah@tagzo.com',
                'first_name': 'Sarah',
                'last_name': 'Johnson',
                'is_staff': True,
                'is_superuser': True
            },
            {
                'username': 'mike.smith',
                'email': 'mike@tagzo.com',
                'first_name': 'Mike',
                'last_name': 'Smith',
                'is_staff': True
            },
            {
                'username': 'emma.davis',
                'email': 'emma@tagzo.com',
                'first_name': 'Emma',
                'last_name': 'Davis'
            }
        ]
        
        users = {}
        for user_data in users_data:
            user, created = User.objects.get_or_create(
                username=user_data['username'],
                defaults=user_data
            )
            if created:
                user.set_password('password123')
                user.save()
                self.stdout.write(f'Created user: {user.username}')
            users[user_data['username']] = user

        # Create sample clients
        clients_data = [
            {
                'name': 'Tech Startup Co.',
                'logo': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
                'platforms': ['instagram', 'twitter', 'linkedin'],
                'posts_count': 12,
                'is_active': True
            },
            {
                'name': 'Creative Agency',
                'logo': 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&h=100&fit=crop',
                'platforms': ['instagram', 'facebook', 'linkedin'],
                'posts_count': 8,
                'is_active': True
            },
            {
                'name': 'Fashion Brand',
                'logo': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
                'platforms': ['instagram', 'tiktok', 'twitter'],
                'posts_count': 15,
                'is_active': True
            }
        ]
        
        clients = {}
        for client_data in clients_data:
            client, created = Client.objects.get_or_create(
                name=client_data['name'],
                defaults=client_data
            )
            if created:
                self.stdout.write(f'Created client: {client.name}')
            clients[client_data['name']] = client

        # Create sample posts
        posts_data = [
            {
                'client': clients['Tech Startup Co.'],
                'content': 'Excited to announce our new product launch! 🚀 #innovation #tech',
                'platforms': ['instagram'],
                'media_urls': ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop'],
                'hashtags': ['#innovation', '#tech', '#startup'],
                'mentions': [],
                'status': 'published',
                'scheduled_at': timezone.now() - timedelta(hours=2),
                'published_at': timezone.now() - timedelta(hours=2),
                'author': users['sarah.johnson']
            },
            {
                'client': clients['Creative Agency'],
                'content': 'Behind the scenes of our latest campaign... The creative process is magical! ✨',
                'platforms': ['linkedin'],
                'media_urls': ['https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=400&h=400&fit=crop'],
                'hashtags': ['#creativity', '#design', '#agency'],
                'mentions': [],
                'status': 'published',
                'scheduled_at': timezone.now() - timedelta(hours=4),
                'published_at': timezone.now() - timedelta(hours=4),
                'author': users['mike.smith']
            },
            {
                'client': clients['Fashion Brand'],
                'content': 'New collection dropping tomorrow! 👗✨ Get ready for something amazing!',
                'platforms': ['twitter'],
                'media_urls': ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop'],
                'hashtags': ['#fashion', '#newcollection', '#style'],
                'mentions': [],
                'status': 'published',
                'scheduled_at': timezone.now() - timedelta(hours=6),
                'published_at': timezone.now() - timedelta(hours=6),
                'author': users['emma.davis']
            },
            {
                'client': clients['Tech Startup Co.'],
                'content': 'Product launch announcement with detailed specs and pricing information.',
                'platforms': ['instagram'],
                'media_urls': [],
                'hashtags': ['#product', '#launch'],
                'mentions': [],
                'status': 'scheduled',
                'scheduled_at': timezone.now() + timedelta(hours=3),
                'author': users['sarah.johnson']
            },
            {
                'client': clients['Creative Agency'],
                'content': 'Industry insights and trends for the upcoming quarter.',
                'platforms': ['linkedin'],
                'media_urls': [],
                'hashtags': ['#insights', '#trends'],
                'mentions': [],
                'status': 'scheduled',
                'scheduled_at': timezone.now() + timedelta(days=1),
                'author': users['mike.smith']
            }
        ]
        
        for post_data in posts_data:
            post, created = Post.objects.get_or_create(
                client=post_data['client'],
                content=post_data['content'],
                defaults=post_data
            )
            if created:
                self.stdout.write(f'Created post: {post.content[:50]}...')

        # Create sample team activities
        activities_data = [
            {
                'user': users['mike.smith'],
                'action': 'approved',
                'target_type': 'post',
                'target_id': 1,
                'details': 'Approved post for Tech Startup Co.'
            },
            {
                'user': users['emma.davis'],
                'action': 'uploaded',
                'target_type': 'media',
                'target_id': 1,
                'details': 'Uploaded new media for Fashion Brand'
            },
            {
                'user': users['sarah.johnson'],
                'action': 'scheduled',
                'target_type': 'post',
                'target_id': 4,
                'details': 'Scheduled 3 posts for Creative Agency'
            }
        ]
        
        for activity_data in activities_data:
            activity, created = TeamActivity.objects.get_or_create(
                user=activity_data['user'],
                action=activity_data['action'],
                target_type=activity_data['target_type'],
                target_id=activity_data['target_id'],
                defaults=activity_data
            )
            if created:
                self.stdout.write(f'Created activity: {activity.action} {activity.target_type}')

        self.stdout.write(self.style.SUCCESS('Successfully seeded database with sample data!'))
from django.conf import settings
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
import os
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token



def backdrop_path(instance, filename):
    """Generates file path for new recipe image"""
    ext = os.path.splitext(filename)[1]
    filename = os.path.splitext(filename)[0]
    name = f'{filename}{ext}'

    return os.path.join('uploads', 'backdrop_img', name)

def poster_path(instance, filename):
    """Generates file path for new recipe image"""
    ext = os.path.splitext(filename)[1]
    filename = os.path.splitext(filename)[0]
    name = f'{filename}{ext}'
    
    return os.path.join('uploads', 'poster_img', name)
    
def subtitle_path(instance, filename):
    """Generates file path for new recipe image"""
    ext = os.path.splitext(filename)[1]
    filename = os.path.splitext(filename)[0]
    name = f'{filename}{ext}'

    return os.path.join('uploads', 'subtitles', name)

def video_path(instance, filename):
    ext = os.path.splitext(filename)[1]
    filename = os.path.splitext(filename)[0]
    name = f'{filename}{ext}'
    
    return os.path.join('uploads', 'video_file', name)




@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
class UserManager(BaseUserManager):
    """Manager for users."""

    def create_user(self, email, password=None, **extra_fields):
        """Create, Save and return a new user."""
        if not email:
            raise ValueError('User Must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        

        return user
    
    def create_superuser(self, email, password, **extra_fields):
        """Create and return a new superuser."""
        user = self.create_user(email, password, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self.db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """user in the system."""
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    @property
    def is_premium(self):
        if hasattr(self, 'subscription'):
            return self.subscription.is_premium
        return False

    class Meta:
        permissions = [
            ("can_view_premium_content", "Can view premium content")
        ]
class Subscription(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_premium = models.BooleanField(default=False)
    start_date = models.DateTimeField(blank=True, null=True)
    days_left = models.IntegerField(default=0)
    expiry_date = models.DateTimeField(blank=True, null=True)
    plan = models.CharField(max_length=255, blank=True)
    paystack_id = models.CharField(max_length=255, blank=True)
    payment_status = models.CharField(max_length=255, blank=True)
    
    def update_premium_service(self):
        days_used  = timezone.now() - self.start_date
        
        self.days_left = self.days_left - days_used.days
        if self.expiry_date < timezone.now() or self.days_left == 0:
            self.premium = False
            self.days_left = 0
            self.payment_status = "expired"
            self.save()
        self.save()
        
    def __str__(self) -> str:
        return super().__str__()

RATING = ((1,'1 Star'),
           (2,'2 Star'),
           (3,'3 Star'),
           (4,'4 Star'),
           (5,'5 Star'),)

class Collection(models.Model):
    name=models.CharField(max_length=255, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.name)


class Movie(models.Model):
    """Movie in the system."""
    title = models.CharField(max_length=255)
    description = models.TextField()
    poster_path = models.ImageField(upload_to=poster_path,blank=True,null=True,)
    language=models.CharField(max_length=225)
    genres=models.ManyToManyField("Genre", related_name='movie_list')
    backdrop_path=models.ImageField(upload_to=backdrop_path,blank=True,null=True)
    collection=models.ForeignKey(Collection, on_delete=models.CASCADE,
                                 related_name='movie_list')
    production_countries = models.ManyToManyField("ProductionCountries", related_name='movie_list')
    production_companies = models.ManyToManyField("ProductionCompanies", related_name='movie_list',)
    categories = models.ManyToManyField("Categories", related_name='movie_list',)
    released_date = models.DateField(null=True, blank=True)
    time_added = models.DateField(auto_now_add=True)
    time_updated = models.DateField(auto_now_add=True, blank=True)
    featured = models.BooleanField(null=True, default=False)
    active = models.BooleanField(default=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tags = models.ManyToManyField("Tags", related_name='movie_list')
    movie_path = models.FileField(upload_to=video_path, blank=True, null=True)
    subtitle = models.FileField(upload_to=subtitle_path, blank=True, null=True)
    
    def __str__(self):
        return str(self.title)
    


    
class Genre(models.Model):
    name=models.CharField(max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)


class ProductionCountries(models.Model):
    name=models.CharField(max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)

class ProductionCompanies(models.Model):
    name=models.CharField(max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)


class Categories(models.Model):
    name=models.CharField(max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.name)
    

class Tags(models.Model):
    name=models.CharField(max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    

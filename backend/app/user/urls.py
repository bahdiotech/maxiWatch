"""URL Mappings for the user Api"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter


from user import views
from user.views import ValidateTokenView

router = DefaultRouter()

router.register('customer', views.CustomerView)

app_name = 'user'

urlpatterns = [
    path('create-user/', views.CreateUserView.as_view(), name='create-user'),
    path('', include(router.urls)),
    path('logout/', views.logout_view, name='logout'),
    path('pay/', views.get_premium_service, name='pay'),
    # path('create/', views.create_user, name='create'),
    path('admin/create/', views.CreateSuperUserView.as_view(), name='create'),
    path('token/', views.CreateTokenView.as_view(), name='token'),
    path('profile/', views.ManageUserView.as_view(), name='profile'),
    path('token-check/', ValidateTokenView.as_view(), name='check-token')
]

""""Vies for the user API"""

from rest_framework import generics, authentication, permissions, status, viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.views import APIView
import base64
from django.http import JsonResponse
from django.contrib.auth import authenticate


from user.serializers import (
    UserSerializer,
    AuthTokenSerializer,
    SuperUserSerializer,
)
from user.serializers import SubscriptionSerializer
from core.models import Subscription


class CustomerView(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    queryset = Subscription.objects.all()
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    
    def perform_create(self, serializer):
        return serializer.save(user = self.request.user)
    
class CreateSuperUserView(generics.CreateAPIView):
    serializer_class = SuperUserSerializer


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer
    
@api_view(['PATCH',])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.TokenAuthentication])
def get_premium_service(request):
    user=request.user
    if request.method == 'PATCH':
        
        user.is_premium = True
        
        return Response({"detail": "you are now premium",
                     }, status=status.HTTP_201_CREATED)
    
# @api_view(['POST',])
# def create_user(request):
#     if request.method== 'POST':
#         serializer = UserSerializer(data=request.data)
#         data= {}
#         if serializer.is_valid():
#             account = serializer.save()
#             data['email'] = account.email
#             data['Name'] = account.full_name
            
#             token = Token.objects.get(user=account).key
#             data['token'] = token
        
#         else:
#             data = serializer.errors
            
#         return Response(data, status=status.HTTP_201_CREATED)
        

@api_view(['POST',])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.TokenAuthentication])
def logout_view(request):

    if request.method == 'POST':
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    paid=True
    
    def get_object(self):
        """Retrieve and return authenticated user"""
        return self.request.user
    
    def partial_update(self, serializer):
        """Update the authenticated user"""
        serializer.save(is_premium=self.paid)
        
        
        
class ValidateTokenView(APIView):
    """Check the validity of a token"""
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, *args, **kwargs):
        """Check the validity of the auth token"""
        user = request.user
        if user.is_staff or user.is_superuser:
            return Response({ "detail": "Token is valid"}, status=200)
        return Response({'detail':"You are not a Staff or Admin User"}, status=401)


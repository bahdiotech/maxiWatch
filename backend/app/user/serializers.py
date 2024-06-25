from django.contrib.auth import (
    get_user_model,
    authenticate
)
from datetime import timedelta
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from django.utils.translation import gettext as _
from rest_framework import serializers
from core.models import Subscription

class SubscriptionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Subscription
        fields = '__all__' 
        read_only_fields = ('id', 'user','premium', 'days_left','expiry_date','start_date')

        
    def create(self, validated_data):
        plan = validated_data.get('plan', None)
        payment_status = validated_data.get('payment_status', None)
        
        if payment_status is not None and payment_status == "success":
            premium = True
            start_date = timezone.now()
            if plan is not None and plan == 'monthly':
                days_left = 30
                expiry_date = start_date + timedelta(days=days_left)
                customer = Subscription.objects.create(premium=premium, start_date=start_date, 
                                            days_left=days_left,expiry_date=expiry_date, **validated_data
                                            )
                return customer
            
            if plan is not None and plan == 'weekly':
                days_left = 7
                expiry_date = start_date + timedelta(days=days_left)
                customer = Subscription.objects.create(premium=premium, start_date=start_date, 
                                            days_left=days_left,
                                            expiry_date=expiry_date, **validated_data
                                            )
                return customer
                
            if plan is not None and plan == 'yearly':
                days_left = 365
                expiry_date = start_date + timedelta(days=days_left)
                customer = Subscription.objects.create(premium=premium, start_date=start_date, 
                                            days_left=days_left,expiry_date=expiry_date, **validated_data
                                            )
                return customer
            return customer
    def to_representation(self, instance):
        data = super().to_representation(instance)
        days_used = (timezone.now() - parse_datetime(data['start_date']))
        data['days_left'] = data['days_left'] - days_used.days
        if data['days_left'] <= 0 or parse_datetime(data['expiry_date']) < timezone.now():
            data['days_left'] = 0
            data['premium'] = False
            data['payment_status'] = "Expired"
            return data
        return data
           
    def update(self, validated_data, instance):
        pass


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user Object Model"""
    full_name = serializers.SerializerMethodField(read_only=True)
    customer = SubscriptionSerializer(read_only=True)
    
    class Meta:
        model = get_user_model()
        fields = ('email','first_name','last_name','full_name', 'password','customer')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'min_length': 5,
                'style': {'input_type': 'password'}
            }
        }
        
    def get_full_name(self, obj):
        """Return the full name of the user"""
        return f"{obj.first_name} {obj.last_name}"
    def to_representation(self, instance):
        data =  super().to_representation(instance)
        data['full_name'] = f"{instance.first_name} {instance.last_name}"
        return data



    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        return get_user_model().objects.create_user( **validated_data)

    def update(self, instance, validated_data):
        """Update and return user encrypted password"""
        password = validated_data.pop('password', None)
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        user = super().update(instance, validated_data)
        user.first_name = first_name
        user.last_name = last_name
        user.full_name = f"{first_name} {last_name}"
        if password:
            user.set_password(password)
            user.save()
        user.save()
        return user


class SuperUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = get_user_model()
        fields = UserSerializer.Meta.fields
    
    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        full_name = f"{first_name} {last_name}"
        return get_user_model().objects.create_superuser(full_name=full_name, **validated_data)



class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user Auth token"""
    email = serializers.EmailField(max_length=30)
    password = serializers.CharField(
        max_length=30,
        style={'input_type': 'password'},
        trim_whitespace=False,
        )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = _('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authorization')
        attrs['user'] = user
        return attrs
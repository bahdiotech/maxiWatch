
from django.contrib import admin  # noqa
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from core import models
from django.contrib.auth.models import User

class SubscriptionInline(admin.StackedInline):
    model = models.Subscription
    can_delete = False
    verbose_name_plural = 'subscription'
class UserAdmin(BaseUserAdmin):
    """Define the admin pages for users."""
    inlines = (SubscriptionInline,)
    ordering = ['id']
    list_display = ['email','full_name', 'first_name', 'last_name', 'is_premium',]
    def full_name(self, obj):
        """Return the full name of the user"""
        return f"{obj.first_name} {obj.last_name}"
    full_name.short_description = "Full Name"
    
    def is_premium(self, obj):
        # if hasattr
        return obj.is_premium
    is_premium.short_description = "Premium User"
    is_premium.boolean = True
     
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups', 'subscription__is_premium')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (
            'Permissions',
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                    'groups',
                    'user_permissions',
                )
            }
        ),
        # ('Premium Status', {'fields': ('is_premium',)}),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    readonly_fields = ['last_login']
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email',
                       'password1',
                       'password2',
                       'full_name',
                       'first_name',
                       'last_name',
                       'is_active',
                       'is_staff',
                       'is_superuser',
                    #    'is_premium'
                       
                       )
        }),
    )
    
    def get_readonly_fields(self, request, obj=None):
        if not request.user.has_perm('auth.can_view_premium_content'):
            return ['is_premium']
        return super().get_readonly_fields(request, obj)

# admin.site.register(models.Subscription)
admin.site.register(models.User, UserAdmin)
admin.site.register(models.Subscription)
admin.site.register(models.Movie)
admin.site.register(models.Genre)
admin.site.register(models.Collection)
admin.site.register(models.ProductionCountries)
admin.site.register(models.ProductionCompanies)
admin.site.register(models.Categories)
admin.site.register(models.Tags)

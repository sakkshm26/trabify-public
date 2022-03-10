from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account,Book

from rest_framework_simplejwt.token_blacklist import models
from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin

class AccountAdmin(UserAdmin):
    list_display = ('email','name','phone','date_joined')
    search_fields = ('email','name')
    readonly_fields = ('id', 'date_joined')
    ordering = ('email',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(Account,AccountAdmin)
admin.site.register(Book)

# For solving outstanding token error while deleting a user
class NewOutstandingTokenAdmin(OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True

admin.site.unregister(models.OutstandingToken)
admin.site.register(models.OutstandingToken, NewOutstandingTokenAdmin)
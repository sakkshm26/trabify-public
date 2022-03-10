from lib2to3.pytree import Base
from rest_framework.authentication import BaseAuthentication
from django.contrib.auth.models import User
from .models import Account
from rest_framework.exceptions import AuthenticationFailed
import jwt

class CustomAuthentication(BaseAuthentication):
    def authenticate(self, request):
        code = request.GET.get('access')
        if code is None:
            return None

        decoded = jwt.decode(code, options={"verify_signature": False}) 
        code = decoded['email']

        try:
            user = Account.objects.get(email=code)
        except User.DoesNotExist:
            raise AuthenticationFailed('No Such User')
        return (user, None)
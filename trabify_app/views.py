from rest_framework import generics, viewsets
from .serializers import UserSerializer, BookSerializer
from rest_framework import permissions
from .models import Account, Book

from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes, APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from trabify_app.customauth import CustomAuthentication

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = Account.objects.all()
    permission_classes = (permissions.AllowAny,)

class UserListView(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = UserSerializer

class UserRetrieveView(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = UserSerializer

class BookListView(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    parser_classes = [MultiPartParser, FormParser]
    authentication_classes = [CustomAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

######################

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'token/',
        'token/refresh',
    ]
    return Response(routes)
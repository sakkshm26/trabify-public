from rest_framework.serializers import ModelSerializer
from .models import Account, Book

class UserSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ('id','name','email','phone','password','date_joined')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Account.objects.create(
            name=validated_data['name'],
            email=validated_data['email'],
            phone=validated_data['phone'],
        )
 
        user.set_password(validated_data['password'])
        user.save()

        return user

class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"
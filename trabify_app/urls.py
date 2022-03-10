from django.urls import path
from .views import BookListView, RegisterView, getRoutes,MyTokenObtainPairView, UserListView, UserRetrieveView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('register/',RegisterView.as_view(),name="auth_register"),
    path('users/',UserListView.as_view(),name="users"),
    path('users/<int:pk>/',UserRetrieveView.as_view(),name="users"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
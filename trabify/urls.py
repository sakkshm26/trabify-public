from django.contrib import admin
from django.urls import path,include,re_path
from rest_framework.routers import DefaultRouter
from trabify_app import views
from django.views.static import serve
from django.conf import settings

router = DefaultRouter()

router.register('books', views.BookListView, basename='book')
# router.register('users', views.UserView, basename='users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('trabify_app.urls')),
    path('',include(router.urls)),
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
]

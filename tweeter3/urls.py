"""
tweeter3 URL Configuration
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path
from rest_framework import routers

from frontend import views
from tweeter.views import UserViewSet, TweetViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'tweets', TweetViewSet)

urlpatterns = [
    url(r'^$', views.index, name='index'),
    path('admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    #configure a new url mapping for frontend.
    # path('', include('frontend.urls'))
]

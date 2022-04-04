"""
tweeter3 URL Configuration
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tweeter import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'tweets', views.TweetViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/current/', views.current_user, name='current'),
    path('accounts/signup/', views.create_user, name='signup'),
    path('accounts/',include('django.contrib.auth.urls')),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^.*/$', views.index, name='index'),
    url(r'^$', views.index, name='index'),
    #configure a new url mapping for frontend.
    # path('', include('frontend.urls'))
]

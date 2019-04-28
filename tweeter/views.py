from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views import generic

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from tweeter.models import Tweet, User
from tweeter.permissions import IsAuthorOrReadOnly, IsSelfOrAdmin
from tweeter.serializers import TweetSerializer, UserSerializer

def index(request):
    # If fixtures are loaded, let's always log in as the user Bob.
    bob = User.objects.filter(first_name='Bob').first()
    if bob:
        print("Logging in as Bob!")
        login(request, bob)

    return render(request, 'tweeter/index.html')

@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class SignUp(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'signup.html'

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsSelfOrAdmin]

class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

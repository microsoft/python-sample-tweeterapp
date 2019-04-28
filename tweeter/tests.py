import django
django.setup()

import unittest
import pytest
from .serializers import TweetSerializer
from tweeter.models import Tweet
from django.contrib.auth.models import User
from datetime import datetime
from rest_framework import serializers

# Create your tests here.
class TestTweets(unittest.TestCase):

    def test_serializer_validation(self):
        ts = TweetSerializer()
        self.assertRaises(serializers.ValidationError,ts.validate_text,"hi!")
        self.assertRaises(serializers.ValidationError,ts.validate_text," ")
        self.assertRaises(serializers.ValidationError,ts.validate_text,"  " * 71)
        self.assertEqual(ts.validate_text("  " * 70),"  "* 70)

    def test_tweet_creation(self):
        time = datetime.now()
        tweet = Tweet(text = "Hi! I'm Bob :)", user=User(username='bob'), timestamp = time)
        self.assertEqual(tweet.text,  "Hi! I'm Bob :)")
        self.assertEqual(tweet.user.username, 'bob')
        self.assertEqual(tweet.timestamp, time)

        time = datetime(2010,10,10,10,10)
        tweet = Tweet(text = "    ", user=User(username='amy'), timestamp = time)
        self.assertEqual(tweet.text,  "    ")
        self.assertEqual(tweet.user.username, 'amy')
        self.assertEqual(tweet.timestamp, time)
    
    def test_tweet_creation_notunicode(self):
        time = datetime(year=2010,month=10,day=10,hour=10,minute=10,second=10)
        tweet = Tweet(text = "Hi� Ý'm ßoß ձ", user=User(username='ßoß'), timestamp = time)
        self.assertEqual(tweet.text,  "Hi� Ý'm ßoß ձ")
        self.assertEqual(tweet.user.username, 'ßoß')
        self.assertEqual(tweet.timestamp, time)
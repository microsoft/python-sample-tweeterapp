from tweeter3.settings.base import *

import os

SECRET_KEY = os.environ['SECRET_KEY']

DEBUG = False

ALLOWED_HOSTS = ["127.0.0.1"]

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DB_USER = os.environ['DB_USER']
DB_NAME = os.environ['DB_NAME']
DB_HOST = os.environ['DB_HOST']
DB_PASSWORD = os.environ['DB_PASSWORD']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': DB_NAME,
        'USER': f'{DB_USER}@{DB_HOST}',
        'PASSWORD': DB_PASSWORD,
        'HOST': f'{DB_HOST}.postgres.database.azure.com',
        'PORT': '',
    }
}
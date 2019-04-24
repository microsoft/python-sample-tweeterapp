from tweeter3.settings.base import *

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = ')njwhhlatzp1=%s0q33w*4g4f5pyjhil&gzqgh$c_ira5(2nye'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DB_USER = "postgres"
DB_NAME = "postgres"
DB_HOST = "db"
DB_PASSWORD = "LocalPassword"

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': DB_NAME,
        'USER': f'{DB_USER}',
        'PASSWORD': DB_PASSWORD,

        
        'HOST': f'{DB_HOST}',
        'PORT': '',
    }
}

# Disable whitenoise for demo
# INSTALLED_APPS = ['whitenoise.runserver_nostatic'] + INSTALLED_APPS
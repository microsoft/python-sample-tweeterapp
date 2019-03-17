#!/usr/bin/env python
import os
import sys
import dotenv

if __name__ == '__main__':
    # Use .env file if it is found
    env_path = os.getcwd() + '/.env'
    if os.path.exists(env_path):
        dotenv.read_dotenv(env_path)

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tweeter3.settings.development')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

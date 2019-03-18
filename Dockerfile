# Python support can be specified down to the minor or micro version
# (e.g. 3.6 or 3.6.3).
# OS Support also exists for jessie & stretch (slim and full).
# See https://hub.docker.com/r/library/python/ for all supported Python
# tags from Docker Hub.
FROM tiangolo/uwsgi-nginx

ENV LISTEN_PORT=8000
EXPOSE 8000

# Indicate where uwsgi.ini lives
ENV UWSGI_INI uwsgi.ini

# Tell nginx where static files live
ENV STATIC_URL /app/tweeter3/staticfiles

WORKDIR /app
ADD . /app

# Using pip:
RUN python3 -m pip install -r requirements.txt
RUN python3 manage.py collectstatic

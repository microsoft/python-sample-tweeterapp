# Build node front-end in a node container
FROM node

WORKDIR /nodebuild
ADD . /nodebuild
RUN npm install
RUN npm run build

# Use a python uwsgi nginx image for the runtime image (no node runtime here)
FROM tiangolo/uwsgi-nginx

ENV LISTEN_PORT=8000
EXPOSE 8000

# Indicate where uwsgi.ini lives
ENV UWSGI_INI uwsgi.ini

# Tell nginx where static files live
ENV STATIC_URL /app/tweeter3/staticfiles

WORKDIR /app
COPY --from=0 /nodebuild /app

# Install pip requirements and collect django static files
RUN python3 -m pip install -r requirements.txt
RUN python3 manage.py collectstatic --noinput

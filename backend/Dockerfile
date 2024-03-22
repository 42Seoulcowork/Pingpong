FROM python:3.12.1-alpine3.19

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

RUN apk update && apk upgrade && apk add gcc musl-dev libffi-dev libpq-dev dumb-init && rm -rf /var/cache/apk/*

RUN python -m pip install --upgrade pip

COPY ./api ./api
COPY ./config ./config
COPY ./game ./game
COPY .env .env
COPY manage.py .
COPY requirements.txt .
# COPY db.sqlite3 .

RUN pip install -r requirements.txt --no-cache-dir

EXPOSE 8000

ENTRYPOINT ["/usr/bin/dumb-init", "--", "python", "manage.py", "runserver", "0.0.0.0:8000"]
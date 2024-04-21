python manage.py makemigrations
python manage.py migrate
daphne -b 0.0.0.0 config.asgi:application
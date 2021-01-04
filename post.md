# Server

Install Django, Django REST framework and DRF Simple JWT.
TODO:
Little examplin about JWT and so on...

```sh
pip install Django djangorestframework djangorestframework-simplejwt
```

Create the Django project:

```sh
django-admin startproject auth_example
```

Create the *api* app.

```sh
cd auth_example
python manage.py startapp api
```

Add `'rest_framework'` to your **INSTALLED_APPS** setting.

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
]
```

Then, your django project must be configured to use the library. In `settings.py`, add `rest_framework_simplejwt.authentication.JWTAuthentication` to the list of authentication classes:

```python
REST_FRAMEWORK = {
    ...
    'DEFAULT_AUTHENTICATION_CLASSES': (
        ...
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
    ...
}
```

Add `urls.py` file under `api/urls.py` with the basic auth urls from
`djangorestframework-simplejwt`.

```python
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

Include the api urls in main Django urls.

```python
...
from django.urls import include

urlpatterns = [
    ...
    url(r'^api/', include('api.urls')),
]
```

Add a basic `/me` API.

First create a serializer with the user information.
TODO: Examplain what a serializer is...

`api/serializers.py`

```python
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', )
```

Add `MeView` in `api/views.py`

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer

class MeView(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

```

Add to `api/urls.py`.

```python
...
from .views import MeView

urlpatterns = [
    ...
    path('me/', MeView.as_view(), name='me'),
]
```

Run database migrations.

```sh
python manage.py migrate
```

Create a super user
```sh
python manage.py migrate
```

Test auth with curl.

```sh
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username": "jonny", "password": "jonnybravo23"}' \
  http://localhost:8000/api/token/
```

```sh
curl \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA5Nzc5Mjg1LCJqdGkiOiIxZWRkNTA3NzkyZjQ0ZmIwOGI3M2M0NDM3ZjEzMGFiOCIsInVzZXJfaWQiOjF9.KDOgEAdB_zZz2e42sCdtKZ43js8VGV2GujuxA_BwhIo" \
  http://localhost:8000/api/me/
```

# Fronted

Create React App.

```sh
yarn create react-app frontend
```

Install `use-eazy-auth` and related stuff.

```sh
yarn add use-eazy-auth react-router-dom
```


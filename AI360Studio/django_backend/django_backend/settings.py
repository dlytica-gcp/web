"""
Django settings for django_backend project.

Generated by 'django-admin startproject' using Django 5.0.7.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
from django_backend.utils.cache_utils import get_nepal_cache_lifetime
# from django_backend import audience

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-2=hyvg0h6x3o!fj0_z6or*bb3$@(lmhg9((1!gn*^r(f8@kgjh'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True


#ALLOWED_HOSTS = ['*','v3-api-ai360studio.dlytica.com','localhost','127.0.0.1:32011','10.10.157.105:32010','10.10.157.105:32011','10.10.157.105']
ALLOWED_HOSTS=['*']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    'audience',
    'authentication',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'django_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'django_backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        # for local system
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'dn_ai360_db',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'dlytica-kube-vm.eastus.cloudapp.azure.com',
        'PORT': '30147',

        # for nica vm
        # 'ENGINE': 'django.db.backends.postgresql',
        # 'NAME': 'dn_ai360_db',
        # 'USER': 'postgres',
        # 'PASSWORD': 'postgres',
        # 'HOST': '10.10.157.105',
        # 'PORT': '30100',
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'authentication.CustomUser'

# cross origin allowed
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000", "http://localhost:32010", "https://v3-ai360studio.dlytica.com", "http://10.10.157.105:32010","http://10.10.157.105:30088"
]

# CORS_ALLOW_METHODS = [
#     "DELETE",
#     "GET",
#     "OPTIONS",
#     "PATCH",
#     "POST",
#     "PUT",
# ]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# Calculate the access token lifetime until the next Nepali midnight
access_token_lifetime_seconds = get_nepal_cache_lifetime()
access_token_lifetime = timedelta(seconds=access_token_lifetime_seconds)
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': access_token_lifetime,
    'SLIDING_TOKEN_LIFETIME': timedelta(days=30),
}

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://dlytica-kube-vm.eastus.cloudapp.azure.com:31892/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'PASSWORD': 'Dlytica@123#',
            'SSL': True, 
        }
    }
}



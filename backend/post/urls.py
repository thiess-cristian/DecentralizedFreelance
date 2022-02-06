from django import views
from django.db import router
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register("posts", views.PostViewSet, basename="posts")

urlpatterns = router.urls

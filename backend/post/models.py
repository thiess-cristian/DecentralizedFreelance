from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255)
    user = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    # image = models.ImageField()

from django.db import models

# Create your models here.
class MiningStation(models.Model):
    title = models.CharField(max_length=255)
    api_key = models.CharField(max_length=255)
    earning = models.DecimalField(max_digits=10, decimal_places=6)

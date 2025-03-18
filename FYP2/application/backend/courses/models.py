from django.db import models
from institutes.models import Institute

class Course(models.Model):
    name = models.CharField(max_length=500)
    code = models.CharField(max_length=50, blank=True, default='')
    description = models.TextField(blank=True, null=True)
    institute_id = models.ForeignKey(Institute, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

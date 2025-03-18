from django.db import models
# from courses.models import Course
# from authentication.models import CustomUser
from django.contrib.auth import get_user_model
from django.conf import settings

class Resource(models.Model):
    name = models.CharField(max_length=500)
    description = models.TextField(blank=True, null=True)
    link = models.TextField()
    # course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    course_id = models.IntegerField()
    # posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
    posted_by = models.IntegerField()
    resource_type = models.CharField(max_length=100)
    

    def __str__(self):
        return self.name


from django.db import models
# from authentication.models import CustomUser
from django.contrib.auth import get_user_model
# from courses.models import Course

class Favorite(models.Model):
    user_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    # course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    course_id = models.IntegerField()


    def __str__(self):
        return f"Favorite: {self.user.email} - {self.course.name}"


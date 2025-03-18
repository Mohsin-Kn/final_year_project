from django.db import models
# from authentication.models import CustomUser
from django.contrib.auth import get_user_model
# from resources.models import Resource

class Save(models.Model):
    # user_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    user_id = models.IntegerField()
    # resource_id = models.ForeignKey(Resource, on_delete=models.CASCADE)
    resource_id = models.IntegerField()

    def __str__(self):
        return f"Save: {self.user.email} - {self.resource.name}"


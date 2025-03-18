from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Resource
from .serializer import ResourceSerializer

@api_view(['GET'])
def get_resources(request, courseID):
    resources = Resource.objects.all()
    resources = resources.filter(course_id=courseID)
    serializedData = ResourceSerializer(resources, many=True).data
    return Response(serializedData)


@api_view(['POST'])
def create_resources(request):
    data = request.data
    serializer = ResourceSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

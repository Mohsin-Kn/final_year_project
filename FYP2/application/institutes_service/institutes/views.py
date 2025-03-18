from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Institute
from .serializer import InstituteSerializer

@api_view(['GET'])
def get_institutes(request):
    institutes = Institute.objects.all()
    serializedData = InstituteSerializer(institutes, many=True).data
    return Response(serializedData)


@api_view(['POST'])
def create_institute(request):
    data = request.data
    serializer = InstituteSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
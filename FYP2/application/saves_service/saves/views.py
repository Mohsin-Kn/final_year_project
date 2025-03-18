from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Save
from .serializer import SaveSerializer

@api_view(['GET'])
def get_saves(request):
    saves = Save.objects.all()
    serializedData = SaveSerializer(saves, many=True).data
    return Response(serializedData)


@api_view(['POST'])
def create_saves(request):
    data = request.data
    serializer = SaveSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

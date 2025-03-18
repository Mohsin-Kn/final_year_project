from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Favorite
from .serializer import FavoriteSerializer

@api_view(['GET'])
def get_favorites(request):
    favorites = Favorite.objects.all()
    serializedData = FavoriteSerializer(favorites, many=True).data
    return Response(serializedData)


@api_view(['POST'])
def create_favorites(request):
    data = request.data
    serializer = FavoriteSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

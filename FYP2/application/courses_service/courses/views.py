from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Course
from .serializer import CourseSerializer

@api_view(['GET'])
def get_courses(request, instituteID):
    courses = Course.objects.all()
    courses = courses.filter(institute_id=instituteID)
    serializedData = CourseSerializer(courses, many=True).data
    return Response(serializedData)


@api_view(['POST'])
def create_courses(request):
    data = request.data
    serializer = CourseSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
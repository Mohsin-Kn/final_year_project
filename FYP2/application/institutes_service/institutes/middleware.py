from django.core.exceptions import DisallowedHost
from django.http import HttpResponse

class AllowDockerInternalHostMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            request.get_host()
        except DisallowedHost:
            request.META["HTTP_HOST"] = "institutes_service"
        return self.get_response(request)


from django.core.exceptions import DisallowedHost

def custom_disallowed_host_middleware(get_response):
    def middleware(request):
        try:
            return get_response(request)
        except DisallowedHost:
            return HttpResponse("Bad Request (Disallowed Host)", status=400)
    return middleware

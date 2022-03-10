from django import http
from django.http import HttpResponse
import json
from django.conf import settings
from django.utils.deprecation import MiddlewareMixin

ALLOWED_REFERER_URL = 'https://gotrabify.web.app'

class AllowHostsMiddleware(MiddlewareMixin):
    # def __init__(self, get_response):
    #     self.get_response = get_response

    # def __call__(self, request):
    #     return self.get_response(request)

    # def process_exception(self, request, exception):
    #     return HttpResponse("in exception")

    def process_request(self, request):
        referer_url = request.META.get('HTTP_REFERER','')
        if referer_url.startswith(ALLOWED_REFERER_URL):
            return None
        return http.HttpResponseForbidden('<h1>Forbidden</h1>')
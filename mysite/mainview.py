# -*- coding: utf-8 -*-
from django.http import HttpResponse,HttpResponseRedirect
def index(request):
    r=HttpResponseRedirect("/static/react1/build/index.html")
    return(r)
def favicon(request):
    return HttpResponseRedirect("/static/images/item.png")   

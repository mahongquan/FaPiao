# -*- coding: utf-8 -*-
from django.http import HttpResponse,HttpResponseRedirect
from django.template.context_processors import csrf
from django.shortcuts import render_to_response
def index(request):
    r=HttpResponseRedirect("/static/react1/build/index.html")
    return(r)
def favicon(request):
    return HttpResponseRedirect("/static/images/item.png")   
def loginpage(request):
    c={}
    c.update(csrf(request))
    r=render_to_response("registration/login.html",c)
    return(r)
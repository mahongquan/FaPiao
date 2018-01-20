from django.conf.urls import  include, url
from rest import views
urlpatterns = [
        url(r'^Contact', views.contact),
        url(r'^login_index', views.login_index),
        url(r'^login', views.mylogin),
        url(r'^logout', views.mylogout),
        
]

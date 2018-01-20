# -*- coding: utf-8 -*-
from django.contrib import admin
from mysite.parts.models import *

# class PackAdmin(admin.ModelAdmin):
#     search_fields = ('name', )
# admin.site.register(Pack,PackAdmin)

# class PackItemAdmin(admin.ModelAdmin):
#     pass
# admin.site.register(PackItem,PackItemAdmin)

# class ItemAdmin(admin.ModelAdmin):
#     search_fields = ('name',)
# admin.site.register(Item,ItemAdmin)

# class UsePackAdmin(admin.ModelAdmin):
#     pass
# admin.site.register(UsePack,UsePackAdmin)
# duifangdanwei = models.CharField(max_length=30,verbose_name="对方单位",null=True,blank=True)#对方单位
#     danwei = models.CharField(max_length=30,verbose_name="用户单位",null=True,blank=True)#用户单位
#     xianmu=models.CharField(max_length=30,verbose_name="项目名称",null=True,blank=True)#项目名称
#     xianmujiancheng=models.CharField(unique=True,max_length=30,verbose_name="项目简称",null=True,blank=True)#项目简称
#     name =  models.CharField(max_length=30,verbose_name="姓名",null=True,blank=True)#姓名
#     nashuiren_code =  models.CharField(max_length=30,verbose_name="纳税人识别号")#纳税人识别号
#     kaipiao_date = models.DateField(null=True,blank=True,verbose_name="时间",default=datetime.datetime.now)#时间
#     bh=models.CharField(max_length=30,verbose_name="发票号")#发票号
#     money=  models.FloatField(default=0.0,verbose_name="含税金额")#含税金额
#     shui=  models.FloatField(default=0.0,verbose_name="税额")#税额
#     state =  models.CharField(max_length=30,verbose_name="发票入账情况",null=True,blank=True)#发票入账情况
class ContactAdmin(admin.ModelAdmin):
    date_hierarchy = 'kaipiao_date'
    list_display =  ('kaipiao_date','danwei','name','duifangdanwei', 'xianmu')
    list_filter = ('danwei',)
    search_fields = ('name', 'danwei','duifangdanwei')
    ordering=('-kaipiao_date'),
    list_per_page=10
admin.site.register(Contact,ContactAdmin)




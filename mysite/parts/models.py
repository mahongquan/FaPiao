# -*- coding: utf-8 -*-
from django.db import models
import datetime
import logging
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.utils.safestring import mark_safe
from django.db.models.deletion import CASCADE, SET_DEFAULT, SET_NULL
import myutil
class Contact(models.Model,myutil.MyModel):
    #=======销售===========
    duifangdanwei = models.CharField(max_length=30,verbose_name="对方单位",null=True,blank=True)#对方单位
    danwei = models.CharField(max_length=30,verbose_name="用户单位",null=True,blank=True)#用户单位
    xianmu=models.CharField(max_length=30,verbose_name="项目名称",null=True,blank=True)#项目名称
    xianmujiancheng=models.CharField(unique=True,max_length=30,verbose_name="项目简称",null=True,blank=True)#项目简称
    name =  models.CharField(max_length=30,verbose_name="姓名",null=True,blank=True)#姓名
    nashuiren_code =  models.CharField(max_length=30,verbose_name="纳税人识别号")#纳税人识别号
    kaipiao_date = models.DateField(null=True,blank=True,verbose_name="日期",default=datetime.datetime.now)#时间
    bh=models.CharField(max_length=30,verbose_name="发票号")#发票号
    money=  models.FloatField(default=0.0,verbose_name="含税金额")#含税金额
    shui=  models.FloatField(default=0.0,verbose_name="税额")#税额
    state =  models.CharField(max_length=30,verbose_name="发票入账情况",null=True,blank=True)#发票入账情况
    zzshui=models.BooleanField(verbose_name="增值税发票",default=False)#增值税发票
    def json(self):
        fields=type(self)._meta.fields
        dic1={}
        for f in fields:
            if f.name in ["image"]:
                pass
            else:
                exec("dic1['%s']=self.%s" %(f.name,f.name))
        #dic1["_id"]=self.id
        return dic1    
    @classmethod
    def mycreate(type1,data):
        logging.info(data)
        logging.info(type1)
        fields=type1._meta.fields
        c=Contact()     
        for f in fields:
            if data.get(f.name)!=None:
                exec("c.%s=data['%s']" %(f.name,f.name))
        return c    
    def myupdate(self,data):
        fields=type(self)._meta.fields
        logging.info(data)
        for f in fields:
            if data.get(f.name)!=None:
                exec("self.%s=data['%s']" %(f.name,f.name)) 
    class Meta:
        verbose_name="发票"
        verbose_name_plural="发票"
    # def huizong(self):
    #     items=[]
    #     items2=[]
    #     for cp in self.usepack_set.all():
    #         for pi in cp.pack.packitem_set.all():
    #             pi.item.ct=pi.ct
    #             if not pi.quehuo:
    #                 items=addItem(items,pi.item)
    #             else:
    #                 items2=addItem(items2,pi.item)
    #     return (items,items2)
    # def huizong2(self):
    #     items=[]
    #     items2=[]
    #     for cp in self.usepack_set.all():
    #         if cp.pack.name!="调试必备":
    #             for pi in cp.pack.packitem_set.all():
    #                 pi.item.ct=pi.ct
    #                 if not pi.quehuo:
    #                     items=addItem(items,pi.item)
    #                 else:
    #                     items2=addItem(items2,pi.item)
    #     return (items,items2)        

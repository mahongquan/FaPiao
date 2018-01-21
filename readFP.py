import xlrd
import os
import sys
import codecs
import django
from django.core.exceptions import ObjectDoesNotExist
import re
def mylistdir(p,f):
    a=os.listdir(p)
    fs=myfind(a,f)
    return(fs)
def myfind(l,p):
    lr=[];
    #print p
    p1=p.replace(".",r"\.")
    p2=p1.replace("*",".*")
    p2=p2+"$"
    for a in l:
        #print a
        if  re.search(p2,a,re.IGNORECASE)==None :
           pass
           #print "pass"
        else:
           lr.append(a)
       #print "append"
    return lr
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()
from mysite.parts.models import *
# def treatOne(rows,fn):
# 	beizhu=rows[1][7]
# 	if beizhu[:2]=="CS" or beizhu[:2]=="ON":
# 		try:
# 			d=Danju.objects.get(danjuhao=rows[0][1])
# 		except ObjectDoesNotExist as e2:
# 			d=Danju()
# 		d.filename=fn
# 		d.danjuhao=rows[0][1]
# 		d.danju_date=rows[0][3]
# 		d.cangku=rows[0][5]
# 		d.bumeng=rows[0][7]
# 		d.gongying=rows[1][1]
# 		if rows[1][3]!="":
# 			d.shenhe=rows[1][3]
# 		d.leibie=rows[1][5]
# 		d.beizhu=rows[1][7]
# 		d.zhidan=rows[-2][3]
# 		d.qianzi=rows[-2][7]
# 		d.save()
# 		n=len(rows)
# 		print(n)
# 		items=rows[4:4+n-4-3]
# 		for i in items:
# 			#i=DanjuItem()
# 			print(i[1],i[2],i[3],i[4],i[5])
# 			items=Item.objects.filter(bh=i[1]).all()
# 			if len(items)>1:
# 				item=items[0]
# 			else:
# 				item=Item()
# 			item.bh=i[1]
# 			item.name=str(i[2])+" "+str(i[1])
# 			item.guige=i[3]
# 			item.danwei=i[4]
# 			item.save()
# 			di=DanjuItem()
# 			di.item=item
# 			di.ct=i[5]
# 			di.danju=d
# 			di.save()
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
def readfile(fn):
	book = xlrd.open_workbook(fn)
	#print(book.sheets())
	#return
	table=book.sheets()[19]
	nrows = table.nrows
	ncols = table.ncols
	begin=False
	dan=[]
	for i in range(nrows)[2:]:
		print(i,table.row_values(i))
		di=Contact()
		dt=str(table.row_values(i)[0]).replace(".","-")
		if dt.replace(" ","")!="":
			di.kaipiao_date=dt
		di.danwei=table.row_values(i)[1]
		di.name=table.row_values(i)[2]
		di.duifangdanwei=table.row_values(i)[3]
		di.xianmu=table.row_values(i)[4]
		di.xianmujiancheng=table.row_values(i)[5]
		di.nashuiren_code=table.row_values(i)[6]
		bh=table.row_values(i)[7]
		if bh=="":
			continue
		di.bh=bh
		money=table.row_values(i)[8]
		if money=="":
			di.money=0
		else:
			di.money=money
		shui=table.row_values(i)[9]
		if shui=="":
			di.shui=0
		else:
			di.shui=shui
		di.state=table.row_values(i)[10]
		di.save()
if __name__=="__main__":
	readfile("data.xls")



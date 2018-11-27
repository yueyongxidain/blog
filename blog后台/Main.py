#coding=utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf8')
#-----------------------------------以上为控制编码方式
from flask import Flask;    #创建flask应用
from flask import request,Response;  #接受请求
from flask import jsonify;  #转换成json
import MySQLdb     #连接数据库
import json      #解析json
import os
import random,string
import datetime
app = Flask(__name__)
db = MySQLdb.connect("localhost", "root", "xfgh1234", "blog", charset='utf8' )
# 使用cursor()方法获取操作游标
cursor = db.cursor()
#================关于工具页面的操作===================
@app.route('/findtool',methods=['POST','GET'])
def findtool():
    if request.method == "POST":
        findsql = "SELECT * FROM tool ORDER BY id ASC"
        try:
            # 执行SQL语句
            cursor.execute(findsql)
            # 获取所有记录列表
            results = cursor.fetchall()
            data = []
            for row in results:
                data.append({
                    "id": row[0],
                    "title": row[1],
                    "content": row[2],
                    "baidu": row[3],
                    "personal": row[4]
                })
            return jsonify({"errorCode": "0", "errorMsg":"","data": data})
        except:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
    return jsonify({"errorCode": "1","errorMsg":"请求出错"})
@app.route('/changetool',methods=['POST'])
def changetool():
    if request.method == "POST":
        dat = json.loads(request.data)
        if "id" in dat:   #如果存在id即修改   不存在就是新增
            id = dat["id"]
            sql = "update tool set title=%s, content=%s, baidu=%s, personal=%s where id=%s"
            param=(dat["title"],dat["content"],dat["baidu"],dat["personal"],dat["id"])
        else:
            sql = "insert into tool(title,content,baidu,personal) values(%s,%s,%s,%s)"
            param=(dat["title"],dat["content"],dat["baidu"],dat["personal"])
            print sql
        try:
            #执行SQL语句
            count=cursor.execute(sql,param)
            print count
            db.commit()
            return jsonify({"errorCode": "0", "errorMsg":"","data": count})
        except:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
    return jsonify({"errorCode": "1","errorMsg":"请求出错"})
@app.route('/deletetool',methods=['POST'])
def deletetool():
    if request.method == "POST":
        dat = json.loads(request.data)
        if "id" in dat:
            id = dat["id"]
            sql = "delete from tool where id=%s"
            param=(id)
        else:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
        try:
            #执行SQL语句
            count=cursor.execute(sql,param)
            print count
            db.commit()
            return jsonify({"errorCode": "0", "errorMsg":"","data": count})
        except:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
    return jsonify({"errorCode": "1","errorMsg":"请求出错"})
#=========================htmlDemo页面的操作==============================
@app.route('/findhtmlDemo',methods=['POST'])
def findhtmlDemo():
    if request.method == "POST":
        dat = json.loads(request.data)
        if dat !={}:
            id = dat["id"]
            findsql = "SELECT * FROM htmldemo where id=" + id + " ORDER BY createtime DESC"
        else:
            findsql = "SELECT * FROM htmldemo ORDER BY createtime DESC"
        try:
            # 执行SQL语句
            cursor.execute(findsql)
            # 获取所有记录列表
            results = cursor.fetchall()
            data = []
            print results
            for row in results:
                data.append({
                    "id": row[0],
                    "title": row[1],
                    "descript": row[2],
                    "content": row[3],
                    "createtime": row[4],
                    "img": row[5]
                })
            return jsonify({"errorCode": "0", "errorMsg":"","data": data})
        except:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
    return jsonify({"errorCode": "1","errorMsg":"请求出错"})
@app.route('/changedemo',methods=['POST'])
def changedemo():
    if request.method == "POST":
        dat = json.loads(request.data)
        time=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        if "id" in dat:   #如果存在id即修改   不存在就是新增
            print "修改"
            id = dat["id"]
            sql = "update htmldemo set title=%s, descript=%s, content=%s, createtime=%s  where id=%s"
            param=(dat["title"],dat["descript"],dat["content"],time,dat["id"])
        else:
            sql = "insert into htmldemo(title,descript,content,createtime) values(%s,%s,%s,%s)"
            param=(dat["title"],dat["descript"],dat["content"],time)
            print sql
        try:
            #执行SQL语句
            count=cursor.execute(sql,param)
            print count
            db.commit()
            return jsonify({"errorCode": "0", "errorMsg":"","data": count})
        except:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
    return jsonify({"errorCode": "1","errorMsg":"请求出错"})
@app.route('/deletedemo',methods=['POST'])
def deletedemo():
    if request.method == "POST":
        dat = json.loads(request.data)
        if "id" in dat:
            id = dat["id"]
            sql = "delete from htmldemo where id=%s"
            param=(id)
        else:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
        try:
            #执行SQL语句
            count=cursor.execute(sql,param)
            print count
            db.commit()
            return jsonify({"errorCode": "0", "errorMsg":"","data": count})
        except:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
    return jsonify({"errorCode": "1","errorMsg":"请求出错"})
#==============================react页面的操作=======================================
@app.route('/findreact',methods=['POST'])
def findreact():
    if request.method == "POST":
        dat = json.loads(request.data)
        if dat !={}:
            id = dat["id"]
            findsql = "SELECT * FROM react where id=" + id + " ORDER BY createtime DESC"
        else:
            findsql = "SELECT * FROM react ORDER BY createtime DESC"
        try:
            # 执行SQL语句
            cursor.execute(findsql)
            # 获取所有记录列表
            results = cursor.fetchall()
            data = []
            print results
            for row in results:
                data.append({
                    "id": row[0],
                    "title": row[1],
                    "content": row[2],
                    "createtime": row[3],
                })
            return jsonify({"errorCode": "0", "errorMsg":"","data": data})
        except:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
    return jsonify({"errorCode": "1","errorMsg":"请求出错"})
@app.route('/changereact',methods=['POST'])
def changereact():
    if request.method == "POST":
        dat = json.loads(request.data)
        time=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        if "id" in dat:   #如果存在id即修改   不存在就是新增
            print "修改"
            id = dat["id"]
            sql = "update react set title=%s, content=%s, createtime=%s  where id=%s"
            param=(dat["title"],dat["content"],time,dat["id"])
        else:
            sql = "insert into react( title ,content ,createtime) values(%s,%s,%s)"
            param=(dat["title"],dat["content"],time)
            print dat
        try:
            #执行SQL语句
            print dat
            count=cursor.execute(sql,param)
            print count
            db.commit()
            return jsonify({"errorCode": "0", "errorMsg":"","data": count})
        except:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
    return jsonify({"errorCode": "1","errorMsg":"请求出错"})
@app.route('/deletereact',methods=['POST'])
def deletereact():
    if request.method == "POST":
        dat = json.loads(request.data)
        if "id" in dat:
            id = dat["id"]
            sql = "delete from react where id=%s"
            param=(id)
        else:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
        try:
            #执行SQL语句
            count=cursor.execute(sql,param)
            print count
            db.commit()
            return jsonify({"errorCode": "0", "errorMsg":"","data": count})
        except:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
    return jsonify({"errorCode": "1","errorMsg":"请求出错"})

#==========================python页面的操作===================================================
@app.route('/findpython',methods=['POST'])
def findpython():
    if request.method == "POST":
        dat = json.loads(request.data)
        if dat !={}:
            id = dat["id"]
            findsql = "SELECT * FROM python where id=" + id + " ORDER BY createtime DESC"
        else:
            findsql = "SELECT * FROM python ORDER BY createtime DESC"
        try:
            # 执行SQL语句
            cursor.execute(findsql)
            # 获取所有记录列表
            results = cursor.fetchall()
            data = []
            print results
            for row in results:
                data.append({
                    "id": row[0],
                    "title": row[1],
                    "descript": row[2],
                    "content": row[3],
                    "createtime": row[4],
                })
            return jsonify({"errorCode": "0", "errorMsg":"","data": data})
        except:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
    return jsonify({"errorCode": "1","errorMsg":"请求出错"})
@app.route('/changepython',methods=['POST'])
def changepython():
    if request.method == "POST":
        dat = json.loads(request.data)
        time=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        if "id" in dat:   #如果存在id即修改   不存在就是新增
            print "修改"
            id = dat["id"]
            sql = "update python set title=%s, descript=%s, content=%s, createtime=%s  where id=%s"
            param=(dat["title"],dat["descript"],dat["content"],time,dat["id"])
        else:
            sql = "insert into python(title,descript,content,createtime) values(%s,%s,%s,%s)"
            param=(dat["title"],dat["descript"],dat["content"],time)
            print sql
            print dat
        try:
            #执行SQL语句
            count=cursor.execute(sql,param)
            print count
            db.commit()
            return jsonify({"errorCode": "0", "errorMsg":"","data": count})
        except:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
    return jsonify({"errorCode": "1","errorMsg":"请求出错"})
#===========================img上传操作===================================
@app.route('/img',methods=['POST'])
def img():
    if request.method == "POST" :
        basedir = ""+os.path.abspath(os.path.dirname(__file__))
        # 生成随机字符串，防止图片名字重复
        ran_str = ("".join(random.sample(string.ascii_letters + string.digits, 16))).encode('utf-8')
        # 获取图片文件
        img = request.files.get('file')
        print "拿到图片"
        # 定义一个图片存放的位置
        path = basedir + "/static/img/"
        # print type(path)
        # 图片名称
        imgName = ran_str+(img.filename).encode('utf-8')
        # print type(imgName)
        # 图片path和名称
        file_path = path+imgName
        print file_path
        # 保存图片
        img.save(file_path)
        # 这个是图片的访问路径，需返回前端（可有可无）
        url =  imgName
        # 要返回前端的json
        resData = {
            "errorCode":0,
            "fileName": imgName,
            "url": url
        }
        # 返回json 到前端
        return json.dumps(resData, ensure_ascii=False)
    return jsonify({"errorCode": "1","errorMsg":"请求出错"})
@app.route('/img/<imgId>',methods=['GET'])
def retimg(imgId):
        print imgId
        if imgId is None:
            pass
        else:
            print "图片名字："+imgId
            image_data = open(os.path.join('static/img/%s' % imgId), "rb").read()
            response = Response(image_data, mimetype="image/jpeg")
            # response.headers['Content-Type'] = 'image/png'
            return response
if __name__ == "__main__":
    app.run(host="127.0.0.1",port=8088)
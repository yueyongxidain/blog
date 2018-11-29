#coding=utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf8')
#-----------------------------------以上为控制编码方式
from flask import Flask;    #创建flask应用
from flask import request,Response;  #接受请求
from flask import jsonify;  #转换成json
from flask import make_response
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
@app.route('/findtool',methods=['POST','OPTIONS'])
def findtool():
    if request.method == "OPTIONS" or request.method == "POST":
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
            response = make_response(jsonify({"errorCode": "0", "errorMsg":"","data": data}))
            response.headers['Access-Control-Allow-Credentials'] = 'true'
            response.headers['access-control-allow-origin'] = request.environ['HTTP_ORIGIN']
            response.headers['Access-Control-Allow-Methods'] = 'POST,OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type,Accept'
            return response
        except:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
    return jsonify({"errorCode": "1","errorMsg":"请求出错"})
@app.route('/changetool',methods=['POST','OPTIONS'])
def changetool():
    if request.method == "POST":
        dat = json.loads(request.data)
        if "id" in dat:   #如果存在id即修改   不存在就是新增
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
            response = make_response(jsonify({"errorCode": "0", "errorMsg": "", "data": count}))
        except:
            response = make_response(jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"}))
    if request.method == "OPTIONS":
        response = make_response()
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['access-control-allow-origin'] = request.environ['HTTP_ORIGIN']
    response.headers['Access-Control-Allow-Methods'] = 'POST,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type,Accept'
    return response
@app.route('/deletetool',methods=['POST','OPTIONS'])
def deletetool():
    if request.method == "POST":
       if request.data is not None:
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
                response = make_response(jsonify({"errorCode": "0", "errorMsg": "", "data": count}))
            except:
                response = make_response(jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"}))
    else:
        response = make_response()
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['access-control-allow-origin'] = request.environ['HTTP_ORIGIN']
    response.headers['Access-Control-Allow-Methods'] = 'POST,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type,Accept'
    return response
#=========================htmlDemo页面的操作==============================
@app.route('/findhtmlDemo',methods=['POST','OPTIONS'])
def findhtmlDemo():
    if request.method == "POST":
        print request.data
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
            response = make_response(jsonify({"errorCode": "0", "errorMsg": "", "data": data}))
        except:
            response = make_response(jsonify({"errorCode": "0", "errorMsg": "", "data": data}))
    else:
        response = make_response()
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['access-control-allow-origin'] = request.environ['HTTP_ORIGIN']
    response.headers['Access-Control-Allow-Methods'] = 'POST,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type,Accept'
    return response
@app.route('/changedemo',methods=['POST','OPTIONS'])
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
            response = make_response(jsonify({"errorCode": "0", "errorMsg": "", "data": count}))
        except:
            response = make_response(jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"}))
    else:
        response = make_response()
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['access-control-allow-origin'] = request.environ['HTTP_ORIGIN']
    response.headers['Access-Control-Allow-Methods'] = 'POST,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type,Accept'
    return response
@app.route('/deletedemo',methods=['POST','OPTIONS'])
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
            response = make_response(jsonify({"errorCode": "0", "errorMsg": "", "data": count}))

        except:
            response = make_response(jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"}))
    else:
        response = make_response()
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['access-control-allow-origin'] = request.environ['HTTP_ORIGIN']
    response.headers['Access-Control-Allow-Methods'] = 'POST,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type,Accept'
    return response
#==============================react页面的操作=======================================
@app.route('/findreact',methods=['POST','OPTIONS'])
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
            response = make_response(jsonify({"errorCode": "0", "errorMsg": "", "data": data}))
        except:
            response = make_response(jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"}))
    else:
        response = make_response()
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['access-control-allow-origin'] = request.environ['HTTP_ORIGIN']
    response.headers['Access-Control-Allow-Methods'] = 'POST,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type,Accept'
    return response
@app.route('/changereact',methods=['POST','OPTIONS'])
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
        try:
            #执行SQL语句
            print dat
            count=cursor.execute(sql,param)
            print count
            db.commit()
            response = make_response(jsonify({"errorCode": "0", "errorMsg": "", "data": count}))

        except:
            response = make_response(jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"}))
    else:
        response = make_response(jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"}))
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['access-control-allow-origin'] = request.environ['HTTP_ORIGIN']
    response.headers['Access-Control-Allow-Methods'] = 'POST,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type,Accept'
    return response
@app.route('/deletereact',methods=['POST','OPTIONS'])
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
            response = make_response(jsonify({"errorCode": "0", "errorMsg": "", "data": count}))

        except:
            response = make_response(jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"}))
    else:
        response = make_response()
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['access-control-allow-origin'] = request.environ['HTTP_ORIGIN']
    response.headers['Access-Control-Allow-Methods'] = 'POST,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type,Accept'
    return response
#==========================python页面的操作===================================================
@app.route('/findpython',methods=['POST','OPTIONS'])
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
            response = make_response(jsonify({"errorCode": "0", "errorMsg": "", "data": data}))
        except:
            response = make_response(jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"}))
    else:
        response = make_response()
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['access-control-allow-origin'] = request.environ['HTTP_ORIGIN']
    response.headers['Access-Control-Allow-Methods'] = 'POST,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type,Accept'
    return response
@app.route('/changepython',methods=['POST','OPTIONS'])
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
            response = make_response(jsonify({"errorCode": "0", "errorMsg": "", "data": count}))
        except:
            response = make_response(jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"}))
    else:
        response = make_response()
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['access-control-allow-origin'] = request.environ['HTTP_ORIGIN']
    response.headers['Access-Control-Allow-Methods'] = 'POST,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type,Accept'
    return response
@app.route('/deletepython',methods=['POST','OPTIONS'])
def deletepython():
    if request.method == "POST":
        dat = json.loads(request.data)
        if "id" in dat:
            id = dat["id"]
            sql = "delete from python where id=%s"
            param=(id)
        else:
            return jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"})
        try:
            #执行SQL语句
            count=cursor.execute(sql,param)
            print count
            db.commit()
            response = make_response(jsonify({"errorCode": "0", "errorMsg": "", "data": count}))

        except:
            response = make_response(jsonify({"errorCode": "1", "errorMsg": "系统出错，稍后重试！"}))
    else:
        response = make_response()
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['access-control-allow-origin'] = request.environ['HTTP_ORIGIN']
    response.headers['Access-Control-Allow-Methods'] = 'POST,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type,Accept'
    return response
#===========================img上传操作===================================
@app.route('/img',methods=['POST','OPTIONS'])
def img():
    if request.method == "POST":
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
        response = make_response(json.dumps(resData, ensure_ascii=False))
    else:
        response = make_response()
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['access-control-allow-origin'] = request.environ['HTTP_ORIGIN']
    response.headers['Access-Control-Allow-Methods'] = 'POST,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type,Accept'
    return response
@app.route('/img/<imgId>',methods=['GET','OPTIONS'])
def retimg(imgId):
        print imgId
        if imgId is None:
            pass
        else:
            print "图片名字："+imgId
            image_data = open(os.path.join('static/img/%s' % imgId), "rb").read()
            response = make_response(Response(image_data, mimetype="image/jpeg"))
            # response.headers['Content-Type'] = 'image/png'
            response.headers['Access-Control-Allow-Credentials'] = 'true'
            response.headers['access-control-allow-origin'] = 'http://127.0.0.1'
            response.headers['Access-Control-Allow-Methods'] = ',OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type,Accept'
            return response
if __name__ == "__main__":
    app.run(host="0.0.0.0",port=8088)
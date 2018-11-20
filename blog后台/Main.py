#coding=utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf8')
#-----------------------------------以上为控制编码方式
from flask import Flask;    #创建flask应用
from flask import request;  #接受请求
from flask import jsonify;  #转换成json
import MySQLdb     #连接数据库
import json      #解析json
app = Flask(__name__)
db = MySQLdb.connect("localhost", "root", "xfgh1234", "blog", charset='utf8' )
# 使用cursor()方法获取操作游标
cursor = db.cursor()
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
@app.route('/findhtmlDemo',methods=['POST'])
def findhtmlDemo():
    if request.method == "POST":
        dat = json.loads(request.data)
        if dat !={}:
            id = dat["id"]
            findsql = "SELECT * FROM htmlDemo where id=" + id + " ORDER BY createtime DESC"
        else:
            findsql = "SELECT * FROM htmlDemo ORDER BY createtime DESC"
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
if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000)
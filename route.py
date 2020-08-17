"""
路由控制
"""

# cython: language_level=3
import configparser
from flask import Flask,render_template,request,jsonify

from route.device import Device

app = Flask(
    __name__,
    static_folder='static',
    static_url_path=''
)
app.debug=True
cp = configparser.RawConfigParser()

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/restart",methods=['GET', 'POST'])
def restart():
    url = request.form['url']
    password = request.form['password']
    device = Device(url, password)
    result = device.restart
    return jsonify(result)

@app.route("/save",methods=['GET', 'POST'])
def save():
    url = request.form['url']
    password = request.form['password']
    cp.read("config.cfg")
    cp.set("setting", "url", url)
    cp.set("setting", "password", password)
    cp.write(open("config.cfg", "w"))
    return jsonify({'status':'success','msg':'ok'})

@app.route("/getCfg",methods=['GET', 'POST'])
def getCfg():
    cp.read("config.cfg")
    url = cp.get("setting", "url")
    password = cp.get("setting", "password")
    return jsonify({'url': url, 'password': password})


if __name__=='__main__':
    app.run(port=5001)
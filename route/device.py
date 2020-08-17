"""
路由控制类
   inputPwd 密码输入框
    loginSub 提交按钮
"""
import time

from selenium import webdriver
from flask import json,jsonify
from selenium.webdriver.chrome.options import Options

class Device:
    def __init__(self, routerUrl,password):
        chrome_options =Options()
        chrome_options.add_argument('--headless')
        chromeDriverPath = r'.\tools\chromedriver.exe'
        self.driver = webdriver.Chrome(options=chrome_options, executable_path=chromeDriverPath)
        self.routerUrl = routerUrl
        self.password = password
        # self.driver = webdriver.Chrome()

    @property
    def restart(self):
        print("开始")
        resultDict = {}
        try:
            self.driver.get(self.routerUrl)
            self.driver.implicitly_wait(30)
            self.driver.find_element_by_id("lgPwd").clear()
            self.driver.find_element_by_id("lgPwd").send_keys(self.password)
            self.driver.find_element_by_id("loginSub").click()
            time.sleep(3)
            #进入页面

            #点击 路由设置
            self.driver.execute_script("document.getElementById('routerSetMbtn').click()")
            time.sleep(3)
            #点击 上网设置
            self.driver.execute_script("document.getElementById('network_rsMenu').click()")
            time.sleep(3)
            #点击 断开
            self.driver.find_element_by_id("disconnect").click()
            time.sleep(3)
            # 点击 连接
            self.driver.find_element_by_id("save").click()

            self.driver.close()
            self.driver.quit()
            resultDict = {'status': 'success', 'msg': '路由器重启成功，请等到5分钟'}

        except Exception as e:
            try:
                self.driver.close()
                self.driver.quit()
            except:
                print("sss")
            resultDict = {'status': 'error', 'msg': '路由器重启失败:'}

        return resultDict

if __name__ == '__main__':
    device = Device("http://114.241.107.229:8001/","bjshansi.com")
    result = device.restart
    print(result)

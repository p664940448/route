"""
邮件
"""

import smtplib
from email.mime.text import MIMEText
from email.header import Header


class Mail:

    def __init__(self, smtpServer, fromMail, password):
        self.smtpServer = smtpServer
        self.fromMail = fromMail
        self.password = password

    def sendMail(self, toMail, title, content):
        msg = MIMEText(content, 'plain', 'utf-8')
        msg['From'] = Header(self.fromMail)
        msg['To'] = Header(toMail)
        msg['Subject'] = Header(title)

        server = smtplib.SMTP_SSL(host=self.smtpServer)
        server.connect(self.smtpServer)
        server.login(self.fromMail, self.password)
        server.sendmail(self.fromMail, toMail, msg.as_string())

        server.quit()

if __name__ == '__main__':
    mail = Mail("smtp.yeah.net", "chhp1234@yeah.net", "SXDCVVWMKJBUWLMY")
    mail.sendMail("chhp1234@yeah.net", "路由器地址", "此邮件查看路由器地址")

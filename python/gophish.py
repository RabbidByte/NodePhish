import sys
import csv
import smtplib
import time
from email.header import Header
from email.utils import formataddr
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from string import Template


def csvCycle(fileName):
	print "[+]  Ripping through the csv now ..."
	with open(fileName) as csv_file:
		csv_reader = csv.reader(csv_file, delimiter=',')
		line_count = 0
		names = []
		emails = []
		ids = []
		for row in csv_reader:
			if line_count == 0:
				line_count += 1
			else:
				names.append(row[0])
				emails.append(row[1])
				ids.append(row[2])
				line_count += 1
		print "[+]  Processed %s lines." %line_count
	return names, emails, ids

def read_template(templateName):
	with open(templateName, 'r')as template_file:
		template_file_content = template_file.read()
	return Template(template_file_content)

def main():
	if len(sys.argv) != 2:
		print "(+) usage: %s <csv file name>" %sys.argv[0]
		print '(+) eg: %s /root/mine.csv' %sys.argv[0]
		exit(1)
	csvFile = sys.argv[1]

	print "[+]  Going to cycle through the csv and send emails"
	names, emails, ids = csvCycle(csvFile)
	message_template = read_template("email.txt")

	#send emails
	s = smtplib.SMTP(host='smtp.DOMAIN.com')
	for name, email, id in zip(names, emails, ids):
		error = None
		msg = MIMEMultipart()
		message = message_template.substitute(EMAIL_ADDRESS=email.title().lower(), ID_NUMBER=id.title())

		msg['From']=formataddr((str(Header('COMPANY IT', 'utf-8')), 'it@DOMAIN.com'))
		msg['To']=email
		msg['Subject']="Microsoft account storage alert"

		msg.attach(MIMEText(message, 'html'))
		print "[+]  Sending email to %s" %email
		try:
			s.sendmail(msg['From'], msg['To'], msg.as_string())
		except:
			print "\t[-]  Failed: Could be Greylisting"
			error = 0
		if error == 0:
			try:
				time.sleep(5)
				s.sendmail(msg['From'], msg['To'], msg.as_string())
			except:
				print "\t[-]  Failed: Could not send email to: %s" %email

		del msg
	s.quit()

if __name__ == "__main__":
	main()

# NodePhish
Very Simple NodeJS Phishing "platform".  User phish.ps1 to generate a csv with usernames, emails, and random ID string.  Setup the NodeJS site and change variables within the site for your scenario.  Once the site is up and running use the python script to send emails.

Logs are created and they are to be used to identify users that need additional "security awareness" training.  Users should then be forced to change those passwords.  The password change can be confirmed using the powershell script AD-Password-Last-Set-GonePhishing.ps1

## Node Folder

This is where the "Phishing Site" is.  Replace all "COMPANY" strings with what makes sense for your deployment.
You can configure https for the site if you wish, if not comment out the lines relating to https.
[node server.js] to start the server

## Powershell Folder

phish.ps1 - this script will connect to an ActiveDirectory controller and pull email addresses with names and assign a random string for tracking
AD-Password-Last-Set-GonePhishing.ps1 - this script is for after the engagement.  Tracks the users that fell for the phishing campaing and checks to see if passwords were reset or not.

## Python Folder

email.txt - HTML template for the emails to be sent out
gophish.py - Generates emails and sends em out

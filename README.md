# Installation Instructions

If you simply want to use the program, then I've taken the liberty of hosting it live at [redacted-url]

More advanced users that want to host the project for their own have to install nodejs

The first step is to download the latest nodejs version, as well as npm, a package manager

Windows:
Download the latest .exe installer from the nodejs website, and follow the install dialog. This will also automatically download the latest version of npm

Linux (Debian):
```
sudo apt update
sudo apt install nodejs

# Install npm
sudo apt install npm
```

You will then need to install the necessary components for this project to work correctly
```
npm install express express-session body-parser pm2

#pm2 is a process manager for nodejs that allows you to easily daemonize applications. It is not required, but highly reccomended
```
Lastly, you will need to create a directory and download the files for the project. You can do this either by downloading the zip file of the github repo on the browser, through cURL, or cloning the repository.
```
git clone https://github.com/Alphraneous/FBLAProject2024.git

# or

curl -L https://api.github.com/repos/Alphraneous/FBLAProject2024/tarball | tar -xzvf - --strip-components 1
```

Finally, run the project, either directly or using pm2 (recommended)
```
node path/to/auth.js

#or

pm2 start path/to/auth.js
```
This will start a server on port 3000 (port can be changed in auth.js). You can then use a reverse proxy such as NGINX to turn it into a live server

Made with love
Enjoy!

-Alphraneous

# How to use
- Add companies by clicking the add company button and filling out the fields in the dialog box, or by importing a previously exported list using the import button
- Search companies by name, resources, location, founding year, and website
- Click on a company to reveal a side panel of information, where you can remove that company or edit it

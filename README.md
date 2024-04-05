# Installation Instructions

If you simply want to use the program, then I've taken the liberty of hosting it live at https://fbla.ajaxcore.com

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
npm install -g express express-session body-parser mysql dotenv pm2

#pm2 is a process manager for nodejs that allows you to easily daemonize applications. It is not required, but highly reccomended
```
Create a directory and download the files for the project. You can do this either by downloading the zip file of the github repo on the browser, through cURL, or cloning the repository.
```
git clone https://github.com/Alphraneous/FBLAProject2024.git

# or

curl -L https://api.github.com/repos/Alphraneous/FBLAProject2024/tarball | tar -xzvf - --strip-components 1
```
You will then need to set up a database server to handle database requests. Visit [the mySQL docs](https://dev.mysql.com/doc/mysql-getting-started/en/) or the [MariaDB docs](https://mariadb.com/kb/en/getting-installing-and-upgrading-mariadb/) to get started. 

Once this is done, you will need to create a database of your own choosing, and create a table within it called userData containing 4 columns: username, name, password, and companiesList. Create a user and grant it all priviledges to this database. Sample code for doing this is below:

```
CREATE DATABASE business_beacon;

CREATE USER 'beaconUser'@'%' IDENTIFIED BY 'dbUserPassword';

GRANT ALL PRIVILEGES ON business_beacon TO 'beaconUser'@'%';

FLUSH PRIVILEGES;

CREATE TABLE userData (
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    companyList JSON,
    PRIMARY KEY (username)
);
```
To properly initialize everything, you will need to create a .env file. Rename the example.env file included in the GitHub to .env, and edit it as follows:
```
DATABASE_HOST=localhost
DATABASE_NAME=business_beacon
DATABASE_USER=beaconUser
DATABASE_PASSWORD=dbUserPassword
PORT=3000
SECRET_KEY=yourSecretKey
```

If you're running the sql server on the same host as the program itself, the database host will be localhost, but if not, will be an IP address or domain name
Your secret key should be a random alphanumeric sequence of some kind, used to encrypt the session manager

Finally, run the project, either directly or using pm2 (recommended)
```
node path/to/auth.js

#or

pm2 start path/to/auth.js
```
This will start a server on port 3000 (port can be changed in your .env). You can then use a reverse proxy such as NGINX to turn it into a live server

Made with love  
Enjoy!

-Alphraneous

# How to use
- Add companies by clicking the add company button and filling out the fields in the dialog box, or by importing a previously exported list using the import button
- Search companies by name, resources, location, founding year, and website
- Click on a company to reveal a side panel of information, where you can remove that company or edit it

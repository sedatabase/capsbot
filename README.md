# capsbot
Steemit Discord Upvote and Coin Price Bot
<hr>

```
sudo rm /var/lib/apt/lists/lock
sudo rm /var/cache/apt/archives/lock
sudo rm /var/lib/dpkg/lock
```

```
wget https://raw.github.com/sdtyldz/capsbot/master/caps.js
wget https://raw.github.com/sdtyldz/capsbot/master/package.json
wget https://raw.github.com/sdtyldz/capsbot/master/package-lock.json
```

```
sudo apt-get install nodejs -y
sudo apt-get install nodejs-legacy -y
sudo apt-get install npm -y
npm install steem --save
npm install --no-optional eris
sudo npm i -g pm2
npm install mysql
```

```
npm install discordie
npm install discord.io
```

```
sudo apt-get update
sudo apt-get install mysql-server -y
```

```
sudo mysql_secure_installation
systemctl status mysql.service
```

```
mysql -u root -p
```

```
CREATE DATABASE caps;
USE caps;
```

```
CREATE TABLE caps (
id int(11) NOT NULL,
user text NOT NULL,
lastvote text NOT NULL,
userid text NOT NULL);
```

```
pm2 start caps.js
```

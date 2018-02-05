# capsbot
Steemit Discord Upvote and Coin Price Bot
<hr>

```
sudo rm /var/lib/apt/lists/lock<br>
sudo rm /var/cache/apt/archives/lock<br>
sudo rm /var/lib/dpkg/lock<br><br>
```

```
wget https://raw.github.com/sdtyldz/capsbot/master/caps.js<br>
wget https://raw.github.com/sdtyldz/capsbot/master/package.json<br>
wget https://raw.github.com/sdtyldz/capsbot/master/package-lock.json<br><br>
```

```
sudo apt-get install nodejs -y<br>
sudo apt-get install nodejs-legacy -y<br>
sudo apt-get install npm -y<br>
npm install steem --save<br>
npm install --no-optional eris<br>
sudo npm i -g pm2<br>
npm install mysql<br><br>
```

```
npm install discordie<br>
npm install discord.io<br><br>
```

```
sudo apt-get update<br>
sudo apt-get install mysql-server -y<br><br>
```

```
sudo mysql_secure_installation<br>
systemctl status mysql.service<br><br>
```

```
mysql -u root -p<br><br>
```

```
CREATE DATABASE caps;<br>
USE caps;<br><br>
```

```
CREATE TABLE caps (<br>
id int(11) NOT NULL,<br>
user text NOT NULL,<br>
lastvote text NOT NULL,<br>
userid text NOT NULL);<br><br>
```

```
pm2 start caps.js
```

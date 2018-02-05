const Eris = require("eris");
const steem = require("steem");
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "DATABASE-PASSWORD",
  database: "caps"
});
con.connect();
var bot = new Eris("DISCORD-TOKEN-KEY");
var regex = /(\$)+(upvote)+.+(https:\/\/)+.+(@)+.+(\/)/; 
var regex1 = /(@)+.+(\/)/;
var wifkey = 'STEEMIT-WIFKEY';
var votey = "STEEMIT-NICK";
var weight = 10000; // 10000 = 100%
var per = 10; // 86400 seconds = 24hour 
steem.api.setOptions({url: 'https://api.steemit.com'});
bot.on("ready", () => {console.log('caps bot started! weight '+weight+' %');}); //when it is ready
bot.on("messageCreate", (msg) => { // when a message is created
    if(msg.content.match(regex)){
        var permlink= msg.content.replace(msg.content.match(regex)[0],"");
        var au = msg.content.match(regex1)[0];
        var aut = au.replace("@","");
        var author = aut.replace("/","");
        var channel = msg.channel.id;
        var uid = msg.author.id;
        
        var x = '0';
        con.query('SELECT EXISTS(SELECT * FROM `caps` WHERE `userid` = "'+uid+'")', function (error, results, fields) {
            for(i in results){
                for(j in results[i]){
                    x = results[i][j];
                    if(x == '1'){
                        var last;
                        con.query('SELECT `lastvote` FROM `caps` WHERE `userid`="'+uid+'"', function (error, results, fields) {
                            for(i in results){
                                for(j in results[i]){
                                    last = results[i][j];
                                    
                                }
                            }
                            var time = Math.floor(new Date().getTime() / 1000);
                                if((time - last) > per){
                                    con.query('UPDATE `caps` SET `lastvote`="'+time+'" WHERE `userid`="'+uid+'"', function (error, results, fields) {
                                        steem.broadcast.vote(wifkey,votey,author,permlink,weight,function(downerr, result){
                                            if(downerr){
                                                setTimeout(function(){bot.createMessage(channel,'Başarısız! Daha önce zaten upvote yapıldı.');},1000);
                                                con.query('UPDATE `caps` SET `lastvote`="'+last+'" WHERE `userid`="'+uid+'"', function (error, results, fields) {
                                                });
                                            }
                                            if(result) {
                                                setTimeout(function(){bot.createMessage(channel,'Başarılı! Gönderinize @caps tarafından upvote yapıldı.');},1000);
                                            }
                                        });
                                    });
                                }else{
                                    var come = per - (time - last);
                                    setTimeout(function(){bot.createMessage(channel,'Üzgünüm! Daha sonra tekrar dene '+come+' saniye.');},1000);
                                }
                        });
                        
                    }else{
                        var time = Math.floor(new Date().getTime() / 1000);
                        con.query('INSERT INTO `caps`(`user`, `lastvote`, `userid`) VALUES ("'+author+'","'+time+'","'+uid+'")', function (error, results, fields) {
                            steem.broadcast.vote(wifkey,votey,author,permlink,weight,function(downerr, result){
                                if(downerr){
                                    setTimeout(function(){bot.createMessage(channel,'Başarısız! Daha önce zaten upvote yapıldı.');},1000);
                                    con.query('UPDATE `caps` SET `lastvote`="10" WHERE `userid`="'+uid+'"', function (error, results, fields) {
                                    });
                                }
                                if(result) {
                                    setTimeout(function(){bot.createMessage(channel,'Başarılı! Gönderinize @caps tarafından upvote yapıldı.');},1000);
                                }
                            });
                        });
                    }
                }
            }
        });

    }
});
bot.connect(); 

var Discordie = require('discordie');
var request = require('request');
var Events = Discordie.Events;

var client = new Discordie();

client.connect({
    token: 'DISCORD-TOKEN-KEY'
})

client.Dispatcher.on(Events.GATEWAY_READY, e => {
    console.log('Connected as: '+ client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    var content = e.message.content;
    if(content.indexOf("$fiyat ") == 0) {
        var coin = content.replace("$fiyat ", "");
        var value = '';
        try{
            request('https://api.coinmarketcap.com/v1/ticker/' + coin + '/', 
                            function(error,res,body) {
                var obj = JSON.parse(body);
                console.log(obj[0]);
                if(obj[0] === undefined)
                {
                    e.message.channel.sendMessage("Geçersiz bir coin ismi girdiniz.");
                }
                else
                {
                    value = coin.toUpperCase() + 
			       " (" + obj[0].symbol + 
			       ")\n\nSıralama: " + obj[0].rank + 
                               "\nMevcut Fiyat: " + obj[0].price_usd + 
                               " USD\nSaatlik Değişim: " + obj[0].percent_change_1h + 
                     	       "%\nGünlük Değişim: " + obj[0].percent_change_24h + 
                	       "%\nHaftalık Değişim: " + obj[0].percent_change_7d + 
			       "%\nHacim: " + obj[0].available_supply + " " + obj[0].symbol;
                    e.message.channel.sendMessage(value);
                }
            });
        }
        catch (err) {
            e.message.channel.sendMessage("Geçersiz Birim");
        }
    }
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
  if (e.message.content == "$caps")
    e.message.channel.sendMessage("Merhaba, ben @sedatyildiz tarafından geliştirilen steemit gönderileriniz için upvote alabileceğiniz ve kripto para fiyatlarını sorgulayabileceğiniz bir robotum.\n\n`Örnek Kullanım:`\n```$fiyat steem\n$upvote http:/steemit.com/tr/@caps/ornek-gonderi-adresi```");
});

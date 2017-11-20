var express=require("express");
var app=express();
var cons = require('consolidate');
var request=require("request");
var cheerio=require("cheerio");
var path=require("path");
var async=require("async");
// view engine setup
app.use(express.static(__dirname+"/public"))
app.get("/",function(req,res,next){
   res.sendFile(__dirname+"/views/index.html");
});
app.post("/scrap",function(req,res,next){
    //waterfall async
    async.waterfall([
        function (callback) {
            var names=[];
            //to call the scraping url
            request("https://cricket.yahoo.com/matches/schedule/"+req.query.team+"_"+req.query.no,function(e,r,body){
                var $=cheerio.load(body);
                $("#ycric-series-schedule-upcoming-body").find(".svenue").each(function(i,val){
                arr=$(this).children("a").text().split(",");
                names.push(arr[1]);
                arr=[];
               
                });
                names=names.filter(function(elem){
                    if(elem!==undefined){
                        return elem;
                    }
                })
                console.log(names);
                callback(null,names);
            });
            
            
        }
    ], function (err, result) {
        res.json(result);
    });

})
app.listen(process.env.PORT||'3000');
var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

router.get('/',function(req, res, next){
    res.render('users/index',{'msg':""});
});
router.post('/registration',function(req, res, next){
    //receive all data
    let name=req.body.name.trim();
    let phone=req.body.phone.trim();
    let password=req.body.password.trim();
    let form_data=
    {
        name:name,
        phone:phone,
        password:password
    };
    let form_data1=
    {
        phone:phone,
        amount:"50",
        details:"New Acc Created",
        type:"CR",
        wallet:"50"
    };
    dbConn.query("select count(*) as count1 from `user` where `phone`='"+phone+"'",function(error,result){
        if(result[0].count1>0)
        {
            //console.log("phone number already exist");
            res.render('users/index',{'msg':"phone number already exist"});
        }
        else
        {
            dbConn.query("insert into `user` set ?",form_data,function(error,result){
                dbConn.query("insert into `transaction` set ?",form_data1,function(error,result){
                    res.render('users/index',{'msg':"account created successfully done"});
                });
            });
           
        }
    });
    
    
  });

router.post('/login',function(req, res, next){
    //receive all data
    let phone=req.body.phone.trim();
    let password=req.body.password.trim();

    dbConn.query("select count(*) as count1 from `user` where `phone`='"+phone+"' and `password`='"+password+"'",function(error,result){
        if(result[0].count1>0)
        {
            //console.log("phone number already exist");
            //res.render('users/index',{'msg':"phone number already exist"});
            req.session.user = phone;
            res.redirect('/users/profile');
        }
        else
        {
            
            res.render('users/index',{'msg':"invalid login details"});
           
        }
    });
    
    
  });
  router.get('/profile',function(req, res, next){
    let user=req.session.user;//phone
    if(user)
    {
        dbConn.query("select * from `user` where `phone`='"+user+"'",function(error,result){
            dbConn.query("select * from `transaction` where `phone`='"+user+"' order by `id` desc",function(error,result1){
                res.render('users/profile',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1});
            });
        });
    
    }
    else
    {
        res.render('users/index',{msg:"please login"});
    }
    
  });

  router.get('/addmoney',function(req, res, next){
    let user=req.session.user;//phone
    if(user)
    {
        dbConn.query("select * from `user` where `phone`='"+user+"'",function(error,result){
            dbConn.query("select * from `transaction` where `phone`='"+user+"' order by `id` desc",function(error,result1){
                res.render('users/addmoney',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:""});
            });
        });
    
    }
    else
    {
        res.render('users/index',{msg:"please login"});
    }
    
  });
  router.post('/addmoney',function(req, res, next){
    let user=req.session.user;//phone
    if(user)
    {
        dbConn.query("select * from `user` where `phone`='"+user+"'",function(error,result){
            dbConn.query("select * from `transaction` where `phone`='"+user+"' order by `id` desc",function(error,result1){
                //receive data
                let phone=req.body.phone.trim();
                let amount=req.body.amount.trim();
                let details="money added successfully from acc "+req.body.acc.trim();
                let type="CR";
                let wallet=parseInt(result1[0].wallet)+parseInt(amount);
                let form_data2=
                {
                    phone:phone,
                    amount:amount,
                    details:details,
                    type:type,
                    wallet:wallet
                };
                dbConn.query("insert into `transaction` set ?",form_data2,function(error,result2){
                    res.render('users/addmoney',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:"money added successfully"});
                })
                
               
            });
        });
    
    }
    else
    {
        res.render('users/index',{msg:"please login"});
    }
    
  });
  router.get('/sendmoney',function(req, res, next){
    let user=req.session.user;//phone
    if(user)
    {
        dbConn.query("select * from `user` where `phone`='"+user+"'",function(error,result){
            dbConn.query("select * from `transaction` where `phone`='"+user+"' order by `id` desc",function(error,result1){
                res.render('users/sendmoney',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:""});
            });
        });
    
    }
    else
    {
        res.render('users/index',{msg:"please login"});
    }
    
  });
  router.post('/sendmoney',function(req, res, next){
    let user=req.session.user;//phone
    if(user)
    {
       

        dbConn.query("select * from `user` where `phone`='"+user+"'",function(error,result){
            dbConn.query("select * from `transaction` where `phone`='"+user+"' order by `id` desc",function(error,result1){
                //receive data
                let phone1=req.body.phone1.trim();
                let phone2=req.body.phone2.trim();
              
                dbConn.query("select count(*) as count1 from `user` where `phone`='"+phone2+"'",function(error,result){
                    if(result[0].count1==0)
                    {
                        //console.log("phone number already exist");
                        res.render('users/sendmoney',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:"receipent not found"});
                    }
            else
            {
                    
                let amount=req.body.amount.trim();
                let details1="money sended successfully to acc "+phone2+" "+req.body.purpose.trim();
                let details2="money added successfully from acc "+phone1+" "+req.body.purpose.trim();
                let type1="DR";
                let type2="CR";
                if(parseInt(amount)>parseInt(result1[0].wallet))
                {
                    res.render('users/sendmoney',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:"insufficient balance"});
                }
                else
                {
                let wallet1=parseInt(result1[0].wallet)-parseInt(amount);
                let form_data2=
                {
                    phone:phone1,
                    amount:amount,
                    details:details1,
                    type:type1,
                    wallet:wallet1
                };
                dbConn.query("insert into `transaction` set ?",form_data2,function(error,result2){
                    dbConn.query("select * from `transaction` where `phone`='"+phone2+"' order by `id` desc",function(error,result3){
                        let wallet2=parseInt(result3[0].wallet)+parseInt(amount);
                        let form_data3=
                        {
                            phone:phone2,
                            amount:amount,
                            details:details2,
                            type:type2,
                            wallet:wallet2
                        };
                        dbConn.query("insert into `transaction` set ?",form_data3,function(error,result2){
                            res.render('users/sendmoney',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:"money sent successfully"});
                        })
                    });
                    
                })
                
               

                
              }  
            }
        });
               
            });
        });
    
    }
    else
    {
        res.render('users/index',{msg:"please login"});
    }
    
  });
  router.get('/electric',function(req, res, next){
    let user=req.session.user;//phone
    if(user)
    {
        dbConn.query("select * from `user` where `phone`='"+user+"'",function(error,result){
            dbConn.query("select * from `transaction` where `phone`='"+user+"' order by `id` desc",function(error,result1){
                res.render('users/electric',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:""});
            });
        });
    
    }
    else
    {
        res.render('users/index',{msg:"please login"});
    }
    
  });
  router.post('/electric',function(req, res, next){
    let user=req.session.user;//phone
    if(user)
    {
       

        dbConn.query("select * from `user` where `phone`='"+user+"'",function(error,result){
            dbConn.query("select * from `transaction` where `phone`='"+user+"' order by `id` desc",function(error,result1){
                //receive data
                let phone1=req.body.phone1.trim();
                let phone2=req.body.phone2.trim();//consumerid
                    
                let amount=req.body.amount.trim();
                let details1="electric bill recharge successfully to consumerid "+phone2+" provider-"+req.body.purpose.trim();
                let type1="DR";
                if(parseInt(amount)>parseInt(result1[0].wallet))
                {
                    res.render('users/electric',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:"insufficient balance"});
                }
                else
                {
                let wallet1=parseInt(result1[0].wallet)-parseInt(amount);
                let form_data2=
                {
                    phone:phone1,
                    amount:amount,
                    details:details1,
                    type:type1,
                    wallet:wallet1
                };
                dbConn.query("insert into `transaction` set ?",form_data2,function(error,result2){
                            res.render('users/electric',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:"electric bill recharge successfully"});
                })
                
               

                
              }  
            
               
            });
        });
    
    }
    else
    {
        res.render('users/index',{msg:"please login"});
    }
    
  });

  router.get('/mobile',function(req, res, next){
    let user=req.session.user;//phone
    if(user)
    {
        dbConn.query("select * from `user` where `phone`='"+user+"'",function(error,result){
            dbConn.query("select * from `transaction` where `phone`='"+user+"' order by `id` desc",function(error,result1){
                res.render('users/mobile',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:""});
            });
        });
    
    }
    else
    {
        res.render('users/index',{msg:"please login"});
    }
    
  });
  router.post('/mobile',function(req, res, next){
    let user=req.session.user;//phone
    if(user)
    {
       

        dbConn.query("select * from `user` where `phone`='"+user+"'",function(error,result){
            dbConn.query("select * from `transaction` where `phone`='"+user+"' order by `id` desc",function(error,result1){
                //receive data
                let phone1=req.body.phone1.trim();
                let phone2=req.body.phone2.trim();//consumerid
                    
                let amount=req.body.amount.trim();
                let details1="mobile recharge successfully to mobile "+phone2+" provider-"+req.body.purpose.trim();
                let type1="DR";
                if(parseInt(amount)>parseInt(result1[0].wallet))
                {
                    res.render('users/mobile',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:"insufficient balance"});
                }
                else
                {
                let wallet1=parseInt(result1[0].wallet)-parseInt(amount);
                let form_data2=
                {
                    phone:phone1,
                    amount:amount,
                    details:details1,
                    type:type1,
                    wallet:wallet1
                };
                dbConn.query("insert into `transaction` set ?",form_data2,function(error,result2){
                            res.render('users/mobile',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:"mobile bill recharge successfully"});
                })
                
               

                
              }  
            
               
            });
        });
    
    }
    else
    {
        res.render('users/index',{msg:"please login"});
    }
    
  });
  router.get('/movie',function(req, res, next){
    let user=req.session.user;//phone
    if(user)
    {
        dbConn.query("select * from `user` where `phone`='"+user+"'",function(error,result){
            dbConn.query("select * from `transaction` where `phone`='"+user+"' order by `id` desc",function(error,result1){
                res.render('users/movie',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:""});
            });
        });
    
    }
    else
    {
        res.render('users/index',{msg:"please login"});
    }
    
  });
  router.post('/movie',function(req, res, next){
    let user=req.session.user;//phone
    if(user)
    {
       

        dbConn.query("select * from `user` where `phone`='"+user+"'",function(error,result){
            dbConn.query("select * from `transaction` where `phone`='"+user+"' order by `id` desc",function(error,result1){
                //receive data
                let phone1=req.body.phone1.trim();
                let phone2=req.body.phone2.trim();//movie name
                let ticket=req.body.ticket.trim();//movie name
                let date=req.body.date.trim();//movie name
                let time=req.body.time.trim();//movie name
                    
                let amount=req.body.amount.trim();
                let details1="movie ticket book successfully movie name- "+phone2+" theater-"+req.body.provider.trim()+" no of ticket-"+ticket+" date-"+date+" time-"+time;
                let type1="DR";
                if(parseInt(amount)>parseInt(result1[0].wallet))
                {
                    res.render('users/movie',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:"insufficient balance"});
                }
                else
                {
                let wallet1=parseInt(result1[0].wallet)-parseInt(amount);
                let form_data2=
                {
                    phone:phone1,
                    amount:amount,
                    details:details1,
                    type:type1,
                    wallet:wallet1
                };
                dbConn.query("insert into `transaction` set ?",form_data2,function(error,result2){
                            res.render('users/movie',{'nm':result[0].name,'wallet':result1[0].wallet,result1:result1,msg:"movie ticket book successfully"});
                })
                
               

                
              }  
            
               
            });
        });
    
    }
    else
    {
        res.render('users/index',{msg:"please login"});
    }
    
  });


  router.get('/logout',function(req,res,next){
    //receive session
    let user=req.session.user;
    if(user)
    {
        req.session.user="";
    res.render('users/index',{msg:"successfully logout"});
    }
    else
    {
        res.render('users/index',{msg:"already logged out"});
    }
});
module.exports = router;
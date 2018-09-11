const bcrypt = require('bcrypt-as-promised');

const User = require("./model.js");

module.exports = {
    home : home,
    process : process,
    login : login,
    success : success
}

function home(req,res){
    console.log("hit root route");
    res.render("index");
}

function process(req,res){
    console.log("hit process route");
    if(req.body.password == req.body.con_password){
        bcrypt.hash(req.body.password, 10).then(hashed_password => {
            var newUser = new User()
                newUser.first_name = req.body.first_name
                newUser.last_name = req.body.last_name
                newUser.email = req.body.email
                newUser.password = hashed_password
                newUser.birthday = req.body.birthday
            newUser.save(function(errs,data){
                if(errs){
                    console.log("create user error");
                    console.log(errs) 
                    for(var key in errs.errors){
                        console.log(errs.errors[key].message);
                        req.flash('message', errs.errors[key].message);
                    }  
                    res.redirect('/'); 
                }else{
                    console.log("create user success");
                    console.log(data);
                    User.find({email : data.email}, function(errs,data){
                        if(errs){
                            console.log("Login error");
                            log(errs);
                        res.redirect('/');
                        }else{
                            console.log("data");
                            console.log(data);  
                            req.session._id = data._id;
                            console.log(req.session._id);
                            res.send(req.session._id);
                            res.redirect('/success');    
                        }     
                    })         
                }
            })
        })
    }else{

    }
}

function login(req,res){
    console.log("hit login route");
    User.findOne({email : req.body.loginEmail},function(errs,data1){
        if(errs){
            console.log("login error");
            console.log(errs);
            for(var key in errs.errors){
                console.log(errs.errors[key].message);
                req.flash('loginemail', errs.errors[key].message);
            }  
            res.redirect('/')
        }else{
            if(data1 == null){
               res.redirect('/');
            }else{
                bcrypt.compare(req.body.LoginPass,data1.password)
                .then(data => {
                    console.log("login success");
                    console.log(data);
                    req.session._id = data1._id;
                    console.log(req.session._id);
                    res.redirect('/success')
                })
                .catch( errs =>{
                    console.log("login error2");
                    console.log(errs);
                    res.redirect('/')
                })
            }
        }
    })
    
}

function success(req,res){
    console.log("hit success route");
    console.log(req.session._id)
    User.find({_id : req.session._id}, function(errs,data){
        if(errs){
            console.log("load error");
            console.log(errs);
            res.redirect('/')
        }else{
            console.log("load success");
            console.log(data);
            res.render("result", {data: data});
        }
    })
}


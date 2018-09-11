const xp = require("express");
const path = require("path");
const bp = require("body-parser");
const router = require("./server/routes.js");
const flash = require('express-flash');
const app = xp();
const session = require('express-session');

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(xp.static(path.join(__dirname, "./static")));
app.use(flash());
app.use(bp.urlencoded({extended: true}));
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

router(app);

app.listen(8000, (errs)=>console.log(errs?errs:"db LoginAndReg"));
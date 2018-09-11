const {home, process,login,success} = require("./controller.js");

function router(app)
{
    app.get('/',home);
    app.post("/process", process);
    app.post("/login", login);
    app.get('/success', success);

}

module.exports = router;
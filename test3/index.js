const express = require('express')
const handlebars = require('express-handlebars')
const port = 3000;
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello")
})
app.listen(port, () => {
    console.log("Listening port http://localhost:" + port)
})

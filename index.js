const http = require('http')
const app = require("./src/config/express.config")

const server = http.createServer(app); // server application


// 0 - 65535
// ~100 port
//http => 80, https: 443 , smtp => 25, 2525 , 465, 587
//ftps 21, 


//localhost
//127.0.0.1

server.listen(9005, '127.0.0.1',(err)=>{
    if(!err){
        console.log("server is running")
        console.log("Press CTRL +C to diconnect Server")
    }
})
const express = require("express")
const axios = require("axios")

const app = express()

app.use(express.json())

const input = "https://api.github.com/users/xiaotian/repos"

app.get("/callRecording", async(req,res)=>{
    try{
        const response = await axios.get(input,{
            responseType: "stream"
        })
        console.log(response);
        const stream = response.data
        res.set("content-type", "audio/mp3");
        res.set("accept-ranges", "bytes");
        res.set("content-length", response.headers["content-length"]);
        
        stream.on("data", (chunk) => {
            res.write(chunk);
          });
    
        stream.on("error", (err) => {
            res.sendStatus(404);
          });
    
        stream.on("end", () => {
            res.end();
          });
    }catch(err){
        console.log(err)
    }
})

app.listen(4000,()=>{
    console.log("server started...");
})
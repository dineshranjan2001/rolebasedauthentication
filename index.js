const express=require("express");
const app=express();

app.use(express.json());

const cors=require("cors");
const apiRoutes = require("./src/routes/apiroutes.routes");
app.use(cors({
    origin:"*",
    credentials:true
}));

app.use("/rbac",apiRoutes);

app.listen("2024",()=>{
    console.log("application listen on 2024 port");
})

module.exports=app;

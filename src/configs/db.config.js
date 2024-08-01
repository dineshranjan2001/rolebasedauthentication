const {Sequelize}=require("sequelize");


const databaseConfig=new Sequelize("rbac","root","root@1234",{
    host:"localhost",
    dialect:"mysql",
    logging:true
});

(async ()=>{
    try {
        await databaseConfig.authenticate();
        await databaseConfig.sync();
        console.log("Database is authenicated and models are synced...");
    } catch (error) {
        console.log("Database is not authenicated and models are not synced...",error);
    }
})();

module.exports= {databaseConfig};
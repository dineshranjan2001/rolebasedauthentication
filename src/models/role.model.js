const { DataTypes } =require('sequelize');
const { databaseConfig : sequelize } =require("../configs/db.config.js"); 
const UserDetails=require("./user.model.js");
const RoleDetails=sequelize.define("RoleDetails",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    roleName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},{
    tableName:"role_details",
    timestamps:true,
    underscored:true
});

RoleDetails.hasOne(UserDetails,{as:"user",foreignKey:"roleId"});
UserDetails.belongsTo(RoleDetails,{as:"role",foreignKey:"roleId"});

module.exports=RoleDetails;
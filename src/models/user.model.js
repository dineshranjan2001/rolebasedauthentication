const { DataTypes } =require ("sequelize");
const { databaseConfig : sequelize } =require("../configs/db.config.js"); 
const PermissionDetails=require("./permissions.model.js");
const UserDetails=sequelize.define("UserDetails",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    otp:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    otpExpire:{
        type:DataTypes.TIME,
        allowNull:true
    }
},{
    tableName:"user_details",
    timestamps:true,
    underscored:true
});

UserDetails.hasOne(PermissionDetails,{as:"permissions",foreignKey:"userId"});
PermissionDetails.belongsTo(UserDetails,{as:"user",foreignKey:"userId"});

module.exports=UserDetails;
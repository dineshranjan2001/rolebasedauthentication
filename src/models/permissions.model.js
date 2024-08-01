const { DataTypes } =require ("sequelize");
const { databaseConfig : sequelize } =require("../configs/db.config.js"); 
const PermissionDetails=sequelize.define("PermissionDetails",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    createPermission:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    readPermission:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    updatePermission:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    deletePermission:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
    
},{
    tableName:"permission_details",
    timestamps:true,
    underscored:true
});

module.exports=PermissionDetails;
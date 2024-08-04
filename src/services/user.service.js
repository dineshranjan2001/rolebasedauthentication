const RoleDetails = require("../models/role.model");
const UserDetails = require("../models/user.model");
const PermissionDetails=require("../models/permissions.model");

const createRoleDetailsService=async(roleName)=>{
    const createdRoleDetails=await RoleDetails.create({roleName});
    return createdRoleDetails || null;
}

const createUserDetailsDetailsService=async(userData,permissions)=>{
    const createdUserDetails=await UserDetails.create(userData);
    let createdPermissionDetails;
    if(createdUserDetails){
        createdPermissionDetails=await PermissionDetails.create({
            createPermission:permissions.createPermission,
            readPermission:permissions.readPermission,
            updatePermission:permissions.updatePermission,
            deletePermission:permissions.deletePermission,
            userId:createdUserDetails.id
        });
    }else{
        await createdUserDetails.destroy();
    }
    return {createdUserDetails,createdPermissionDetails}
}

const loginUserDetailsService=async(email,password)=>{
    const getUserDetails=await UserDetails.findOne({
        where:{
            email
        },
        include:[
            {
                model:RoleDetails,
                as:"role"
            },
            {
                model:PermissionDetails,
                as:"permissions",
                attributes:["createPermission","readPermission","updatePermission","deletePermission"]
            }
        ]
    });

    if(!getUserDetails){
        return null
    }
    if(getUserDetails.password!==password){
        return 0;
    }
    return getUserDetails;
}

const getUserDetailsByuserIdService=async(userId)=>{
    const getUserDetail=await UserDetails.findByPk(userId);
    return getUserDetail || null;
}

const updateUserDetailsService=async(userId,updatedUserDetails,updatedPermissionDetails)=>{
    const getUserDetails=await UserDetails.findByPk(userId,{
        include:[
            {
                model:PermissionDetails,
                as:"permissions",
            }
        ]
    });


    if(!getUserDetails){
        return null;
    }

    getUserDetails.permissions.createPermission=updatedPermissionDetails.createPermission;
    getUserDetails.permissions.readPermission=updatedPermissionDetails.readPermission;
    getUserDetails.permissions.updatePermission=updatedPermissionDetails.updatePermission;
    getUserDetails.permissions.deletePermission=updatedPermissionDetails.deletePermission;
    await getUserDetails.permissions.save();

    const updateUserDetails=await getUserDetails.update(updatedUserDetails);
    return {updateUserDetails};

}

module.exports={createRoleDetailsService,createUserDetailsDetailsService,loginUserDetailsService,getUserDetailsByuserIdService,updateUserDetailsService};
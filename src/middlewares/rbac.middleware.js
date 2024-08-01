const checkPermission=(permission)=>{
    return (req,res,next)=>{
        const userPermissions = req.user ? req.user.permissions : null;

        // Convert permissions object to an array and store like ['read', 'update']
        const permissionArray = Object.entries(userPermissions)
                                      .filter(([key, value]) => value === true)
                                      .map(([key, value]) => key.replace('Permission', ''));
        if(permissionArray.includes(permission)){
            return next();
        }else{
            return res.status(403).json({ statusCode:403,message: `You don't have the permission to ${permission}` });
        }
    }
}
module.exports={checkPermission};
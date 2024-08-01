const express = require("express");
const { createUserDetails, createRoleDetails, loginUserDetails, getUserDetailsByuserId, updateUserDetails } = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifytoken.middleware");
const { checkPermission } = require("../middlewares/rbac.middleware");
const { roleBasedAccess } = require("../middlewares/rolebaseaccess.middleware");

const apiRoutes=express.Router();

apiRoutes.post("/createRoleDetails",createRoleDetails);
apiRoutes.post("/createUserDetails",createUserDetails);
apiRoutes.post("/loginUser",loginUserDetails);
apiRoutes.get("/getUserDetailsByUserId/:userId",verifyToken,roleBasedAccess("admin"),getUserDetailsByuserId);
apiRoutes.put("/updateUserDetails/:userId",verifyToken,checkPermission("update"),updateUserDetails);

module.exports=apiRoutes;
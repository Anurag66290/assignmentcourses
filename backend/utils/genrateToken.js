import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import user from "../model/user.js";

dotenv.config();

export const generateToken = async (id) => {
  const token = jwt.sign({ id }, "ASDFGHJKL", {
    expiresIn: "10h",
  });

  return {
    token,
    
  };
};

export const userauthMiddleware = async (req, res, next) => {
 
    let token;
    try{
  
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
  
  
        let result = await jwt.verify(token, "ASDFGHJKL");
  
        const adminProfile = await user.findOne({
          _id: result.id,
        })
        if (adminProfile) {
          req.user = adminProfile;
          next();
        } else {
        return  res.status(400).send('Please Login');
        }
      } else {
        
        return  res.status(400).send('No Token, No Authorization');
      }
    } catch (err) {
      if (err.message === "jwt expired") {
       
    return  res.status(500).send('Session has expired Please login first')

      } else {
        console.log(err)

    return  res.status(500).json('token Error')

      }
    }
  };
import user from "../model/user.js";

import bcrypt from 'bcrypt';
import { generateToken } from "../utils/genrateToken.js";
import Course from "../model/Course.js";
import Test from "../model/Test.js";
import Coursereport from "../model/Coursereport.js";
import Testreport from "../model/testreport.js";

/*
  |----------------------------------------------------------------------------------------------------------------
  | API  sign_up
  |----------------------------------------------------------------------------------------------------------------
  */
  export const sign_up = async (req, res) => {
    try {
            var find = await user.findOne({email:req.body.email})    
            if(find){
                return   res.status(400).send('User already exist');
            }
        // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
          var result = await user.create({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,   // 'User','Admin', ' Manager-1', or 'Manager-2'
            password: hashedPassword,
          });

          var Token = await generateToken(result._id);
          Token = Token.token;
          result = result.toJSON();
          result.token = Token;
  
  
          return res.status(200).json({ message: 'Registered successfully', data: result });
        
      
    } catch (err) {
      console.log(err);
      return res.status(500).send('Error during signup');
    }
  };

  
  /*
  |----------------------------------------------------------------------------------------------------------------
  | API get user
  |----------------------------------------------------------------------------------------------------------------
  */
  export const get_user = async (req, res) => {
    try {
        let data = await user.find()
        return res.status(200).json({ message: ' successfully', data: data });
  
    } catch (error) {
            console.log(error);
            return res.status(500).send('Error occur ');
    }
  }

    /*
  |----------------------------------------------------------------------------------------------------------------
  | API rile update
  |----------------------------------------------------------------------------------------------------------------
  */
  export const role_update = async (req, res) => {
try {
    if(req.user.role === "Manager-1"  && req.user.role === "Admin"){
        let data = await user.findByIdAndUpdate({_id:req.body._id},{
            rolr:req.body.role
        })
        return res.status(200).json({ message: ' successfully', data: data });
    }else{
    return  res.status(400).send('you are not elligible to access this');
    }
    
} catch (error) {
    console.log(error);
    return res.status(500).send('Error occur');
}  
}
  /*
  |----------------------------------------------------------------------------------------------------------------
  | API login
  |----------------------------------------------------------------------------------------------------------------
  */

  export const login = async (req, res) => {
try {
    let find = await user.findOne({email:req.body.email})
    if(!find){
     return res.status(400).send('User is not register');
    }
    const PasswordMatch = await bcrypt.compare(req.body.password, find.password);
    if(!PasswordMatch){
        return  res.status(400).send('Password does not match');
    }

    let Token = await generateToken(find._id);

    Token = Token.token;
    find = find.toJSON();
    find.token = Token;

    return   res.status(200).json({ message: 'Login successfully', data: find });


} catch (error) {
    console.log(error);
    return  res.status(500).send('Error during login')
}
  }

  export const logout= async(req,res) =>{
    try {
        const admin = await user.updateOne({
            _id: req.user._id
        }, {
            $set: {
                token: 0
            }
        });
        if (admin) {
            return success(res, "Logout Successfully");
        }
    } catch (error) {
        console.log(error);
        return  res.status(500).send('Error during login')
    }
  }


/*
  |----------------------------------------------------------------------------------------------------------------
  | API course create 
  |----------------------------------------------------------------------------------------------------------------
*/
export const create_course = async (req, res) => {
    // console.log(req.user)
try {
if(req.user.role  === "Admin"){
    var result = await Course.create({
        name: req.body.name,
        description: req.body.description
    })
    return   res.status(200).json({ message: 'cousre added successfully', data: result });
}else{
    return  res.status(400).send('you are not elligible to access this');

}


} catch (error) {
    console.log(error);
    return  res.status(500).send('Error Occur')
}
}

/*
  |----------------------------------------------------------------------------------------------------------------
  | API course Update 
  |----------------------------------------------------------------------------------------------------------------
*/
export const Update_course = async (req, res) => {
    // console.log(req.user)
try {
    if(req.user.role === "Admin"){
        let result = await Course.findByIdAndUpdate({_id:req.body._id},{
            name:req.body.name,
            description: req.body.description
        },{new:true})
    return   res.status(200).json({ message: 'cousre update successfully', data: result })
}else{
return  res.status(400).send('you are not elligible to access this');
} 
} catch (error) {
    console.log(error);
    return  res.status(500).send('Error Occur')
}
}

/*
  |----------------------------------------------------------------------------------------------------------------
  | API course get by id 
  |----------------------------------------------------------------------------------------------------------------
*/
export const getbyid_course = async (req, res) => {
    // console.log(req.body)
try {
    if(req.user.role === "Admin"){   
        let courseID =  req.body._id   
    let result = await Course.findOne({_id:courseID} )
    // console.log(result)
if(!result){
    return  res.status(400).send('cousre does not exist');
}else{

    return   res.status(200).json({ message: 'cousre get successfully', data: result })
}
}else{
        return  res.status(400).send('you are not elligible to access this');

    }
} catch (error) {
    console.log(error);
    return  res.status(500).send('Error Occur')
}
}

/*
  |----------------------------------------------------------------------------------------------------------------
  | API course get all 
  |----------------------------------------------------------------------------------------------------------------
*/
export const getall_course = async (req, res) => {
    console.log(req.user)
try {
    if(req.user.role === "Admin"){
        let result = await Course.find()
        return   res.status(200).json({ message: 'cousre get all successfully', data: result })
    }else{
    return  res.status(400).send('you are not elligible to access this');
    }
} catch (error) {
    console.log(error);
    return  res.status(500).send('Error Occur')
}
}

/*
  |----------------------------------------------------------------------------------------------------------------
  | API course delete course  
  |----------------------------------------------------------------------------------------------------------------
*/
export const deletbyid_course = async (req, res) => {
    // console.log(req.body)
try {
    if(req.user.role === "Admin"){   
        let courseID =  req.body._id   
    let result = await Course.deleteOne({_id:courseID} )
    // console.log(result)
if(!result){
    return  res.status(400).send('cousre does not exist');
}else{

    return   res.status(200).json({ message: 'cousre get successfully', data: result })
}
}else{
        return  res.status(400).send('you are not elligible to access this');

    }
} catch (error) {
    console.log(error);
    return  res.status(500).send('Error Occur')
}
}

/*
  |----------------------------------------------------------------------------------------------------------------
  | API  test create 
  |----------------------------------------------------------------------------------------------------------------
*/
export const create_test = async (req, res) => {
    // console.log(req.user)
try {
// if(req.user.role  === "Admin" ){
//     var result = await Test.create({
//         name: req.body.name,
//         description: req.body.description,
//         password:req.body.password
//     })

    var result = await Test.create({
        name: req.body.name,
        description: req.body.description,
        password:req.body.password
    })
    return   res.status(200).json({ message: 'test added successfully', data: result });
// }else{
//     return  res.status(400).send('you are not elligible to access this');

// }
} catch (error) {
    console.log(error);
    return  res.status(500).send('Error Occur')
}
}

/*
  |----------------------------------------------------------------------------------------------------------------
  | API test Update 
  |----------------------------------------------------------------------------------------------------------------
*/
export const Update_test = async (req, res) => {
    // console.log(req.user)
try {
    if(req.user.role === "Admin"){
        let result = await Test.findByIdAndUpdate({_id:req.body._id},{
            name:req.body.name,
            description: req.body.description
        },{new:true})
    return   res.status(200).json({ message: 'test update successfully', data: result })
}else{
return  res.status(400).send('you are not elligible to access this');
} 
} catch (error) {
    console.log(error);
    return  res.status(500).send('Error Occur')
}
}

/*
  |----------------------------------------------------------------------------------------------------------------
  | API test get all 
  |----------------------------------------------------------------------------------------------------------------
*/
export const getall_test = async (req, res) => {
    console.log(req.user)
try {
    if(req.user.role === "Admin"){
        let result = await Test.find()
        return   res.status(200).json({ message: 'Test get all successfully', data: result })
    }else{
    return  res.status(400).send('you are not elligible to access this');
    }
} catch (error) {
    console.log(error);
    return  res.status(500).send('Error Occur')
}
}

/*
  |----------------------------------------------------------------------------------------------------------------
  | API test delete course  
  |----------------------------------------------------------------------------------------------------------------
*/
export const deletbyid_test = async (req, res) => {
    // console.log(req.body)
try {
    if(req.user.role === "Admin"){   
        let courseID =  req.body._id   
    let result = await Test.deleteOne({_id:courseID} )
    // console.log(result)
if(!result){
    return  res.status(400).send('Test does not exist');
}else{

    return   res.status(200).json({ message: 'Test get successfully', data: result })
}
}else{
        return  res.status(400).send('you are not elligible to access this');

    }
} catch (error) {
    console.log(error);
    return  res.status(500).send('Error Occur')
}
}


/*
  |----------------------------------------------------------------------------------------------------------------
  | API  course report 
  |----------------------------------------------------------------------------------------------------------------
*/
export const report_course = async (req, res) => {
    console.log(req.body)
try {
    
   let result = await Coursereport.create({
    performance:req.body.performance,
    Activity:req.body.Activity
   })
    // console.log(result)
    return   res.status(200).json({ message: 'report get successfully', data: result })

    
} catch (error) {
    console.log(error);
    return  res.status(500).send('Error Occur')
}
}

export const getreport_course = async (req, res) => {
    console.log(req.body)
try {
    if(req.user.role === "Manager-2" || req.user.role === "Admin"){   
   let result = await Coursereport.find()
    // console.log(result)
    return   res.status(200).json({ message: 'report get successfully', data: result })
}else{
        return  res.status(400).send('you are not elligible to access this');

    }
    
} catch (error) {
    console.log(error);
    return  res.status(500).send('Error Occur')
}
}


/*
  |----------------------------------------------------------------------------------------------------------------
  | API  test report 
  |----------------------------------------------------------------------------------------------------------------
*/
export const report_test = async (req, res) => {
    console.log(req.body)
try {

        let result = await Testreport.create({
            performance:req.body.performance,
            Activity : req.body.Activity
           })
    // console.log(result)
    return   res.status(200).json({ message: 'report get successfully', data: result })

    
} catch (error) {
    console.log(error);
    return  res.status(500).send('Error Occur')
}
}
export const getreport_test = async (req, res) => {
    console.log(req.body)
try {
    if(req.user.role === "Manager-2" && req.user.role === "Admin"){   
        let result = await Testreport.find()
    // console.log(result)
    return   res.status(200).json({ message: 'report get successfully', data: result })
}else{
        return  res.status(400).send('you are not elligible to access this');

    }
    
} catch (error) {
    console.log(error);
    return  res.status(500).send('Error Occur')
}
}
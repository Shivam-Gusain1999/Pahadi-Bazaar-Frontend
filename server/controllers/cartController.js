import User from "../models/user"


export const updateCart = async ()=>{
    try {
          const {userId, cartItems} = req.body
          await User.findByIdAndUpdate(userId, {cartItems})
          res.json({success:true, message:"Cart updated"})
    } catch (error) {
            console.log(error.message)
            res.json({ success: false, message: error.message });   
    }
  

}
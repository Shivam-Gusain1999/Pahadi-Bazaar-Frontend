

// place order // cod //

import Order from "../models/Order"
import Product from "../models/Product"


export const placeOrderCod = async (req, res)=>{
  try {
      const {userId, items, address} = req.body
      if(!address || items.length === 0){
        return res.json({success:false, message:"Invalid data"})
      }

      /// amout calculate // 

      const amount = await items.reduce(async (acc, item)=>{
        const product = await Product.findById(item.product);
        return (await acc) + product.offerPrice * item.quantity; 
      }, 0)

      // tax charge // 

      amount += Math.floor(amount * 0.02);
      await Order.create({
        userId,
        items,
        amount,
        address,
        paymenetType: "COD"
      })
      return res.json({success:true, message:"order placed successfully"})

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}


// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    }).populate("items.product address").sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// Get All Orders ( for seller / admin ) : /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    }).populate("items.product address").sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
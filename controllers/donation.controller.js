const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { Project } = require("../model/Project.model");
const { Donation } = require("../model/Donation.model");
const Razorpay = require("razorpay");
var crypto = require("crypto");

// const payment = async (req, res) => {
//   const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_SECRET_ID,
//   });

//   const options = {
//     amount: req.body.amount * 100,
//     currency: "INR",
//     receipt: "receipt#1",
//   };

//   try {
//     const order = await instance.orders.create(options);
//     // console.log(order, "order");
//     return order;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const paymentverify = async (req, res) => {
// const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
//   req.body;

// const body =
//   req.body.res.razorpay_order_id +
//   "|" +
//   req.body.response.razorpay_payment_id;

// const expectedSignature = crypto
//   .createHmac("sha256", process.env.RAZORPAY_SECRET_ID)
//   .update(body.toString())
//   .digest("hex");
// console.log("sig received ", razorpay_signature);
// console.log("sig generated ", expectedSignature);
// if (expectedSignature === razorpay_signature)
//   response = { signatureIsValid: "true" };
// res.send(response);
// };

const donate = asyncHandler(async (req, res) => {
  const { projectId, amount } = req.body;
  if (!projectId) {
    throw new ApiError(404, "project not found");
  }
  if (!amount) {
    throw new ApiError(400, "Amount is required");
  }

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Not Found");
  }

  // const Payment = await payment(amount);
  // const Paymentverify = await paymentverify();

  // if(){
  //     throw new ApiError(500,"Payment failed2")
  // }
  // if (Paymentverify) {
    const donationamount = await Donation.create({
      campaign_id: projectId.campaign_id,
      project_id: projectId,
      user_id: req.user._id,
      amount,
    });
    if(!donationamount){
      throw new ApiError(500,"Something went wrong")
  }
  console.log(project);
    project.current_amount += amount;
    await project.save();

    return res.status(200).json(new ApiResponse(200, "Payment successful"));
  } 
  // else {
  //   throw new ApiError(500, "Payment failed");
  // }
);

module.exports = { donate };

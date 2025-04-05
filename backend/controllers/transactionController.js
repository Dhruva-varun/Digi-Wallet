const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const stripe = require("stripe")(process.env.stripe_key)
const { uuid } = require("uuidv4");

exports.transferFunds = async (req, res, next) => {
    try {
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();
    
        await User.findByIdAndUpdate(req.body.sender, {
          $inc: { balance: -req.body.amount },
        });
    
        await User.findByIdAndUpdate(req.body.receiver, {
          $inc: { balance: req.body.amount },
        });
    
        res.send({
          message: "Transaction successfully",
          data: newTransaction,
          success: true,
        });
      } catch (error) {
        res.send({
          message: "Account not found",
          data: error.message,
          success: false,
        });
      }
};

exports.verifyAccount = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.body.receiver });
        if (user) {
          res.send({
            message: "Account verified",
            data: user,
            success: true,
          });
        } else {
          res.send({
            message: "Account not found",
            data: null,
            success: false,
          });
        }
      } catch (error) {
        res.send({
          message: "Account not found",
          data: error.message,
          success: false,
        });
      }
};

exports.getAllTransactions = async (req, res, next) => {
    try {
        const transaction = await Transaction.find({
          $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
        }).sort({createdAt: -1}).populate("sender").populate("receiver");
    
        res.send({
          message: "Transaction fetched",
          data: transaction,
          success: true,
        });
      } catch (error) {
        res.send({
          message: "Transaction not fetched",
          data: error.message,
          success: false,
        });
      }
};

exports.depositeFunds = async (req, res, next) => {
    try {
        const {token, amount} = req.body;
    
        const customer = await stripe.customers.create({
          email: token.email,
          source: token.id,
        });
    
        const charge = await stripe.charges.create(
          {
            amount: amount,
            currency:"usd",
            customer: customer.id,
            receipt_email: token.email,
            description:"Deposited to Digital Bank"
          },
          {
            idempotencyKey: uuid(),
          }
        );
    
        if(charge.status === "succeeded"){
          const newTransaction = new Transaction({
            sender: req.body.userId,
            receiver: req.body.userId,
            amount:amount,
            type:"deposite",
            reference: "stripe deposite",
            status: "success",
          });
    
        await newTransaction.save();
    
        await User.findByIdAndUpdate(req.body.userId, {
          $inc:{balance: amount},
        });
        res.send({
          message: "Transaction successful",
          data: newTransaction,
          success: true,
        });
        }else{
          res.send({
            message: "Transaction failed",
            data: charge,
            success: false,
          });
        }
       
      } catch (error) {
        res.send({
          message: "Transaction failed",
          data: error.message,
          success: false,
        });
      }
};
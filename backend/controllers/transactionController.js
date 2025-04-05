const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");

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
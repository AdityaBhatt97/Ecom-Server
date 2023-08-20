const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId : {type : String , required : true }, 
        products : [
            {
                productId : {type : String },
                productImg : {type : String},
                productName : {type: String},
                quantity : {type : Number , default : 1 },
                color : {type : String},
                size : {type : Number},
                price : {type : Number}

            }
        ] ,
        amount : {type : Number , required : true},
        address : {type : Object , },
        status : {type : String , default : "pending"}
       

    }, { timestamps : true }
)

module.exports = mongoose.model("Order" , OrderSchema);
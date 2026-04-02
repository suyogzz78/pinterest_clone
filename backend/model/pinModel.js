const { urlencoded } = require("express");
const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
},
pin:{
    type:String,
    required:true,
},
owner :{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
},
image:{
  id:String,
    url:String,
},

comments:[
    {
        user:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        comment:{
            type:String,
            required:true,
        },
        },
]

},{
    timestamps:true,
});

const Pin = mongoose.model("Pin",PinSchema);

module.exports = Pin;
const Pin = require("../model/pinModel");
const cloudinary = require("cloudinary");
const { generateurl } = require("../utils/urlgenerator");


const createpin = async (req,res)=>{

    try{

        const {pin,title} = req.body;

      

        const file = req.file;//here we get the file from the request and we will use it to generate the url for the image ,multer will store the file in memory and we can access it using req.file

        if(!file){
            return res.status(400).json({
                message:"Please provide an image"
            })
        }

        const fileUrl = await generateurl(file);//here we generate the url for the image using the file buffer and the original name of the file


        const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);//here we upload the image to cloudinary and get the url of the image
        const newPin = new Pin({
            title,
            pin,
            owner:req.user._id,
            image:{
                id:cloud.public_id,
                url:cloud.secure_url,
            }
        })
        await newPin.save();
            
        res.status(201).json({
            message:"Pin created successfully",
            pin:newPin,
        })
    }

    catch(err){
        return res.status(500).json({
            message:"Error creating pin"
        })
    }


}

module.exports={
    createpin,
}



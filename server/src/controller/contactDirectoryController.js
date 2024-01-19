const Contact = require('../model/contactDirectoryModel')

// ===========GET================
    const getContact =  async (req, res) => {
      try {
      
         const data = await Contact.find({})

         res.status(200).json({success: true, data : data})
      } catch (err) {
         res.status(400).json({message: err.message})
      }
      
    }

// ===========CREATE================

 const createContact =  async (req, res) => {
    const {name,email,phone,image} = req.body
   
    try {
       const contact = await Contact.create({name,email,phone,image:req.file.path})
       res.send({success : true, message : "Contact created successfully", contact: contact})
    } catch (err) {
      res.status(400).json({msg:err.message})
    }
 

}

module.exports = {
    createContact, getContact
}
const { announceModels } = require('../models/mainModels');
const db = require('../models/mainModels')
exports.createNewAnnouncement = async (req,res)=>{
    var annouce = await db.announceModels.create(req.body.annoucement);
    if(annouce){
        return res.status(200).json({
            "Message":"Create annoucement successfully",
            "announcement":annouce
        })
    }else{
        return res.status(500).json({
            "Message":"Cant create new annoucement"
        })
    }
}
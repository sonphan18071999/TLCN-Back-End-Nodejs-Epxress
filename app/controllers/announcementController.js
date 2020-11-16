const db = require('../models/mainModels')
exports.createNewAnnouncement = async (req,res)=>{
    var a = await db.announceModels.create();
}
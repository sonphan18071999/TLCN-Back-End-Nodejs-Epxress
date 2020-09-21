const db = require('../models/mainModels');
exports.AddNewCPU = async function (req, res, next) {
    const cpu = new db.cpuModels({
        NameCPU: req.body.NameCPU,
        Core:req.body.Core,
        Thread:req.body.Thread,
        SpeedAverage:req.body.SpeedAverage,
        SpeedTurbo: req.body.SpeedTurbo,
        Architecture: req.body.Architecture,
        ThermalDesignPower:req.body.ThermalDesignPower,
        Value:req.body.Value,
        MarketShare:req.body.MarketShare,
        ReleaseDate: req.body.ReleaseDate,
        Price:req.body.Price,
        VoteUp:req.body.VoteUp,
        VoteDown:req.body.VoteDown,
        Image:req.body.Image,
        IdBrand:req.body.IdBrand
    })
    cpu.save(function (errr) {
      if (errr) {
        res.status(500).json("Failed to create new cpu ");
      }
      else
        res.status(200).json({
          message: "Create cpu successfully!!",
          cpu: cpu
        });
    })
}

exports.EditCPU = async function (req, res, next) {
   db.cpuModels.findById({_id:req.body.id},function(notfound,found){
       if(notfound){
        res.status(500).json("Cant find id of this CPU");
       }
       if(found){
           found.Value = req.body.Value
           found.VoteDown += req.body.VoteDown;
           found.VoteUp -= req.body.VoteUp;
           found.Price = req.body.Price;
        res.status(200).json({
        message: "Editted cpu successfully!!",
        cpu: found
        });
       }
   })
}
exports.getAllCPU = async function (req,res,next) {
  db.cpuModels.find(function(isEmpty,notEmpty){
    if(isEmpty){
      res.status(500).json("Server doesn't have any CPUs!");
    }else{
      res.status(200).json({cpu:notEmpty});
    }
    
  })
  }
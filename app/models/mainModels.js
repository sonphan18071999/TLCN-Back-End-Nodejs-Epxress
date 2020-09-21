const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TestSchema = new Schema({
  title: { type: String, default: null }
})

let CPUSchema = new Schema({
  NameCPU: {type: String, default:null},
  Core: {type: Number, default:null},
  Thread: {type: Number, default:null},
  SpeedAverage: {type: Number, default:null},
  SpeedTurbo: {type: Number , default:null},
  Architecture: {type: String, default:null},
  ThermalDesignPower: {type: Number, default:null},
  Value: {type: Number, default:null},
  MarketShare: {type: Number, default:null},
  ReleaseDate: {type: Date, default:Date.now()},
  Price: {type: Number, default:null},
  VoteUp: {type: Number, default:null},
  VoteDown: {type: Number, default:null},
  Image:{type:String, default:null},
  IdBrand: {type: String, default:null},
})

let BrandSchema = new Schema({
  NameBrand: { type: String, default: null }
})



var testModels = mongoose.model('Test', TestSchema);
var cpuModels  = mongoose.model('CPU',CPUSchema);
var brandModels = mongoose.model('Brand',BrandSchema);
module.exports = {
  testModels:testModels,
  cpuModels:cpuModels,
  brandModels:brandModels
};

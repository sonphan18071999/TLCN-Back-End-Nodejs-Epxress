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
let UserSchema = new Schema({
  name: { type: String, required: true, default: null },
  email: { type: String, required: true, default: null },
  phone: { type: String, required: true, default: null },
  dob: { type: Date, required: true, default: null },
  nation: { type: String, required: true, default: null },
  identification: { type: String, required: true, default: null },
  idAvatar:{type:String},
})

let AccountSchema = new Schema({
  userName: { type: String, unique: true, required: true, max: 50 },
  password: { type: String, required: true,min:6 },
  sessionId: { type: String, default: null },
  otp: { type: String, default: null },
  timeOut: { type: Number, default: 3000 },
  idUser: { type: String, required: true },
  isAdmin: { type: String, default: "normal" },
  reputation :{type:Number,default:0}

})
let imageSchema = new Schema ({
  nameImage:{type:String},
  img: { data: Buffer, contentType: String }
})

let articleSchema = new Schema({
  tittle:{type: String},
  content:{type: String},
  likesCount:{type:Number,default:0},
  postedOn:{type:Date,default:Date.now()},
  idUser:{type:mongoose.ObjectId}
})

let commentSchema = new Schema({
  likesCount:{type:Number,default:0},
  content:{type:String},
  postedOn:{type:Date},
  idUser:{type:mongoose.Schema.ObjectId},
  idChild:[{type:mongoose.Schema.ObjectId}]
})

var testModels = mongoose.model('Test', TestSchema);
var cpuModels  = mongoose.model('CPU',CPUSchema);
var brandModels = mongoose.model('Brand',BrandSchema);
var userModels = mongoose.model('User', UserSchema);
var userAccountModels = mongoose.model('User Account', AccountSchema);
var imageModels = mongoose.model('Image',imageSchema);
var articleModels = mongoose.model('Articles',articleSchema);
var commentModels = mongoose.model('Comments',commentSchema);

module.exports = {
  testModels:testModels,
  cpuModels:cpuModels,
  brandModels:brandModels,
  userModels:userModels,
  userAccountModels:userAccountModels,
  imageModels:imageModels,
  articleModels:articleModels,
  commentModels:commentModels
};

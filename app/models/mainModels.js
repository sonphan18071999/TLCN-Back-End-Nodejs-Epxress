const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TestSchema = new Schema({
  title: { type: String, default: null }
})



let BrandSchema = new Schema({
  NameBrand: { type: String, default: null }
})


let AccountSchema = new Schema({
  email: { type: String, required: true, default: null },
  password: { type: String, required: true,min:6 },
  sessionId: { type: String, default: null },
  otp: { type: String, default: null },
  timeOut: { type: Number, default: 3000 },
  reputation :{type:Number,default:0},
  name: { type: String, required: true, default: null },
  phone: { type: String, required: true, default: null },
  identification: { type: String, default: null },
  userAvatar:{type:String,default:null},
  typeAccount: {type: String, enum : ['normal','admin','facebook','google'], default: 'normal'},
  isNewAccount:{type:Boolean,default:false}
})
let imageSchema = new Schema ({
  nameImage:{type:String},
  img: {type: String }
})

let articleSchema = new Schema({
  tittle: { type: String },
  description:{type:String},
  content: [
    {
      partContent: { type: String },
      images: { type: String }
    }
  ],
  likesCount: { type: Number, default: 0 },
  postedOn: { type: Date, default: Date.now() },
  idUser: { type: mongoose.ObjectId },
  AvatarPost: { type: String },
  subjects:[{
    name:{type:String},
    hashtag:[{type:String}]
  }]
})

let commentSchema = new Schema({
  likesCount:{type:Number,default:0},
  content:{type:String},
  postedOn:{type:Date,default:Date.now},
  idUser:{type:mongoose.Schema.ObjectId},
  childComment:[{
    likesCountChild:{type:Number,default:0},
    contentChild:{type:String},
    postedOnChild:{type:Date,default:Date.now},
    idUserChild:{type:mongoose.Schema.ObjectId},
  }],
  idArticle: {type:mongoose.Schema.ObjectId}
})

var testModels = mongoose.model('Test', TestSchema);
var brandModels = mongoose.model('Brand',BrandSchema);
var userAccountModels = mongoose.model('User Account', AccountSchema);
var imageModels = mongoose.model('Image',imageSchema);
var articleModels = mongoose.model('Articles',articleSchema);
var commentModels = mongoose.model('Comments',commentSchema);

module.exports = {
  testModels:testModels,
  brandModels:brandModels,
  userAccountModels:userAccountModels,
  imageModels:imageModels,
  articleModels:articleModels,
  commentModels:commentModels
};

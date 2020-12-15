const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AccountSchema = new Schema({
  email: { type: String, required: true, default: null },
  password: { type: String, required: true,min:6 },
  otp: { type: String, default: null },
  reputation :{type:Number,default:0},
  name: { type: String, required: true, default: null },
  phone: { type: String, required: true, default: null },
  identification: { type: String, default: null },
  userAvatar:{type:String,default:null},
  typeAccount: {type: String, enum : ['normal','admin','facebook','google'], default: 'normal'},
  isNewAccount:{type:Boolean,default:true}
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
  AvatarPost: { type: String }
})

let commentSchema = new Schema({
  likesCount:{type:Number,default:0},
  content:{type:String},
  postedOn:{type:Date,default:Date.now},
  idUser:{type:mongoose.Schema.ObjectId},
  nameUser:{type:String},
  childComment:[{
    likesCountChild:{type:Number,default:0},
    contentChild:{type:String},
    postedOnChild:{type:Date,default:Date.now},
    idUserChild:{type:mongoose.Schema.ObjectId},
    nameUserChild:{type:String}
  }],
  idArticle: {type:mongoose.Schema.ObjectId}
})

let savedArticleSchema = new Schema({
  idUser:String,
  allArticleSaved:[{
    idArticle:String
  }]
})

let announceArticleSchema = new Schema({
  idUser: { type: mongoose.Schema.ObjectId },
  description:{type:String},
  typeComment:{type: String, enum : ['Comment','Like','Report'], default: 'Like'},
  idArticle:{type:mongoose.Schema.ObjectId}
})

let hashTagSchema = new Schema({
  name:String,
  article:[{
    type:mongoose.Schema.ObjectId
  }]
})

let ArticleBeingReportSchema = new Schema({
  // Level 0: Cảnh bảo,
  // Level 1: Ban 3 ngày,
  // Level 2: Ban 7 ngày,
  // Level 3: Xóa bài viết 
  idArticle:{type:String},
  userReport:[{
    idUser:{type:mongoose.Schema.ObjectId},
    Reason:{type:String}
  }],
  levelBan:{type:Number,default:0},        
  endBanDate:{type:String,default:Date.now},
  isDisabled:{type:Boolean,default:false}
})

let BullentinBoardSchema = new Schema({
  imgUrl: {type:String},
  title:{type:String},
  idAuthor:{type:String},
  likesUser:[{type:mongoose.Schema.ObjectId}],
  viewer:[{type:mongoose.Schema.ObjectId}],
  datePost:{type:Date,default:Date.now}
})

var userAccountModels = mongoose.model('UserAccount', AccountSchema);
var imageModels = mongoose.model('Image',imageSchema);
var articleModels = mongoose.model('Articles',articleSchema);
var commentModels = mongoose.model('Comments',commentSchema);
var savedModels = mongoose.model('SavedArticle',savedArticleSchema);
var announceModels = mongoose.model('Announcement',announceArticleSchema);
var hashTagModels = mongoose.model('HashTag',hashTagSchema);
var articleBeingReportModels = mongoose.model('ArticleBeingReport',ArticleBeingReportSchema);
var bullentinBoard = mongoose.model('BullentinBoard',BullentinBoardSchema);
module.exports = {
  userAccountModels:userAccountModels,
  imageModels:imageModels,
  articleModels:articleModels,
  commentModels:commentModels,
  savedModels:savedModels,
  announceModels:announceModels,
  hashTagModels:hashTagModels,
  articleBeingReportModels:articleBeingReportModels,
  bullentinBoard:bullentinBoard
};

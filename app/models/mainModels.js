const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let account = new Schema({
  email: { type: String, required: true, default: null },
  password: { type: String, required: true, min: 6 },
  otp: { type: String, default: null },
  reputation: { type: Number, default: 0 },
  name: { type: String, required: true, default: null },
  phone: { type: String, required: true, default: null },
  identification: { type: String, default: null },
  userAvatar: { type: String, default: null },
  typeAccount: {
    type: String,
    enum: ["normal", "admin", "facebook", "google"],
    default: "normal",
  },
  isNewAccount: { type: Boolean, default: true },
  token: { type: String },
});

let imageSchema = new Schema({
  nameImage: { type: String },
  img: { type: String },
});

let post = new Schema({
  tittle: { type: String },
  description: { type: String },
  content: [
    {
      partContent: { type: String },
      images: { type: String },
    },
  ],
  likesCount: { type: Number, default: 0 },
  postedOn: { type: Date, default: Date.now() },
  idUser: { type: mongoose.ObjectId },
  AvatarPost: { type: String },
  arrayLike: [
    {
      idUser: { type: mongoose.ObjectId },
    },
  ],
});

let commentSchema = new Schema({
  likesCount: { type: Number, default: 0 },
  content: { type: String },
  postedOn: { type: Date, default: Date.now },
  idUser: { type: mongoose.Schema.ObjectId },
  nameUser: { type: String },
  childComment: [
    {
      likesCountChild: { type: Number, default: 0 },
      contentChild: { type: String },
      postedOnChild: { type: Date, default: Date.now },
      idUserChild: { type: mongoose.Schema.ObjectId },
      nameUserChild: { type: String },
    },
  ],
  idArticle: { type: mongoose.Schema.ObjectId },
});

let savedArticleSchema = new Schema({
  idUser: String,
  allArticleSaved: [
    {
      idArticle: String,
    },
  ],
});

let announceArticleSchema = new Schema({
  idUser: { type: mongoose.Schema.ObjectId },
  description: { type: String },
  typeComment: {
    type: String,
    enum: ["Comment", "Like", "Report"],
    default: "Like",
  },
  idArticle: { type: mongoose.Schema.ObjectId },
});

let hashTagSchema = new Schema({
  name: String,
  article: [
    {
      type: mongoose.Schema.ObjectId,
    },
  ],
});

let ArticleBeingReportSchema = new Schema({
  idArticle: { type: String },
  userReport: [
    {
      idUser: { type: mongoose.Schema.ObjectId },
      Reason: { type: String },
    },
  ],
  levelBan: { type: Number, default: 0 },
  endBanDate: { type: String, default: Date.now },
  isDisabled: { type: Boolean, default: false },
});

let BullentinBoardSchema = new Schema({
  imgUrl: { type: String },
  title: { type: String },
  idAuthor: { type: String },
  likesUser: [{ type: mongoose.Schema.ObjectId }],
  viewer: [{ type: mongoose.Schema.ObjectId }],
  datePost: { type: Date, default: Date.now },
});

let mailSchema = new Schema({
  sender: { type: String },
  receiver: { type: String },
  title: { type: String },
  ccList: { type: Array },
  bccList: { type: Array },
  content: { type: String },
  isOpen: { type: Boolean, default: false },
  timeToSend: { type: Date },
});

let postDTO = mongoose.model("Articles", post);
let articleBeingReportModels = mongoose.model(
  "ArticleBeingReport",
  ArticleBeingReportSchema
);
let announceModels = mongoose.model("Announcement", announceArticleSchema);
let bullentinBoard = mongoose.model("BullentinBoard", BullentinBoardSchema);
let commentModels = mongoose.model("Comments", commentSchema);
let hashTagModels = mongoose.model("HashTag", hashTagSchema);
let imageModels = mongoose.model("Image", imageSchema);
let savedModels = mongoose.model("SavedArticle", savedArticleSchema);
let accountDTO = mongoose.model("UserAccount", account);
let mailModel = mongoose.model("Mail", mailSchema);

module.exports = {
  accountDTO,
  imageModels,
  postDTO,
  commentModels,
  savedModels,
  announceModels,
  hashTagModels,
  articleBeingReportModels,
  bullentinBoard,
  mailModel,
};

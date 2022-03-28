const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = require("./mainModels");

let group = new Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  type: {
    type: String,
    enum: ["private", "public"],
    default: "public",
  },
  background: {
    type: String,
    default:
      "https://images.pexels.com/photos/11341064/pexels-photo-11341064.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  members: { type: [db.account], default: [] },
  posts: { type: [db.post], default: [] },
});

let groupDTO = mongoose.model("Group", group);

module.exports = {
  groupDTO,
};

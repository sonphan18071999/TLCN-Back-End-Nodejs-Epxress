const group = require("../models/group");
const _ = require("lodash");

exports.createGroup = async (req, res, next) => {
  const groupReq = req.body;
  if (_.isEmpty(groupReq)) {
    return res.status(500).json({
      message: "Group can't be empty",
    });
  }
  var groupCreated = await group.groupDTO.create(req.body);
  if (groupCreated) {
    return res.status(200).json({
      message: "Group create successfully",
      group: groupCreated,
    });
  }
};

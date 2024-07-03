const db = require("../db");

const createRoom = async (req, res) => {
  const { room_name, room_description, room_id, admin_email } = req.body;

  const roomQuery =
    "INSERT INTO rooms (`room_id`, `room_name`, `room_description`) VALUES (?, ?, ?)";
  const roomValues = [room_id, room_name, room_description];

  db.query(roomQuery, roomValues, (err, roomResult) => {
    if (err) {
      console.error("Error creating room:", err);
      res.json(err);
      return;
    }

    const admin_name = admin_email.split("@")[0];
    const adminQuery =
      "INSERT INTO admins (`admin_email`, `room_id`, `admin_name`) VALUES (?, ?, ?)";
    const adminValues = [admin_email, room_id, admin_name];

    db.query(adminQuery, adminValues, (err, adminResult) => {
      if (err) {
        res.json(err);
        return;
      }

      const memberQuery =
        "INSERT INTO roommembers (`member_name`, `room_id`) VALUES (?, ?)";
      const memberValues = [admin_email.split("@")[0], room_id];

      db.query(memberQuery, memberValues, (err, memberResult) => {
        if (err) {
          res.json(err);
          return;
        }

        console.log(`Room created successfully. With room id ${room_id}.`);
        res.json({
          message: `Room created successfully. With room id ${room_id}.`,
          room: {
            id: room_id,
            name: room_name,
            description: room_description,
          },
          admin: {
            id: adminResult.insertId,
            name: admin_email,
            room_id: room_id,
          },
        });
      });
    });
  });
};

const addNewAdminToRoom = (req, res) => {
  const { admin_email, room_id, admin_name } = req.body;

  const q =
    "INSERT INTO admins (`admin_email`, `room_id`, `admin_name`) VALUES (?, ?, ?)";
  const values = [admin_email, room_id, admin_name];

  db.query(q, values, (err, result) => {
    if (err) {
      return res.json(err);
    }

    console.log("Editor added to room successfully");
    res.json({
      message: "Editor added to room successfully",
      result: result,
    });
  });
};

const addNewMemberToRoom = (req, res) => {
  const { member_name, room_id } = req.body;

  const query = `
      SELECT *
      FROM roommembers
      WHERE member_name = ? and room_id = ?`;

  db.query(query, [member_name, room_id], (err, results) => {
    if (err) {
      res.json(err);
      return;
    }

    if (results.length !== 0) {
      res.json({ message: `You have already joined room with id ${room_id}` });
      return;
    }

    const q =
      "INSERT INTO roommembers (`member_name`, `room_id`) VALUES (?, ?)";
    const values = [member_name, room_id];

    db.query(q, values, (err, result) => {
      if (err) {
        return res
          .status(404)
          .json({ message: `Room not found with ID ${room_id} !!!` });
      }

      console.log(`Joined room with room id ${room_id} successfully.`);
      res.json({
        message: `Joined room with room id ${room_id} successfully.`,
        result: result,
      });
    });
  });
};

const addDocumentInRoom = (req, res) => {
  const { room_id, doc_name, description, uploaded_by, url } = req.body;

  const q =
    "INSERT INTO documents (`room_id`, `doc_name`, `description`, `uploaded_by`, `url`) VALUES (?, ?, ?, ?, ?)";
  const values = [room_id, doc_name, description, uploaded_by, url];

  db.query(q, values, (err, result) => {
    if (err) {
      res.json(err);
      return;
    }

    console.log("Document added to room successfully");
    res.json({
      message: "Document added to room successfully",
      document: result,
    });
  });
};

const deleteDocumentById = (req, res) => {
  const { id } = req.params;

  const q = "DELETE FROM documents WHERE doc_id = ?";
  db.query(q, [id], (err, result) => {
    if (err) {
      console.error("Error deleting document:", err);
      res.json(err);
      return;
    }

    console.log("Document deleted successfully");
    res.json({ message: "Document deleted successfully", result: result });
  });
};

const removeMemberFromRoom = (req, res) => {
  const { member_name, room_id } = req.params;
  console.log(member_name, room_id);

  const query = "DELETE FROM roommembers WHERE member_name = ? AND room_id = ?";

  db.query(query, [member_name, room_id], (err, results) => {
    if (err) {
      res.json(err);
      return;
    }

    console.log("Member removed successfully");
    res.json({
      message: "Left the room successfully",
      member_name: member_name,
      room_id: room_id,
      data: results,
    });
  });
};

module.exports = {
  createRoom,
  addNewAdminToRoom,
  addNewMemberToRoom,
  addDocumentInRoom,
  deleteDocumentById,
  removeMemberFromRoom,
};

const db = require("../db");

const getDocumentsByRoomIdIfMember = (req, res) => {
  const { room_id, member_name } = req.params;

  const q = `
      SELECT documents.* 
      FROM documents
      JOIN roommembers ON documents.room_id = roommembers.room_id
      WHERE documents.room_id = ? AND roommembers.member_name = ? ORDER BY timestamp DESC`;

  db.query(q, [room_id, member_name], (err, results) => {
    if (err) {
      res.json(err);
      return;
    }

    const q1 = "SELECT * FROM admins WHERE admin_name = ? AND room_id = ?";

    db.query(q1, [member_name, room_id], (err, results2) => {
      if (err) {
        console.error("Error checking admin status:", err);
        res.json(err);
        return;
      }

      let isAdmin = true;

      if (results2.length === 0) {
        isAdmin = false;
      }

      if (results.length === 0) {
        res.json({
          message: "No documents found in the room",
          isAdmin: isAdmin,
          documents: results,
        });
        return;
      }

      console.log("Documents retrieved successfully");
      res.json({
        message: "Documents retrieved successfully",
        isAdmin: isAdmin,
        documents: results,
      });
    });
  });
};

const getRoomDetails = (req, res) => {
  const { room_id } = req.params;
  const q = "SELECT * FROM rooms WHERE room_id = ?";

  db.query(q, [room_id], (err, results) => {
    if (err) {
      res.json(err);
      return;
    }

    if (results.length === 0) {
      res.json({ message: "Room not found", data: results });
      return;
    }

    const ga = "SELECT admin_id, admin_name FROM admins WHERE room_id = ?";

    db.query(ga, [room_id], (err, results2) => {
      if (err) {
        res.json(err);
        return;
      }

      const gm =
        "SELECT member_id, member_name FROM roommembers WHERE room_id = ?";

      db.query(gm, [room_id], (err, results3) => {
        if (err) {
          res.json(err);
          return;
        }

        console.log("Room's data retrieved successfully");
        res.json({
          message: "Room's data retrieved successfully",
          data: results,
          admins: results2,
          members: results3,
        });
      });
    });
  });
};

const getRoomsForMember = (req, res) => {
  const { member_name } = req.params;

  const query = `
      SELECT rooms.*
      FROM rooms
      JOIN roommembers ON rooms.room_id = roommembers.room_id
      WHERE roommembers.member_name = ?`;

  db.query(query, [member_name], (err, results) => {
    if (err) {
      res.json(err);
      return;
    }

    if (results.length === 0) {
      res.json({ message: "No rooms found for this member" });
      return;
    }

    console.log("Rooms retrieved successfully");
    res.json({
      message: "Rooms retrieved successfully",
      rooms: results,
    });
  });
};

module.exports = {
  getDocumentsByRoomIdIfMember,
  getRoomDetails,
  getRoomsForMember,
};

import { React, useState } from "react";
import { UserAuth } from "../context/auth";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const CreateRoom = () => {
  const { user } = UserAuth();
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");

  const generateRoomId = () => {
    return uuidv4().replace(/-/g, "").substring(0, 6);
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const roomID = generateRoomId();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/createRoom`,
        {
          room_name: roomName,
          room_description: description,
          admin_email: user.email,
          room_id: roomID,
        }
      );
      // console.log(res);
      toast.success(res.data.message);
      setRoomName("");
      setDescription("");
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[90vh] flex place-items-center">
      <form
        onSubmit={handleCreateRoom}
        className="w-[36%] mx-auto p-10 bg-zinc-700 text-gray-100 rounded-md"
      >
        <h2 className="text-3xl font-semibold mb-5 text-center">Create Room</h2>
        <div>
          <div className="mb-4 flex flex-col gap-1">
            <label className="text-xl">Room Name:</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
              className="text-gray-900 bg-zinc-200 px-3 py-1 text-lg rounded-md outline-none"
            />
          </div>
          <div className="mb-4 flex flex-col gap-1">
            <label className="">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="text-gray-900 bg-zinc-200 px-3 py-1 text-lg rounded-md outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="block mx-auto mt-10 px-8 py-2 rounded-md bg-zinc-900"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoom;

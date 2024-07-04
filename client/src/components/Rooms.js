import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/auth";
import MyRooms from "./MyRooms";
import axios from "axios";
import toast from "react-hot-toast";

const Rooms = () => {
  const navigate = useNavigate();
  const [roomcode, setRoomcode] = useState("");
  const { user } = UserAuth();

  const handleCodeChange = (e) => {
    setRoomcode(e.target.value);
  };

  const findRoomAndJoin = async () => {
    const username = user.email.split("@")[0];
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/addNewMemberInRoom`,
        {
          member_name: username,
          room_id: roomcode,
        }
      );
      // console.log(res);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
    }
    // console.log("Finding room with code: ", roomcode);
  };

  const handleCreateRoom = () => {
    navigate("/createRoom");
  };

  return (
    <div className="pt-20 md:pt-10">
      <div className="w-[80%] mx-auto justify-center flex md:flex-col gap-6">
        <div className="w-[40%] md:w-full px-10 py-6 md:px-6 md:py-3 bg-gray-300 rounded-xl border-2 border-gray-600">
          <h1 className="mb-6 text-4xl it font-medium md:text-2xl">
            Join a room
          </h1>
          <div>
            <h1 className="mb-2 text-2xl md:text-lg">Enter room code:</h1>
            <div className="flex gap-4 md:flex-col">
              <input
                type="text"
                placeholder="Room Code"
                onChange={handleCodeChange}
                className="w-[16rem] md:w-full text-xl md:text-lg md:py-1 md:px-2 px-3 py-2 rounded-md outline-none border-2 border-gray-600"
              />
              <button
                onClick={findRoomAndJoin}
                disabled={roomcode.length !== 6}
                className="text-zinc-200 text-xl md:text-lg md:w-[50%] md:block md:mx-auto px-6 py-2 md:px-4 md:py-1 disabled:cursor-not-allowed rounded-md border-2 border-zinc-800 bg-zinc-700 hover:bg-zinc-400 hover:text-zinc-900 duration-300"
              >
                Join
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handleCreateRoom}
          className="flex text-center cursor-pointer flex-col justify-center w-[40%] md:w-full px-10 py-6 bg-gray-300 hover:bg-gray-400 duration-200 rounded-xl border-2 border-gray-600"
        >
          <h1 className="block mx-auto text-4xl it font-medium md:text-2xl">
            Create your room
          </h1>
        </button>
      </div>
      <MyRooms />
    </div>
  );
};

export default Rooms;

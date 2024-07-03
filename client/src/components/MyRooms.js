import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserAuth } from "../context/auth";
import { Link } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import toast from "react-hot-toast";

const MyRooms = () => {
  const [myRooms, setMyRooms] = useState([]);
  const { user } = UserAuth();
  const [leaveRoomMenu, setLeaveRoomMenu] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (user.email) {
        try {
          const username = user.email.split("@")[0];
          const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/getRoomsForMember/${username}`
          );
          // console.log(res);
          setMyRooms(res.data.rooms);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [user]);

  const handleLeaveRoom = async (room_id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/leaveRoom/${room_id}/${
          user.email.split("@")[0]
        }`
      );
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[80%] mx-auto my-20">
      <div className="text-4xl font-medium text-center mb-10">My Rooms</div>

      {myRooms?.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {myRooms.map((room) => (
            <div key={room.room_id} className="card bg-zinc-100 shadow-xl">
              <div className="card-body pb-4 pt-6 justify-between">
                <div className="flex relative justify-between">
                  <div className="w-[90%]">
                    <h2 className="card-title mb-2">{room.room_name}</h2>
                    <p>
                      {room.room_description.substr(0, 70)}
                      {room.room_description.length > 70 && "..."}
                    </p>
                  </div>
                  <HiOutlineDotsVertical
                    onClick={() => {
                      if (leaveRoomMenu !== "") {
                        setLeaveRoomMenu("");
                      } else {
                        setLeaveRoomMenu(room.room_id);
                      }
                    }}
                    className="text-2xl cursor-pointer"
                  />
                  {leaveRoomMenu === room.room_id && (
                    <button
                      onClick={() => handleLeaveRoom(room.room_id)}
                      className="duration-100 text-sm font-medium cursor-pointer select-none px-4 py-2 absolute right-0 -top-10 rounded-md bg-red-300"
                    >
                      Leave Room
                    </button>
                  )}
                </div>
                <div className="card-actions justify-end">
                  <Link
                    to={`/room/${room.room_id}`}
                    className="px-4 py-2 bg-zinc-600 text-zinc-100 rounded-md"
                  >
                    Enter
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="w-full text-4xl text-center font-semibold text-zinc-400">
          You have not joined any room yet...
        </h2>
      )}
    </div>
  );
};

export default MyRooms;

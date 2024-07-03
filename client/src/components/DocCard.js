import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const DocCard = ({ data, isAdmin }) => {
  const modalRef = useRef(null);
  const [isDocOpen, setIsDocOpen] = useState(false);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsDocOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleDocDelete = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/deleteDocByID/${data.doc_id}`
      );
      // console.log(res);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsDocOpen(true)}
        className="flex flex-col justify-between cursor-pointer p-6 rounded-xl shadow-lg duration-150 hover:-translate-y-1 hover:bg-slate-300 bg-slate-50"
      >
        <div>
          <h2 className="text-2xl font-semibold">{data.doc_name}</h2>
          <p className="mt-1">
            {data.description.substr(0, 70)}
            {data.description.length > 70 && "..."}
          </p>
        </div>
        <div>
          <div className="flex text-sm justify-end mt-4">
            - Uploaded by
            <span className="ml-1 font-semibold text-zinc-700">
              {data.uploaded_by}
            </span>
          </div>
          <div className="flex text-sm justify-end font-semibold text-zinc-700">
            {data.timestamp.split("T")[0]}
          </div>
        </div>
      </div>
      {isDocOpen && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div
            ref={modalRef}
            className="w-[50%] mx-auto flex flex-col justify-between p-10 rounded-xl shadow-lg bg-slate-50"
          >
            <div>
              <h2 className="text-2xl font-semibold">{data.doc_name}</h2>
              <p className="text font-medium text-zinc-700 text-justify mt-6">
                {data.description}
              </p>
            </div>
            <div className="flex justify-between mt-6">
              <div className="place-content-center">
                <div className="text-sm">
                  Uploaded by{" "}
                  <span className="font-semibold text-zinc-700">
                    {data.uploaded_by}
                  </span>
                </div>
                <div className="text-sm font-semibold text-zinc-700">
                  {data.timestamp.split("T")[0]}
                </div>
              </div>
              <div className="flex gap-10 place-content-center">
                <a
                  href={data.url}
                  target="_blank"
                  className="px-6 py-2 text-xl font-medium border-2 border-zinc-700 bg-zinc-300 rounded-lg"
                >
                  Open
                </a>
                {isAdmin && (
                  <button
                    onClick={handleDocDelete}
                    className="cursor-pointer text-3xl text-red-600"
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocCard;

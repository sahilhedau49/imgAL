import React, { useState } from "react";
import useStorage from "../Hooks/useStorage";
import Zoom from "react-reveal/Zoom";
import { FiAlertCircle } from "react-icons/fi";

const UploadForm = ({ room_id, uploaded_by }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [doc_name, setDoc_name] = useState();
  const [description, setDescription] = useState();
  const { uploadDocument, progress, added, setAdded } = useStorage();
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let size = selectedFile.size / 1000;
    if (size > 100000) {
      setError("Size of file should be less than 100MB.");
    }
    let t = selectedFile.type.split("/")[1];
    if (
      t === "pdf" ||
      t === "png" ||
      t === "jpeg" ||
      t === "jpg" ||
      t === "vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      t === "msword" ||
      t === "vnd.ms-powerpoint" ||
      t === "vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      setError("");
      uploadDocument({
        file: selectedFile,
        doc_name: doc_name,
        description: description,
        room_id: room_id,
        uploaded_by: uploaded_by,
      });
      setTimeout(() => {
        setAdded(false);
        window.location.reload();
      }, 5000);
    } else {
      setError("Supported file types are pdf, png, docx, doc, pptx and ppt.");
    }
  };

  return (
    <div className="bg-slate-200 p-10 md:p-6 rounded-md">
      <form onSubmit={handleSubmit} className="form-control mx-auto">
        <div>
          <h1 className="text-3xl font-semibold mb-10 md:text-2xl md:mb-6 text-center">
            Upload Document
          </h1>
          <input
            onChange={handleFileChange}
            type="file"
            required
            className="file-input block mx-auto file-input-bordered w-[75%]"
          />
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium">Document Name</label>
          <input
            type="text"
            required
            onChange={(e) => {
              setDoc_name(e.target.value);
            }}
            placeholder="Document Name"
            className="input input-bordered w-full"
          />
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium">Description</label>
          <textarea
            required
            rows={8}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Describe about document content/purpose"
            className="input input-bordered h-auto w-full py-2"
          />
        </div>
        <div className="text-center mt-6">
          <button
            className="px-12 py-2 md:px-8 rounded-md text-xl md:text-lg font-medium border-2 duration-200 text-zinc-100 border-zinc-800 bg-zinc-800 hover:text-zinc-800 hover:bg-base-200"
            type="submit"
          >
            Add
          </button>
        </div>
        <span
          className={`mx-auto ${Boolean(progress) && " mt-6 loading"}`}
        ></span>
        {added && (
          <Zoom left>
            <div>
              <div className="w-fit text-lg mt-6 mx-auto px-4 py-1 bg-green-500 rounded-xl text-center text-slate-200 ">
                ✅ Document uploaded successfully
              </div>
            </div>
          </Zoom>
        )}
        {error && (
          <div className="alert alert-error flex mt-6 max-w-fit px-4 mx-auto py-2">
            <FiAlertCircle className="md:text-3xl" />
            <span className="md:text-xs">{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadForm;

import React, { useState } from "react";
import useStorage from "../Hooks/useStorage";
import Zoom from "react-reveal/Zoom";
import { FiAlertCircle } from "react-icons/fi";
import toast from "react-hot-toast";

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
    <div className="bg-slate-200 p-10 rounded-md">
      <form
        onSubmit={handleSubmit}
        className="form-control w-full max-w-md mx-auto"
      >
        <div>
          <h1 className="text-3xl font-semibold mb-10 text-center">
            Upload Document
          </h1>
          <input
            onChange={handleFileChange}
            type="file"
            required
            className="file-input block mx-auto file-input-bordered w-full max-w-xs"
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
            className="input input-bordered w-full max-w-lg"
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
            className="input input-bordered h-auto w-full max-w-lg py-2"
          />
        </div>
        <div className="text-center mt-6">
          <button
            className="px-12 py-2 bg-base-100 rounded-md text-xl font-medium"
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
              <div className="w-fit text-lg mt-6 mx-auto px-4 py-1 bg-green-500 rounded-full text-center text-slate-200 ">
                ✅ Document uploaded successfully
              </div>
            </div>
          </Zoom>
        )}
        {error && (
          <div className="alert alert-error mt-6 max-w-fit px-4 mx-auto py-2">
            <FiAlertCircle />
            <span>{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadForm;

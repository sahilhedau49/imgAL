import React from "react";

const Gallery = () => {
  return (
    <div className="grid md:grid-cols-3 justify-center gap-4 mt-10">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            className="w-20"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png"
            alt="PDF Img"
          />
        </figure>
        <div className="card-body">
          <p>Uploaded By: </p>
          <p>Created On: </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
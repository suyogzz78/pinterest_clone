import React, { useEffect, useState } from "react";
import { usePins } from "../context/PinContext";
import { useNavigate, useParams } from "react-router-dom";
import { Loading2 } from "../components/Loading";
import { useUser } from "../context/UserContext";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Pinpage = () => {
  const { singlePin, loading, fetchPinById, updatePin, deletePin, commentPin,deleteComment } =
    usePins();
  const { user } = useUser();
  const navigate = useNavigate();

  const { id } = useParams();

  const [comment, setcomment] = useState("");

  const [title, settitle] = useState("");
  const [edit, setEdit] = useState("");
  const [pinvalue, setpinvalue] = useState("");

  const commentHandler = (e) => {
    e.preventDefault();
    commentPin(comment, singlePin._id);
  };
  const editHandler = () => {
    settitle(singlePin.title); // Set title state to current pin title for editing
    setpinvalue(singlePin.pin); // Set pin value state to current pin value for editing
    setEdit(!edit); // Toggle edit mode
  };
  const updateHandler = () => {
    updatePin(singlePin._id, title, pinvalue, setEdit);
  };

  const deleteHandler = () => {
    deletePin(singlePin._id, navigate);
  };


  const handleDeleteComment = (commentid) =>{
    deleteComment(singlePin._id,commentid);
  }

  useEffect(() => {
    fetchPinById(id);
  }, [id, fetchPinById]);
  return (
    <div>
      {singlePin && (
        <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md">
          {loading ? (
            <Loading2 />
          ) : (
            <div className="flex flex-wrap bg-white w-full rounded-lg shadow-md p-4 max-w-7xl mx-auto min-h-full">
              <div className="w-full md:w-1/2 p-2 ">
                {singlePin && (
                  <img
                    src={singlePin.image.url}
                    alt={singlePin.title}
                    className="w-full h-auto rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x400?text=No+Image";
                    }}
                  />
                )}
              </div>

              <div className="w-full md:w-1/2 p-2 flex flex-col  ">
                <div className="flex items-center  mb-4 gap-5 justify-between">
                  {edit ? (
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                      className="text-2xl font-bold mb-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold mb-2">
                      {singlePin.title}
                    </h2>
                  )}

                  <div className="flex justify-end space-x-3">
                    {singlePin.owner && singlePin.owner._id === user?._id && (
                      <button
                        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-2 rounded transition"
                        onClick={editHandler}
                      >
                        <FaEdit />
                      </button>
                    )}

                    {singlePin.owner && singlePin.owner._id === user?._id && (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded transition"
                        onClick={deleteHandler}
                      >
                        <MdDelete />
                      </button>
                    )}
                  </div>
                </div>

                {edit ? (
                  <input
                    type="text"
                    value={pinvalue}
                    onChange={(e) => setpinvalue(e.target.value)}
                    className="text-2xl font-bold mb-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 w-full max-w-sm"
                  />
                ) : (
                  <h1 className="text-gray-900 text-lg mb-3">
                    {singlePin.pin}
                  </h1>
                )}

                {edit && (
                  <button
                    className="bg-blue-500 py-2 px-3 mt-2 mb-2 w-full max-w-sm rounded-lg"
                    onClick={updateHandler}
                  >
                    Update
                  </button>
                )}

                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {singlePin.owner?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {singlePin.owner?.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {singlePin.owner?.email}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {singlePin.owner.followers
                        ? singlePin.owner.followers.length
                        : 0}{" "}
                      followers
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {singlePin.owner?.name?.charAt(0).toUpperCase()}
                  </div>

                  <form
                    className="flex-1 space-x-4 flex items-center"
                    onSubmit={commentHandler}
                  >
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setcomment(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 max-w-md"
                    />

                    <button className="bg-red-500 px-4 py-3 text-gray-200 rounded-lg font-semibold hover:bg-red-600 transition">
                      Add
                    </button>
                  </form>
                </div>
                {singlePin.comments?.map((c) => (
                  <div
                    key={c._id}
                    className="flex items-start justify-between border-b py-3"
                  >
                    {/* LEFT SIDE */}
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold">
                        {c.name?.charAt(0).toUpperCase()}
                      </div>

                      {/* Name + Comment */}
                      <div>
                        <p className="font-semibold text-gray-800">{c.name}</p>
                        <p className="text-gray-600">{c.comment}</p>
                      </div>
                    </div>

                    {/* DELETE BUTTON */}
                    {c.user === user?._id && (
                      <button
                        onClick={() => handleDeleteComment(c._id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        <MdDelete/>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pinpage;

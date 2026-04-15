import React, { useEffect, useState } from "react";
import { usePins } from "../context/PinContext";
import { useNavigate, useParams } from "react-router-dom";
import { Loading2 } from "../components/Loading";
import { useUser } from "../context/UserContext";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Pinpage = () => {
  const {
    singlePin,
    loading,
    fetchPinById,
    updatePin,
    deletePin,
    commentPin,
    deleteComment,
  } = usePins();

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
    settitle(singlePin.title);
    setpinvalue(singlePin.pin);
    setEdit(!edit);
  };

  const updateHandler = () => {
    updatePin(singlePin._id, title, pinvalue, setEdit);
  };

  const deleteHandler = () => {
    deletePin(singlePin._id, navigate);
  };

  const handleDeleteComment = (commentid) => {
    deleteComment(singlePin._id, commentid);
  };

  useEffect(() => {
    fetchPinById(id);
  }, [id, fetchPinById]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      {singlePin && (
        <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
          {loading ? (
            <div className="p-10">
              <Loading2 />
            </div>
          ) : (
            <>
              {/* IMAGE SECTION */}
              <div className="w-full md:w-1/2 p-6">
                <img
                  src={singlePin.image.url}
                  alt={singlePin.title}
                  className="w-full h-[520px] object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x400?text=No+Image";
                  }}
                />
              </div>

              {/* RIGHT SIDE */}
              <div className="w-full md:w-1/2 p-6 flex flex-col">
                {/* TITLE + ACTIONS */}
                <div className="flex items-center justify-between mb-6">
                  {edit ? (
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                      className="text-2xl font-bold border border-gray-200 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  ) : (
                    <h2 className="text-3xl font-bold text-gray-900">
                      {singlePin.title}
                    </h2>
                  )}

                  <div className="flex gap-2 ml-3">
                    {singlePin.owner &&
                      singlePin.owner._id === user?._id && (
                        <button
                          onClick={editHandler}
                          className="p-2 rounded-xl bg-gray-900 text-white hover:scale-105 transition shadow"
                        >
                          <FaEdit />
                        </button>
                      )}

                    {singlePin.owner &&
                      singlePin.owner._id === user?._id && (
                        <button
                          onClick={deleteHandler}
                          className="p-2 rounded-xl bg-red-500 text-white hover:scale-105 transition shadow"
                        >
                          <MdDelete />
                        </button>
                      )}
                  </div>
                </div>

                {/* PIN TEXT */}
                 {edit ? (
                    <input
                      type="text"
                      value={pinvalue}
                      onChange={(e) => setpinvalue(e.target.value)}
                      className="text-xl font-semibold border border-gray-200 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  ) : (
                     <p className="text-gray-700 bg-gray-50 p-4 rounded-xl mb-4 leading-relaxed shadow-sm">
                  {singlePin.pin}
                </p>

                    
                  )}

               
                {edit && (
                  <button
                    onClick={updateHandler}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl shadow mb-4 transition"
                  >
                    Update
                  </button>
                )}

                {/* OWNER CARD */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow">
                    {singlePin.owner?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {singlePin.owner?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {singlePin.owner?.email}
                    </p>
                  </div>
                </div>

                {/* COMMENT INPUT */}
                <form
                  onSubmit={commentHandler}
                  className="flex items-center gap-3 mb-6"
                >
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full border border-gray-200 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
                  />
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow transition">
                    Add
                  </button>
                </form>

                {/* COMMENTS */}
                <div className="space-y-3">
                  {singlePin.comments?.map((c) => (
                    <div
                      key={c._id}
                      className="flex items-start justify-between p-3 rounded-xl hover:bg-gray-50 transition border-b-2 border-gray-500"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white flex items-center justify-center font-bold shadow">
                          {c.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {c.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {c.comment}
                          </p>
         
                        </div>
                      </div>

                      {c.user === user?._id && (
                        <button
                          onClick={() => handleDeleteComment(c._id)}
                          className="text-red-500 hover:text-red-600 hover:scale-110 transition"
                        >
                          <MdDelete />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Pinpage;
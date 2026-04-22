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

  const { user, followButton } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();

  const [comment, setcomment] = useState("");
  const [title, settitle] = useState("");
  const [edit, setEdit] = useState(false);
  const [pinvalue, setpinvalue] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const commentHandler = (e) => {
    e.preventDefault();
    commentPin(comment, singlePin._id);
    setcomment("");
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

  const handleFollowButton = async () => {
    if (followLoading) return;
    setFollowLoading(true);
    try {
      await followButton(singlePin?.owner?._id);
      setIsFollowing(!isFollowing);
      await fetchPinById(id);
    } catch (error) {
      console.error("Follow failed:", error);
    } finally {
      setFollowLoading(false);
    }
  };

  useEffect(() => {
    if (singlePin?.owner && user?._id) {
      setIsFollowing(singlePin.owner.followers?.includes(user._id));
    }
  }, [singlePin, user]);

  useEffect(() => {
    fetchPinById(id);
  }, [id, fetchPinById]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {singlePin && (
        <>
          {loading ? (
            <div className="min-h-screen flex items-center justify-center">
              <Loading2 />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto px-4 py-10">
              {/* DESKTOP: side by side | MOBILE: stacked */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* LEFT — IMAGE (sticky on desktop so it stays visible while scrolling comments) */}
                <div className="w-full md:w-1/2 md:sticky md:top-8">
                  <div className="rounded-2xl overflow-hidden bg-zinc-900">
                    <img
                      src={singlePin.image.url}
                      alt={singlePin.title}
                      className="w-full object-contain max-h-[80vh]"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/800x500?text=No+Image";
                      }}
                    />
                  </div>
                </div>
             
                {/* RIGHT — CONTENT */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                  {/* TITLE + EDIT/DELETE */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      {edit ? (
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => settitle(e.target.value)}
                          className="w-full bg-zinc-800 border border-zinc-600 text-white text-xl font-bold rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          autoFocus
                        />
                      ) : (
                        <h1 className="text-2xl font-bold text-white leading-snug">
                          {singlePin.title}
                        </h1>
                      )}
                    </div>

                    {singlePin.owner && singlePin.owner._id === user?._id && (
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={editHandler}
                          className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white text-sm px-3 py-2 rounded-lg transition"
                        >
                          <FaEdit size={13} />
                          {edit ? "Cancel" : "Edit"}
                        </button>
                        <button
                          onClick={deleteHandler}
                          className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded-lg transition"
                        >
                          <MdDelete size={15} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    {edit ? (
                      <input
                        type="text"
                        value={pinvalue}
                        onChange={(e) => setpinvalue(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-600 text-gray-300 text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Pin description..."
                      />
                    ) : (
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {singlePin.pin}
                      </p>
                    )}

                    {edit && (
                      <button
                        onClick={updateHandler}
                        className="mt-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition"
                      >
                        Save Changes
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 w-full">
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {singlePin.owner?.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-white text-sm">
                          {singlePin.owner?.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {singlePin.owner?.email}
                        </p>
                        <p className="text-xs text-gray-400">
                          Followers: {singlePin.owner?.followers?.length || 0}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT SIDE - Follow button */}
                    {singlePin.owner && singlePin.owner._id !== user?._id && (
                      <button
                        onClick={handleFollowButton}
                        disabled={followLoading}
                        className={`px-4 py-1 rounded-full text-sm font-semibold transition ${
                          followLoading
                            ? "bg-gray-600 cursor-not-allowed"
                            : isFollowing
                              ? "bg-zinc-700 text-white hover:bg-zinc-600"
                              : "bg-white text-black hover:bg-gray-200"
                        }`}
                      >
                        {followLoading
                          ? "..."
                          : isFollowing
                            ? "Following"
                            : "Follow"}
                      </button>
                    )}
                  </div>

                  {/* COMMENT INPUT */}
                  <form onSubmit={commentHandler} className="flex gap-2">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setcomment(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition flex-shrink-0"
                    >
                      Post
                    </button>
                  </form>

                  {/* COMMENTS */}
                  <div>
                    <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
                      {singlePin.comments?.length || 0}{" "}
                      {singlePin.comments?.length === 1
                        ? "Comment"
                        : "Comments"}
                    </p>

                    {singlePin.comments && singlePin.comments.length > 0 ? (
                      <div className="space-y-2">
                        {singlePin.comments.map((c) => (
                          <div
                            key={c._id}
                            className="group flex items-start justify-between gap-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl px-4 py-3 transition"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-zinc-700 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
                                {c.name?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-white">
                                  {c.name}
                                </p>
                                <p className="text-sm text-gray-400 mt-0.5">
                                  {c.comment}
                                </p>
                              </div>
                            </div>

                            {c.user === user?._id && (
                              <button
                                onClick={() => handleDeleteComment(c._id)}
                                className="text-gray-600 hover:text-red-400 transition opacity-0 group-hover:opacity-100 flex-shrink-0 mt-1"
                                title="Delete comment"
                              >
                                <MdDelete size={15} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm text-center py-6 bg-zinc-900 rounded-xl border border-zinc-800">
                        No comments yet. Be the first!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};



export default Pinpage;

import React, { useEffect } from "react";
import { usePins } from "../context/PinContext";
import { useParams } from "react-router-dom";
import { Loading2 } from "../components/Loading";
import { useUser } from "../context/UserContext";

const Pinpage = () => {
  const { singlePin, loading, fetchPinById } = usePins();
  const {user}= useUser();

  const { id } = useParams();

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

              <div className="w-full md:w-1/2 p-2 flex flex-col justify-between ">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{singlePin.title}</h2>
                  <p className="text-gray-700 ">{singlePin.pin}</p>
                  <div className="space-y-4">
                {singlePin.comments && singlePin.comments.length > 0 ? (
                  singlePin.comments.map((c) => (
                    <div
                      key={c._id}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-gray-800">{c.name}</p>
                        {singlePin.owner?._id === user?._id  && (
                        <button
                          onClick={() => handleDeleteComment(c._id)}
                          className="text-red-500 hover:text-red-600 text-sm font-semibold"
                        >
                          Delete
                        </button>)}
                        
                      </div>
                      <p className="text-gray-700">{c.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>


            


                 

                </div>

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
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pinpage;

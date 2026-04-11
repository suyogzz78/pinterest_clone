import React, { useEffect } from "react";
import { usePins } from "../context/PinContext";
import { useParams } from "react-router-dom";
import { Loading2 } from "../components/Loading";

const Pinpage = () => {
  const { singlePin, loading, fetchPinById } = usePins();

 const { id } = useParams(); 

useEffect(() => {
  fetchPinById(id); 
}, [id, fetchPinById]);
  return (
    <div>
      {singlePin && (
        <div className="flex flex-col bg-gray-300 p-4 rounded-lg shadow-md">
          {loading ? (
            <Loading2 />
          ) : (
            <div className="flex flex-wrap bg-white w-full rounded-lg shadow-md p-4">
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

              <div className="w-full md:w-1/2 p-2 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{singlePin.title}</h2>
                  <p className="text-gray-700 mb-4">{singlePin.pin}</p>
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

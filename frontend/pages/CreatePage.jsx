import React from "react";
import { usePins } from "../context/PinContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { toast } from "react-hot-toast";

const CreatePage = () => {
  const [title, setTitle] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);

  const { createPin, btnloading } = usePins();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!pin.trim()) {
      toast.error("Please enter a description");
      return;
    }
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    createPin(title, pin, image, navigate);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-800 via-zinc-800/95 to-pink-800/25 text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-600 opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-600 opacity-10 blur-[100px] rounded-full"></div>
      
      {/* Form Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md p-8 border border-zinc-700">
          <div className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Create New Pin
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter pin title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>

            {/* Description Input */}
            <div>
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Description
              </label>
              <textarea
                id="pin"
                placeholder="Enter pin description"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                rows="4"
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-zinc-800 border border-zinc-700 text-gray-300 rounded-lg px-4 py-2.5 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-zinc-700"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={btnloading}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {btnloading ? <Loading /> : "Create Pin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
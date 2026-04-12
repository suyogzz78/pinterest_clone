// import React from 'react'

// const CreatePage = () => {
//   return (
//     <div className='bg-gray-100 flex items-center justify-center min-h-screen'>
//         <div className='max-w-md bg-gray-400 w-full rounded-md p-6 m-5'>
//        <form >
//         <h2 className='text-white font-semibold text-xl mb-3 '>Create Pins</h2>
//         <label htmlFor='title' className='text-white gap-2'>Title</label>
//         <input name='title' placeholder='enter the title' id='title' className='w-full max-w-sm mb-4 '>
//         </input>
//         <label htmlFor='title' className='text-white gap-2 '>Title</label>
//         <input name='title' placeholder='enter the title' id='title'className='w-full max-w-sm mb-4 '>
//         </input>
//         <label htmlFor='title' className='text-white gap-2'>Title</label>
//         <input name='title' placeholder='enter the title' id='title'className='w-full max-w-sm mb-4'>
//         </input>
//         <label htmlFor='title' className='text-white gap-2'>Title</label>
//         <input name='title' placeholder='enter the title' id='title'className='w-full max-w-sm mb-4 '>
//         </input>

//         <button type='submit' className='mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 focus:ring-offset-2' >Create</button>

//        </form>
//        </div>

//     </div>
//   )
// }

// export default CreatePage
import React from "react";
import { usePins } from "../context/PinContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

const CreatePage = () => {
  // ============================================
  // ✅ 3 STATES FOR FORM INPUTS (like email/password in Login)
  // ============================================
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

    // ✅ Validation
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
    <div className="min-h-screen flex items-center justify-center bg-gray-200 shadow-lg">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="text-2xl font-semibold text-center mb-6">
          Create Pin
        </div>

        <form onSubmit={submitHandler}>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Title
          </label>

          <input
            type="text"
            id="title"
            placeholder="Enter pin title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-100 focus:border-red-500"
          />

          <label
            htmlFor="pin"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Description
          </label>

          <textarea
            id="pin"
            placeholder="Enter pin description"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-100 focus:border-red-500"
          />

          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Image
          </label>

          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-100 focus:border-red-500"
          />

          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          )}

          <button
            type="submit"
            className="commonbtn mt-6"
            disabled={btnloading}
          >
            {btnloading ? <Loading /> : "Create Pin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;

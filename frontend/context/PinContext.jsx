// frontend/src/context/PinContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/axiosConfig"; // Use configured axios
import { toast } from "react-hot-toast";

const PinContext = createContext();

export const PinProvider = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPins() {
    try {
      const { data } = await axios.get("/api/pins/getpins");
      console.log(data);
      setPins(data.pins);
    } catch (err) {
      toast.error("Error fetching pins");
    } finally {
      setLoading(false);
    }
  }

  const [singlePin, setSinglePin] = useState(null);

  async function fetchPinById(id) {
    if (!id) return;
    try {
      const { data } = await axios.get(`/api/pins/getpin/${id}`);
      setSinglePin(data.pin);
    } catch (err) {
      toast.error("Error fetching pin details");
    }
  }

  const [btnloading, setBtnLoading] = useState(false);

  async function createPin(title, pin, image, navigate) {
    setBtnLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("pin", pin);
      formData.append("file", image);

      const { data } = await axios.post("/api/pins/createpin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPins([...pins, data.pin]);
      toast.success(data.message || "Pin created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Create pin error:", error);
      toast.error(error.response?.data?.message || "Failed to create pin");
    } finally {
      setBtnLoading(false);
    }
  }

  async function updatePin(id, title, pin, setEdit) {
    try {
      const { data } = await axios.put(`/api/pins/updatepin/${id}`, {
        title,
        pin,
      });
      toast.success(data.message);
      fetchPins(id);
      setEdit(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function deletePin(id, navigate) {
    try {
      const { data } = await axios.delete(`/api/pins/deletepin/${id}`);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function commentPin(comment, id) {
    try {
      const { data } = await axios.post(`/api/pins/comment/${id}`, {comment});
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function deleteComment(pinid,commentid){

    try{

      const {data} = await axios.delete(`/api/pins/comment/${pinid}?commentid=${commentid}`)

     toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <PinContext.Provider
      value={{
        pins,
        loading,
        singlePin,
        fetchPinById,
        createPin,
        btnloading,
        updatePin,
        deletePin,
        commentPin,
        deleteComment
      }}
    >
      {children}
    </PinContext.Provider>
  );
};

export const usePins = () => useContext(PinContext);

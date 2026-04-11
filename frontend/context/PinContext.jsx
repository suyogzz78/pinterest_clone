import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
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
      setLoading(false);
    } catch (err) {
      toast.error("Error fetching pins");
    } finally {
      setLoading(false);
    }
  }


  const [singlePin, setSinglePin] = useState(null);


  async function fetchPinById(id) {
    if (!id) {
      
      return;
    }
    try {
      const { data } = await axios.get(`/api/pins/getpin/${id}`);
      setSinglePin(data.pin);
      setLoading(false);
    } catch (err) {
      toast.error("Error fetching pin details");
      setLoading(false);
    }
  }
 

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <PinContext.Provider value={{ pins, loading, singlePin, fetchPinById }}>
      {children}
    </PinContext.Provider>
  );
};

export const usePins = () => {
  return useContext(PinContext);
};
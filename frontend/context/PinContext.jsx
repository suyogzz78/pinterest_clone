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
      setPins(data);
    } catch (err) {
      toast.error("Error fetching pins");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <PinContext.Provider value={{ pins, loading }}>
      {children}
    </PinContext.Provider>
  );
};

export const usePins = () => {
  return useContext(PinContext);
};
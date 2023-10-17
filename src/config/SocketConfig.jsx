import { useEffect } from "react";
import { io } from "socket.io-client";

export const SocketConfig = () => {
  useEffect(() => {
    const socket = io("http://localhost:3005");

    // socket.on();
    return () => {
      socket.disconnect();
    };
  }, []);
  return null;
};

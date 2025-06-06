import { useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../utils/servicesData';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const token = localStorage.getItem('token');
  const sendMessage = async (message, file=null) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if(message) {
        formData.append("message", message);
      }
      if(file) {
        formData.append("file", file);

      }
      const res = await fetch(`${BACKEND_URL}/message/send/${selectedConversation._id}`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}`
         },
        body: formData,
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;

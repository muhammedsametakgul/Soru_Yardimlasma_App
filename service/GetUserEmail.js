import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const GetUserEmail = () => {
  const [initializing, setInitializing] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Email " + user.email)
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  
    return userEmail;
  
};

export default GetUserEmail;

import { createContext, useState, useEffect } from "react";
import { fetchMe } from "./api";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getMe() {
      try {
        // Check if the token is close to expiration and refresh if needed
        const currentTime = Math.floor(Date.now() / 1000);
        const tokenData = JSON.parse(atob(token.split(".")[1]));
        if (tokenData.exp - currentTime < 300) {
          // Token is about to expire within 5 minutes, refresh it
          const refreshResponse = await refreshToken(token);
          const newToken = refreshResponse.data.token;
          setToken(newToken);
          // You may also want to store the new token in local storage
        }
        const APIResponse = await fetchMe(token);
        setUser(APIResponse.data);
      } catch (error) {
        console.error("Token validation failed:", error);
        // Handle token validation errors here, e.g., clear invalid token
        setToken(null);
      }
    }

    if (token) {
      getMe();
    }
  }, [token]);

  const contextValue = {
    token,
    setToken,
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
//   useEffect(() => {
//     async function getMe() {

//       const APIResponse = await fetchMe(token);
//       setUser(APIResponse.data);
//     }
//     if (token) {
//       getMe();
//     }
//   }, [token]);
//   const contextValue = {
//     token,
//     setToken,
//     user,
//     setUser,
//   };
//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };
// export default AuthProvider;

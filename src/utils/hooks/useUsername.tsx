import { useEffect, useState } from "react";
import fetchUser from "../../services/User";

const useUsername = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function getUserData() {
      const userData = await fetchUser();

      if (userData) {
        setUsername(userData.display_name);
      }
    }

    getUserData();
  }, []);

  return username;
};

export default useUsername;

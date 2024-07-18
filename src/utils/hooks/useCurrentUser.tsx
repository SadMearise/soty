import { useEffect, useState } from "react";
import { fetchCurrentUserProfile } from "../../services";
import { CurrentUserProfile } from "../../models";

const useCurrentUser = () => {
  const [user, setUser] = useState<CurrentUserProfile>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      const userData = await fetchCurrentUserProfile();

      if (!userData) return;

      setUser(userData);
      setIsLoading(false);
    };

    getUserData();
  }, []);

  return { user, isLoading };
};

export default useCurrentUser;

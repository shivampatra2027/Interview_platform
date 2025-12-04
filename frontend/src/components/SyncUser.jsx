import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

function SyncUser() {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const sync = async () => {
      if (isSignedIn) {
        const token = await getToken();
        await fetch("http://localhost:5002/api/save-user", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    };
    sync();
  }, [isSignedIn, getToken]);

  return null; 
}

export default SyncUser;

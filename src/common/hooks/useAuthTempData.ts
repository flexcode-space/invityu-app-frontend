import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";

const useAuthTempData = () => {
  const [authTempData, setAuthTempData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const authTemp = Cookies.get("authTemp") ?? null;
    if (authTemp) {
      setAuthTempData(authTemp ? JSON.parse(authTemp) : null);
    } else {
      Router.push("/");
    }
    setLoading(false);
  }, []);

  return { authTempData, loading };
};

export default useAuthTempData;

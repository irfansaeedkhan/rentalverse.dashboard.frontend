"use client";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "@/stores/auth.store";

const UserProvider = () => {
  const { fetchUser } = useAuthStore(useShallow((state) => state.actions));

  useEffect(() => {
    fetchUser().catch((error) => {
      console.error(error);
    });
  }, [fetchUser]);
  return null;
};

export default UserProvider;

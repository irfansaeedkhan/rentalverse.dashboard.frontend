import React, { useState, createContext } from "react";

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextProps>({
  isOpen: false,
  setIsOpen: () => {},
});

export const useSidebarToggle = (): [boolean, (isOpen: boolean) => void] => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return [isOpen, toggleSidebar];
};

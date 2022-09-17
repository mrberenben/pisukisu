import { useLocation } from "react-router-dom";

const isActiveRoute = (path: string) => {
  const { pathname } = useLocation();

  return pathname === path || (pathname.startsWith(path) && path !== "/");
};

export default isActiveRoute;

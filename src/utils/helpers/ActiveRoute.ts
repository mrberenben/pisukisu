import { useLocation } from "react-router-dom";

const isActiveRoute = (path: string) => {
  const { pathname } = useLocation();
  
  return pathname === path || pathname.startsWith(path) && pathname !== "/" ? true : false
}

export default isActiveRoute;
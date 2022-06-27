import { Outlet } from "react-router-dom";
import styles from "static/styles/components/layout/AppLayout.module.css";

type Props = {
  isAuthenticated?: boolean | false;
}

const AppLayout = ({ isAuthenticated }: Props) => {
  return (
    <div className={styles.app_layout}>
      <Outlet />
    </div>
  );
};

export default AppLayout;

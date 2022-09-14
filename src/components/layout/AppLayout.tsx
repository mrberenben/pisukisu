import { Outlet } from "react-router-dom";
import styles from "static/styles/components/layout/AppLayout.module.css";

// components
import AppHeader from "components/layout/AppHeader";

import SerieModal from "components/serie/SerieModal";

type Props = {
  isAuthenticated?: boolean | false;
};

const AppLayout = ({ isAuthenticated }: Props) => {
  return (
    <div className={styles.app_layout}>
      <AppHeader />

      <main className={styles.app_main}>
        <Outlet />

        <SerieModal />
      </main>
    </div>
  );
};

export default AppLayout;

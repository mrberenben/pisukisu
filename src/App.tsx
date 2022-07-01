import styles from "static/styles/pages/index.module.css";

// context
import { AppProvider } from "context/AppContext";

// components
import Router from "./Router";

function App() {
  return (
    <AppProvider>
      <div className={styles.app}>
        <Router />
      </div>
    </AppProvider>
  );
}

export default App;

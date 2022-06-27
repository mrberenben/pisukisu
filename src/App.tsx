import styles from "static/styles/pages/index.module.css";
import Router from "./Router";

function App() {
  return (
    <div className={styles.app}>
      <Router />
    </div>
  );
}

export default App;

import styles from "./page.module.css";
import Histo from "@/components/Histo";

export default function Home() {
  return (
    <main className={styles.main}>
      <Histo />
    </main>
  );
}

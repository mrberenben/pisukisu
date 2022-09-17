import SerieThumbnail from "components/serie/SerieThumbnail";
import styles from "static/styles/components/layout/AppLayout.module.css";

type Props = {
  prefix?: string;
  genre: string;
  description?: string;
  data: Array<any>;
};

const GenreSection = ({ prefix, genre, description, data }: Props) => {
  return (
    <section className={styles.genre}>
      <header className={styles.genre_header}>
        <h4>
          {prefix && <span>{prefix}</span>}
          {genre}
        </h4>
        {description && <p>{description}</p>}
      </header>
      <main className={styles.genre_body}>
        {data.map(serie => (
          <SerieThumbnail key={serie.id} serie={serie} />
        ))}
      </main>
    </section>
  );
};

export default GenreSection;

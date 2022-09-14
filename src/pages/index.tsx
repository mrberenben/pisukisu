// components
import Container from "components/layout/Container";
import GenreSection from "components/layout/GenreSection";
import Banner from "components/pages/home/Banner";

// config
import { Genres, Series } from "utils/config/series.config";

const Index = () => {
  return (
    <Container>
      <Banner />

      {Genres.map(genre => (
        <GenreSection
          key={genre.id}
          genre={genre.name}
          prefix={genre.prefix}
          data={Series.filter(serie => serie.genres.includes(genre.name))}
        />
      ))}
    </Container>
  );
};

export default Index;

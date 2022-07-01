// components
import Container from "components/layout/Container";
import GenreSection from "components/layout/GenreSection";
import Banner from "components/pages/home/Banner";
import SerieModal from "components/serie/SerieModal";

// config
import { Series } from "utils/config/series.config";

const Index = () => {
  return (
    <Container>
      <Banner />

      <GenreSection
        prefix="💥"
        genre="Action"
        description="Recommended for you"
        data={Series.action}
      />
      <GenreSection
        prefix="😵"
        genre="Psychological"
        description="Depending on the genres you watch"
        data={Series.psychological}
      />
      <GenreSection
        prefix="🏹"
        genre="Historical"
        description="Based on user ratings"
        data={Series.historical}
      />
      <GenreSection
        genre="Mecha"
        description="For watching Neon Genesis: Evangelion"
        data={Series.mecha}
      />
      <GenreSection
        prefix="👻"
        genre="Supernatural"
        description="Depending on the genres you watch"
        data={Series.supernatural}
      />

      <SerieModal />
    </Container>
  );
};

export default Index;

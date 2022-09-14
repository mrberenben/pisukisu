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

      <SerieModal />
    </Container>
  );
};

export default Index;

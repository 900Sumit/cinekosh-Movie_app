import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => {
  return (
    <div className="w-full">
      <Header />

      <section className="mt-8">
        <MoviesContainerPage />
      </section>
    </div>
  );
};

export default Home;

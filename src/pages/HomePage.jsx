import PageLayout from "../PageLayout";
import Home from "../components/Home";
import "../css/Home.css";

function HomePage() {
  return <PageLayout children={<Home />} active="Home" />;
}

export default HomePage;

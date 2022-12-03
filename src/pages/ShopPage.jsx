import PageLayout from "../PageLayout";
import Shop from "../components/Shop";
import "../css/Shop.css";

function ShopPage() {
  return <PageLayout children={<Shop />} active="Shop" />;
}

export default ShopPage;

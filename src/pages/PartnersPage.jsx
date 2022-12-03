import PageLayout from "../PageLayout";
import Partners from "../components/Partners";
import "../css/Partners.css";

function PartnersPage() {
  return <PageLayout children={<Partners />} active="Profile" />;
}
//teste

export default PartnersPage;

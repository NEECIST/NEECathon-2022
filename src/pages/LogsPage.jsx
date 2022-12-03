import PageLayout from "../PageLayout";
import StoreLogs from "../components/StoreLogs";

function LogsPage() {
  return <PageLayout children={<StoreLogs />} active="StoreLogs" />;
}

export default LogsPage;

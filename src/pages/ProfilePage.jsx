import PageLayout from "../PageLayout";
import Profile from "../components/Profile";
import "../css/Profile.css";

function ProfilePage() {
  return <PageLayout children={<Profile />} active="Profile" />;
}
//teste

export default ProfilePage;

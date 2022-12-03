import PageLayoutPublic from "../PageLayoutPublic"
import Login from "../components/Login";
import "../css/Login.css";

function LoginPage() {
  return (
    <PageLayoutPublic children={<Login />} />
  );
}

export default LoginPage;
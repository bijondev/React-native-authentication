import { useState, useContext } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const authCTX = useContext(AuthContext);

  async function loginHandeler({ email, password }) {
    setIsAuthenticate(true);
    try {
      const token = await login(email, password);
      authCTX.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentacition fail!",
        "Could not login in, Please check your user name and password and try leter!"
      );
      setIsAuthenticate(false);
    }
  }

  if (isAuthenticate) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandeler} />;
}

export default LoginScreen;

import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const authCTX = useContext(AuthContext);

  async function signUphandeler({ email, password }) {
    setIsAuthenticate(true);
    try {
      const token = await createUser(email, password);
      authCTX.authenticate(token);
    } catch (error) {
      Alert.alert("Signup fail!", "Please try leter...");
    }

    setIsAuthenticate(false);
  }

  if (isAuthenticate) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signUphandeler} />;
}

export default SignupScreen;

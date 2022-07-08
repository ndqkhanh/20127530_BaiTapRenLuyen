import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ScreensSignInMain from "~screens/SignIn/Main";
import ScreensSignUpMain from "~screens/SignUp/Main";

const stack = createNativeStackNavigator();

const SignupAndLogin = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="login_screen"
        component={ScreensSignInMain}
        options={{ header: () => null }}
      />
      <stack.Screen
        name="signup_screen"
        component={ScreensSignUpMain}
        options={{ header: () => null }}
      />
    </stack.Navigator>
  );
};
export default SignupAndLogin;

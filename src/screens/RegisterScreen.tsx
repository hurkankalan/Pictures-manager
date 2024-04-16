import {StyleSheet, View, Text} from "react-native";
import {ReactElement} from "react";
import {useController, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store";
import {registerUser} from "../store/slices/authSlice";
import {RegisterUser} from "../types/User";
import {FormInputStyle} from "../components/inputs/PrimaryInput/style";
import {PrimaryTitle} from "../components/texts/PrimaryTitle/style";
import {ErrorText} from "../components/texts/ErrorText/style";
import PrimaryButton from "../components/buttons/PrimaryButton/index";
import LogoSvg from "../components/svg/LogoSvg";
import ServerStatus from "../components/texts/ServerStatus";

export const Input = ({control, name, ...props}: any) => {
  const {field} = useController({
    control,
    defaultValue: "",
    name,
  });

  return (
    <FormInputStyle
      value={field.value}
      onChangeText={field.onChange}
      control={control}
      name={name}
      {...props}
      required
    />
  );
};

export default function RegisterScreen({
                                         navigation,
                                       }: {
  navigation: any;
}): ReactElement {
  const {
    control,
    setError,
    formState: {errors},
    handleSubmit,
  } = useForm<RegisterUser>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const dispatch: AppDispatch = useDispatch();

  function submitForm(data: RegisterUser) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

    if (!data.email) {
      setError("email", {message: "Email is required"});
      console.log({errors});
    }

    if (!data.password) {
      setError("password", {message: "Password is required"});
    }

    if (!data.confirmPassword) {
      setError("confirmPassword", {message: "Confirm your password again"});
    }

    if (!emailRegex.test(data.email)) {
      setError("email", {message: "Invalid email format"});
    }

    if (data.password.length < 8) {
      setError("password", {
        message: "Password must be at least 8 characters",
      });
    }

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {message: "Passwords must match"});
    }

    if (Object.keys(errors).length === 0) {
      dispatch(registerUser(data));
      navigation.navigate("Login");
    }
  }

  return (
    <View style={styles.container}>
      <LogoSvg/>
      <PrimaryTitle>Sign up</PrimaryTitle>
      <View>
        <Input control={control} name="email" placeholder="Enter your email"/>
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        <Input
          control={control}
          name="password"
          placeholder="Enter your password"
          secureTextEntry={true}
        />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        <Input
          control={control}
          name="confirmPassword"
          placeholder="Enter your password again"
          secureTextEntry={true}
        />
        {errors.confirmPassword && (
          <ErrorText>{errors.confirmPassword.message}</ErrorText>
        )}
        <PrimaryButton onPress={handleSubmit(submitForm)} text={"Submit"}/>
        <Text style={styles.centeredText}>Already have an account ?</Text>
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Log in here
        </Text>
      </View>
      <ServerStatus/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    textAlign: "center",
    color: "blue",
  },
  centeredText: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

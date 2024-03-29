import * as yup from "yup";
import { StyleSheet, View, Text } from "react-native";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { LoginUser } from "../types/User";
import { PrimaryTitle } from "../components/texts/PrimaryTitle/style";
import PrimaryButton from "../components/buttons/PrimaryButton/index";
import LogoSvg from "../components/svg/LogoSvg";
import { Input } from "./RegisterScreen";
import { loginUser } from "../store/slices/authSlice";
import { AppDispatch } from "../store/store";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function LoginScreen({
  navigation,
}: {
  navigation: any;
}): ReactElement {
  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginUser>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const dispatch: AppDispatch = useDispatch();

  function submitForm(data: LoginUser) {
    dispatch(loginUser(data));
  }

  return (
    <View style={styles.container}>
      <LogoSvg />
      <PrimaryTitle>Log in</PrimaryTitle>
      <View>
        <Input control={control} name="email" placeholder="Enter your email" />
        {errors.email && <Text>{errors.email.message}</Text>}
        <Input
          control={control}
          name="password"
          placeholder="Enter your password"
        />
        {errors.password && <Text>{errors.password.message}</Text>}
        <PrimaryButton onPress={handleSubmit(submitForm)} text={"Submit"} />
        <Text>Don't have an account yet ?</Text>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Register here
        </Text>
      </View>
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
});

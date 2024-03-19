import * as yup from "yup";
import { StyleSheet, View, Text } from "react-native";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { LoginUser } from "../types/User";
import { FormInputStyle } from "../components/inputs/PrimaryInput/style";
import { PrimaryTitle } from "../components/texts/PrimaryTitle/style";
import PrimaryButton from "../components/buttons/PrimaryButton/index";
import LogoSvg from "../components/svg/LogoSvg";

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
    register,
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

  const dispatch = useDispatch();

  function submitForm(data: LoginUser) {
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <LogoSvg />
      <PrimaryTitle>Log in</PrimaryTitle>
      <View>
        <FormInputStyle
          placeholder="Enter your email"
          placeholderTextColor="grey"
        />
        <FormInputStyle
          placeholder="Enter your password"
          placeholderTextColor="grey"
        />
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

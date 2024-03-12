import * as yup from "yup";
import { StyleSheet, View, Text } from "react-native";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/slices/authSlice";
import { RootState } from "../store/store";
import { RegisterUser } from "../types/User";
import { FormInputStyle } from "../components/inputs/PrimaryInput/style";
import { PrimaryTitle } from "../components/texts/PrimaryTitle/style";
import PrimaryButton from "../components/buttons/PrimaryButton/index";
import {
  ButtonContainerStyle,
  ButtonTextStyle,
} from "../components/buttons/PrimaryButton/style";
import LogoSvg from "../components/svg/LogoSvg";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

export default function RegisterScreen({
  navigation,
}: {
  navigation: any;
}): ReactElement {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterUser>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state: RootState) => state.auth
  );

  function submitForm(data: RegisterUser) {
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <LogoSvg />
      <PrimaryTitle>Sign up</PrimaryTitle>
      <View>
        <FormInputStyle
          placeholder="Enter your email"
          placeholderTextColor="grey"
        />
        <FormInputStyle
          placeholder="Enter your password"
          placeholderTextColor="grey"
        />
        <FormInputStyle
          placeholder="Confirm your password"
          placeholderTextColor="grey"
        />
        <PrimaryButton onPress={handleSubmit(submitForm)} text={"Submit"} />
        <Text>Already have an account ?</Text>
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Log in here
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
    gap: 50,
  },
  link: {
    textAlign: "center",
    color: "blue",
  },
});

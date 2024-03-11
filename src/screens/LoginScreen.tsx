import * as yup from "yup";
import { View } from "react-native";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/slices/authSlice";
import { RootState } from "../store/store";
import { User } from "../types/User";
import { FormInputStyle } from "../components/inputs/PrimaryInput/style";
import { PrimaryTitle } from "../components/texts/PrimaryTitle/style";
import PrimaryButton from "../components/buttons/PrimaryButton/index";
import {
  ButtonContainerStyle,
  ButtonTextStyle,
} from "../components/buttons/PrimaryButton/style";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function LoginScreen(): ReactElement {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<User>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state: RootState) => state.auth
  );

  function submitForm(data: User) {
    console.log(data);
  }

  return (
    <View>
      <FormInputStyle />
      <FormInputStyle />
      <PrimaryButton onPress={handleSubmit(submitForm)} text={"Submit"} />
    </View>
  );
}

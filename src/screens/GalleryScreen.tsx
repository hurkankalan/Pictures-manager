import { Text } from "react-native";
import PrimaryButton from "../components/buttons/PrimaryButton"
import {FormInputStyle} from "../components/inputs/PrimaryInput/style";
import {PrimaryTitle} from "../components/texts/PrimaryTitle/style";

export default function GalleryScreen() {
  return (
      <>
        <PrimaryTitle> Title </PrimaryTitle>
        <FormInputStyle placeholder={'email'} />
        <PrimaryButton onPress={() => console.log('test')} text={'Log in'} />
      </>
  )
}

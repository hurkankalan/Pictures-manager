import {ButtonContainerStyle, ButtonTextStyle} from './style';
import React from "react";

interface Props {
    onPress: () => void,
    text: string,
}

const PrimaryButton: React.FC<Props> = ({onPress, text}) => {

    return (
        <ButtonContainerStyle onPress={onPress}>
            <ButtonTextStyle>
                { text }
            </ButtonTextStyle>
        </ButtonContainerStyle>
    );
};

export default PrimaryButton;
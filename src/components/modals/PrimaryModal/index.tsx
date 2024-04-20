import React from "react";
import {Modal, TouchableWithoutFeedback, View} from "react-native";
import {useDispatch} from "react-redux";
import {setAddModalVisible} from "../../../store/slices/albumSlice";
import {ModalContainerStyle} from "../AddAlbum/style";
import {PrimaryTitle} from "../../texts/PrimaryTitle/style";
import {AlbumImageStyle} from "../../buttons/Album/style";
import {FormInputStyle} from "../../inputs/PrimaryInput/style";
import {ManageError} from "../../texts/PrimaryText";
import PrimaryButton from "../../buttons/PrimaryButton";

interface PrimaryModalProps {
    isModalVisible: boolean;
    children?: React.ReactNode;
    error?: boolean;
    errorMessage?: string;
    modalTitle: string;
    inputPlaceholder: string;
    buttonText: string;
    buttonAction: any;
    inputAction: (text: string) => void;
    closeModalAction?: () => void;
    imageSource?: any;
}

export const PrimaryModal: React.FC<PrimaryModalProps> = (
    {
        isModalVisible,
        modalTitle,
        buttonText,
        buttonAction,
        inputPlaceholder,
        imageSource,
        error,
        errorMessage,
        inputAction,
    }: PrimaryModalProps
) => {
    const dispatch = useDispatch();

    const closeModalAction = () => {
        dispatch(setAddModalVisible(false));
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
        >
            <TouchableWithoutFeedback onPress={() => closeModalAction()}>
                <View style={{flex: 1}}>
                    <TouchableWithoutFeedback
                        onPress={
                            (event) => event.stopPropagation()
                        }
                    >
                        <ModalContainerStyle>
                            <PrimaryTitle>{modalTitle}</PrimaryTitle>
                            {imageSource &&
                                (
                                    <AlbumImageStyle
                                        source={imageSource}
                                    />
                                )
                            }
                            <FormInputStyle
                                onChangeText={name => inputAction(name)}
                                placeholder={inputPlaceholder}
                            />
                            <ManageError
                                error={error}
                                errorMessage={errorMessage}
                            />
                            <PrimaryButton
                                onPress={() => buttonAction()}
                                text={buttonText}
                            />
                        </ModalContainerStyle>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
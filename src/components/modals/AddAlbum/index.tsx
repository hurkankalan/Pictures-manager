import React, {useState} from "react";
import {Modal, TouchableWithoutFeedback, View} from 'react-native';
import {ModalContainerStyle, ViewStyle} from "./style";
import {FormInputStyle} from "../../inputs/PrimaryInput/style";
import PrimaryButton from "../../buttons/PrimaryButton";
import {AlbumImageStyle} from "../../buttons/Album/style";
import {PrimaryTitle} from "../../texts/PrimaryTitle/style";
import {ManageError} from "../../texts/PrimaryText";

interface ModalDisconnectProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

function AddAlbumModal({modalVisible, setModalVisible}: ModalDisconnectProps) {
    const [albumName, setAlbumName] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddAlbum = () => {
        if (albumName === '') {
            setError(true);
            setErrorMessage('Album name is required');
            return;
        }
        // @todo call api to add album
        console.log('Add Album');
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => closeModal()}
        >
            <TouchableWithoutFeedback onPress={() => closeModal()}>
                <View style={{flex: 1}}>
                    <TouchableWithoutFeedback onPress={(event) => event.stopPropagation()}>
                        <ModalContainerStyle>
                            <PrimaryTitle>Add Album</PrimaryTitle>
                            <AlbumImageStyle
                                source={require("../../../../assets/images/album_icon.png")}
                            />
                            <FormInputStyle
                                onChangeText={name => setAlbumName(name)}
                                placeholder={"Name"}
                            />
                            <ManageError
                                error={error}
                                errorMessage={errorMessage}
                            />
                            <PrimaryButton
                                onPress={() => handleAddAlbum()}
                                text={"Create"}
                            />
                        </ModalContainerStyle>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default AddAlbumModal;
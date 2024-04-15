import React, {useState} from "react";
import {Modal, TouchableWithoutFeedback, View} from 'react-native';
import {ModalContainerStyle, ViewStyle} from "./style";
import {FormInputStyle} from "../../inputs/PrimaryInput/style";
import PrimaryButton from "../../buttons/PrimaryButton";
import {AlbumImageStyle} from "../../buttons/Album/style";
import {PrimaryTitle} from "../../texts/PrimaryTitle/style";
import {ManageError} from "../../texts/PrimaryText";
import {useDispatch, useSelector} from "react-redux";
import {setAddModalVisible} from "../../../store/slices/albumSlice";
import {createAlbum} from "../../../api/album.api";

function AddAlbumModal() {
    const dispatch = useDispatch();
    const isModalVisible = useSelector((state: any) => state.album.isAddModalVisible);
    const [albumName, setAlbumName] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddAlbum = async () => {
        if (albumName === '') {
            setError(true);
            setErrorMessage('Album name is required');
            return;
        }
        try {
            await createAlbum(albumName);
            dispatch(setAddModalVisible(false));
        } catch (error) {
            console.log(error);
        }
    };

    const closeModal = () => {
        dispatch(setAddModalVisible(false));
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
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
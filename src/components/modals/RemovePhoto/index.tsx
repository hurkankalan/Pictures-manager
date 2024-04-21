import React from 'react';
import {Modal, TouchableWithoutFeedback, View} from "react-native";
import {ModalContainerStyle} from "../AddAlbum/style";
import {PrimaryTitle} from "../../texts/PrimaryTitle/style";
import {AlbumImageStyle} from "../../buttons/Album/style";
import PrimaryButton from "../../buttons/PrimaryButton";
import {useDispatch, useSelector} from "react-redux";
import {clearSelectAlbum, deleteAlbumAsync, setRemoveModalVisible} from "../../../store/slices/albumSlice";
import {PrimaryTextStyle} from "../../texts/PrimaryText/style";
import {AppDispatch} from "../../../store/store";
import {clearSelectPhoto, deletePhotoAsync} from "../../../store/slices/photoSlice";

export const RemovePhoto: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const modalVisible = useSelector((state: any) => state.album.isRemoveModalVisible);
    const selectedPhoto = useSelector((state: any) => state.photo.selectedPhoto);

    const handleRemovePhoto = async () => {
        dispatch(deletePhotoAsync(selectedPhoto));
        dispatch(setRemoveModalVisible(false));
        dispatch(clearSelectPhoto());
    };

    const closeModal = () => {
        dispatch(setRemoveModalVisible(false));
    }

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
                            <PrimaryTitle>Delete Photo</PrimaryTitle>
                            <PrimaryTextStyle textColor={'red'}>
                                Are you sure you want to delete this photo?
                            </PrimaryTextStyle>
                            <AlbumImageStyle
                                source={require("../../../../assets/images/album_icon.png")}
                            />
                            <PrimaryButton
                                onPress={() => handleRemovePhoto()}
                                text={'Yes'}
                            />
                            <PrimaryButton
                                onPress={() => closeModal()}
                                text={'No'}
                            />
                        </ModalContainerStyle>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default RemovePhoto;
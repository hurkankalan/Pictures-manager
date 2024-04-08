import React from 'react';
import {Modal, TouchableWithoutFeedback, View} from "react-native";
import {ModalContainerStyle} from "../AddAlbum/style";
import {PrimaryTitle} from "../../texts/PrimaryTitle/style";
import {AlbumImageStyle} from "../../buttons/Album/style";
import {PrimaryText} from "../../texts/PrimaryText";
import PrimaryButton from "../../buttons/PrimaryButton";
import {useDispatch, useSelector} from "react-redux";
import {setRemoveModalVisible, setShareModalVisible, setUpdateModalVisible} from "../../../store/slices/albumSlice";
import {PrimaryTextStyle} from "../../texts/PrimaryText/style";

export const RemoveAlbum: React.FC = () => {
    const dispatch = useDispatch();
    const modalVisible = useSelector((state: any) => state.album.isRemoveModalVisible);

    const handleRemoveAlbum = () => {
        // @todo call api to add album
        console.log('Remove Album');
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
                            <PrimaryTitle>Delete Album</PrimaryTitle>
                            <PrimaryTextStyle textColor={'red'}>
                                Are you sure you want to delete this album?
                            </PrimaryTextStyle>
                            <AlbumImageStyle
                                source={require("../../../../assets/images/album_icon.png")}
                            />
                            <PrimaryButton
                                onPress={() => handleRemoveAlbum()}
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

export default RemoveAlbum;
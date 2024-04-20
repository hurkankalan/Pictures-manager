import React from "react";
import { Text } from 'react-native';
import {AddAlbumContainerStyle, AddAlbumImageStyle, OptionsContainerStyle} from "./style";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import UpdateAlbum from "../../modals/UpdateAlbum";
import AddAlbumModal from "../../modals/AddAlbum";
import {useDispatch, useSelector} from "react-redux";
import {
    setAddModalVisible,
    setRemoveModalVisible,
    setShareModalVisible,
    setUpdateModalVisible
} from "../../../store/slices/albumSlice";
import ShareAlbum from "../../modals/ShareAlbum";
import RemoveAlbum from "../../modals/RemoveAlbum";

interface AddAlbumProps {
    isAlbumSelected: boolean;
}

export const AddAlbum: React.FC<AddAlbumProps> = ({ isAlbumSelected }: AddAlbumProps) => {
    const dispatch = useDispatch();
    const isAddAlbumModalVisible = useSelector((state: any) => state.album.isAddModalVisible);
    const isUpdateModalVisible = useSelector((state: any) => state.album.isUpdateModalVisible);
    const isShareModalVisible = useSelector((state: any) => state.album.isShareModalVisible);
    const isRemoveModalVisible = useSelector((state: any) => state.album.isRemoveModalVisible);

    const customStyles = {
        optionsContainer: {
            marginTop: -25,
            zIndex: 1000,
        },
    };

    const displayUpdateAlbumModal = () => {
        return (
            <UpdateAlbum />
        );
    }

    const displayAddAlbumModal = () => {
        return (
            <AddAlbumModal />
        );
    }

    const displayShareAlbumModal = () => {
        return (
            <ShareAlbum />
        );
    }

    const displayRemoveAlbumModal = () => {
        return (
            <RemoveAlbum />
        );
    }

    return (
        <>
            <OptionsContainerStyle selected={isAlbumSelected}>
                {isAlbumSelected &&
                    <>
                        <Menu>
                            <MenuTrigger>
                                <AddAlbumImageStyle source={require("../../../../assets/images/options.png")} />
                            </MenuTrigger>
                            <MenuOptions customStyles={customStyles}>
                                <MenuOption onSelect={() => dispatch(setUpdateModalVisible(true))}>
                                    <Text>Update</Text>
                                </MenuOption>
                                <MenuOption onSelect={() => dispatch(setShareModalVisible(true))}>
                                    <Text>Share</Text>
                                </MenuOption>
                                <MenuOption onSelect={() => dispatch(setRemoveModalVisible(true))}>
                                    <Text>Remove</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </>
                }
                <AddAlbumContainerStyle onPress={() => dispatch(setAddModalVisible(true))}>
                    <AddAlbumImageStyle source={require("../../../../assets/images/add.png")} />
                </AddAlbumContainerStyle>
            </OptionsContainerStyle>
            {
                isAddAlbumModalVisible && displayAddAlbumModal()
            }
            {
                isUpdateModalVisible && displayUpdateAlbumModal()
            }
            {
                isShareModalVisible && displayShareAlbumModal()
            }
            {
                isRemoveModalVisible && displayRemoveAlbumModal()
            }
        </>
    );
}
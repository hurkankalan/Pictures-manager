import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import {AddAlbumImageStyle, OptionsContainerStyle} from "../AddAlbum/style";
import React from "react";
import {AddTag} from "../../modals/AddTag";
import {useDispatch, useSelector} from "react-redux";
import {setAddModalVisible, setRemoveModalVisible} from "../../../store/slices/albumSlice";
import RemovePhoto from "../../modals/RemovePhoto";

interface ImageOptionsProps {
    isImageSelected: boolean;
}

export const ImageOptions: React.FC<ImageOptionsProps> = ({ isImageSelected }: ImageOptionsProps) => {
    const dispatch = useDispatch();
    const isAddModalVisible = useSelector((state: any) => state.album.isAddModalVisible);
    const isRemoveModalVisible = useSelector((state: any) => state.album.isRemoveModalVisible);

    const customStyles = {
        optionsContainer: {
            marginTop: -25,
            zIndex: 1000,
        },
    };

    console.log('isImageSelected : ' + isImageSelected);

    return (
        <>
            <OptionsContainerStyle selected={isImageSelected} style={{height: 200}}>
                {isImageSelected &&
                    <>
                        <Menu>
                            <MenuTrigger>
                                <AddAlbumImageStyle
                                    source={require("../../../../assets/images/options.png")}
                                />
                            </MenuTrigger>
                            <MenuOptions customStyles={customStyles}>
                                <MenuOption
                                    onSelect={() => dispatch(setAddModalVisible(!isAddModalVisible))}
                                    text='Add Tag'
                                />
                                <MenuOption
                                    onSelect={() => dispatch(setRemoveModalVisible(!isRemoveModalVisible))}
                                    text='Delete'
                                />
                            </MenuOptions>
                        </Menu>
                    </>
                }
            </OptionsContainerStyle>
            {
                isAddModalVisible && <AddTag />
            }
            {
                isRemoveModalVisible && <RemovePhoto />
            }
        </>
    );
};
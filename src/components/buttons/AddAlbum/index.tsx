import React from "react";
import { Text } from 'react-native';
import {AddAlbumContainerStyle, AddAlbumImageStyle, OptionsContainerStyle} from "./style";
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

interface AddAlbumProps {
    onPress: () => void;
    isAlbumSelected: boolean;
}

export const AddAlbum: React.FC<AddAlbumProps> = ({ onPress, isAlbumSelected }: AddAlbumProps) => {
    const customStyles = {
        optionsContainer: {
            marginTop: -25,
            zIndex: 1000,
        },
    };

    return (
        <MenuProvider>
            <OptionsContainerStyle selected={isAlbumSelected}>
                {isAlbumSelected &&
                    <>
                        <Menu>
                            <MenuTrigger>
                                <AddAlbumImageStyle source={require("../../../../assets/images/options.png")} />
                            </MenuTrigger>
                            <MenuOptions customStyles={customStyles}>
                                <MenuOption onSelect={() => console.log("test")}>
                                    <Text>Update</Text>
                                </MenuOption>
                                <MenuOption onSelect={() => console.log("test")}>
                                    <Text>Share</Text>
                                </MenuOption>
                                <MenuOption onSelect={() => console.log("test")}>
                                    <Text>Remove</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </>
                }
                <AddAlbumContainerStyle onPress={onPress}>
                    <AddAlbumImageStyle source={require("../../../../assets/images/add.png")} />
                </AddAlbumContainerStyle>
            </OptionsContainerStyle>
        </MenuProvider>
    );
}
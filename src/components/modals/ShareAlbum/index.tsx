import React, {useEffect, useState} from 'react';
import {
    Button,
    FlatList,
    ListRenderItemInfo,
    Modal,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {ModalContainerStyle} from "../AddAlbum/style";
import {PrimaryTitle} from "../../texts/PrimaryTitle/style";
import {AlbumImageStyle} from "../../buttons/Album/style";
import {FormInputStyle} from "../../inputs/PrimaryInput/style";
import {ManageError} from "../../texts/PrimaryText";
import PrimaryButton from "../../buttons/PrimaryButton";
import {useDispatch, useSelector} from "react-redux";
import {
    setRemoveModalVisible,
    setShareModalVisible,
    shareAlbumAsync,
} from "../../../store/slices/albumSlice";
import {AppDispatch, RootState} from "../../../store/store";
interface Shared{
    email : string
}
interface Album {
    id: number;
    name: string;
    shared_to?: Shared[];
}

export const ShareAlbum: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const modalVisible = useSelector((state: any) => state.album.isShareModalVisible);
    const selectedAlbums = useSelector((state: any) => state.album.selectedAlbum);
    const albumList = useSelector((state: RootState) => state.album.albumList as Album[]);



    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [users, setUsers] = useState<Array<{ email: string }>>([]);
    console.log(('My albumList:'+JSON.stringify((albumList))));
    console.log(('My selected Album:'+JSON.stringify((selectedAlbums))));
    useEffect(() => {
        const selectedAlbumDetails = albumList.filter(album => selectedAlbums.includes(album.id));
        const sharedUsers = selectedAlbumDetails.reduce((acc: Shared[], curr: Album) => {
            const sharedTo = curr.shared_to || [];
            return acc.concat(sharedTo);
        }, []);
        setUsers(sharedUsers);
    }, [selectedAlbums, albumList]);
    const handleDelete = (email: string) => {
        setUsers(users.filter(user => user.email !== email));
        if (typeof selectedAlbums[0] === 'number') {  // Check if it's a single number
            dispatch(shareAlbumAsync({ emailDel: email, albumId: selectedAlbums }));
            setUsers(users.filter(user => user.email !== email));
        } else {
            console.error('selectedAlbums is not a number:', selectedAlbums);
        }
    };


    const handleShareAlbum = () => {
        if (email === '') {
            setError(true);
            setErrorMessage('Email is required');
            return;
        }

        // @todo call api to add album
        let sharedEmail : Shared= {email};
        // @ts-ignore
        dispatch(shareAlbumAsync(sharedEmail))
        dispatch(setRemoveModalVisible(false));
    };
    const closeModal = () => {
        dispatch(setShareModalVisible(false));
    }

    const renderItem = ({ item }: ListRenderItemInfo<Shared>) => (
        <View style={styles.row}>
            <Text style={styles.email}>{item.email}</Text>
            <Button title="Delete" onPress={() => handleDelete(item.email)} />
        </View>
    );

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
                            <PrimaryTitle>Share Album</PrimaryTitle>
                            <AlbumImageStyle
                                source={require("../../../../assets/images/album_icon.png")}
                            />
                            <FlatList
                            data={users}
                            renderItem={renderItem}
                            keyExtractor={item => item.email}
                            />
                            <FormInputStyle
                                onChangeText={value => setEmail(value)}
                                placeholder={"Email to share with"}
                            />
                            <ManageError
                                error={error}
                                errorMessage={errorMessage}
                            />
                            <PrimaryButton
                                onPress={() => handleShareAlbum()}
                                text={'Share'}
                            />
                        </ModalContainerStyle>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width:'100%'
    },
    email: {
        fontSize: 18
    }
});
export default ShareAlbum;
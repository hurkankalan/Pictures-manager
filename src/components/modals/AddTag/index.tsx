import {PrimaryModal} from "../PrimaryModal";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAddModalVisible} from "../../../store/slices/albumSlice";
import {updatePhotoAsync} from "../../../store/slices/photoSlice";

export const AddTag = () => {
    const dispatch = useDispatch();
    const isAddModalVisible = useSelector((state: any) => state.album.isAddModalVisible);
    const selectedPhoto = useSelector((state: any) => state.photo.selectedPhoto);
    const [tag, setTag] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    console.log('selected photo : ' + selectedPhoto);
    const handleAddTag = () => {
        if (tag === '') {
            setError(true);
            setErrorMessage('Tag is required');
            return;
        }

        // @ts-ignore
        dispatch(updatePhotoAsync({photoId: selectedPhoto, payload: {addLabels: [tag]}}));
        dispatch(setAddModalVisible(false));
    }

    return (
        <PrimaryModal
            isModalVisible={isAddModalVisible}
            modalTitle={'Add Tag'}
            inputPlaceholder={'You can add a tag here'}
            buttonText={'Add'}
            buttonAction={handleAddTag}
            inputAction={setTag}
            error={error}
            errorMessage={errorMessage}
        />
    )
}
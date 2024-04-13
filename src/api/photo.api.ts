import {axiosInstance} from "./index.api";
import * as FileSystem from 'expo-file-system';

export interface PhotoResponse {
    id: number;
    name: string;
    ownerId: number;
    album: {
        id: number;
        name: string;
    };
    labels: string[];
    createdAt: Date;
}

export interface PhotoListingResponse {
    photos: PhotoResponse[];
}

export const listPhoto = async (includeShared: boolean | null = null, search: string | null = null) => {
    const url = "/photos"
    + (includeShared || search) ? "?" : ''
    + includeShared ? 'include_shared=true&' : ''
    + search ? `search=${search}` : '';

    const response = await axiosInstance.get<PhotoListingResponse>(url);

    return response.data;
};

export const listPhotosByAlbumId = async (albumId: number) => {
    const response = await axiosInstance.get<PhotoListingResponse>(`/photos/albums/${albumId}`);

    return response.data;
};

export const listPhotosByLabelName = async (labelName: string) => {
    const response = await axiosInstance.get<PhotoListingResponse>(`/photos/labels/${labelName}`);

    return response.data;
};

export const getPhotoFile = async (photoId: number, fileName: string) => {
    const apiUrl = axiosInstance.defaults.baseURL;
    const bearer = axiosInstance.defaults.headers.common['Authorization'];

    return FileSystem.downloadAsync(
        `${apiUrl}/photos/file/${photoId}`,
        `${FileSystem.documentDirectory}/${fileName}`,
        {
            headers: {
                'Authorization': bearer?.toString() || ''
            }
        }
    );
};

const uploadFile = async (url: string, fileUri: string, body: any) => {
    const api = axiosInstance.defaults.baseURL;
    const bearer = axiosInstance.defaults.headers.common['Authorization'];

    const response = await FileSystem.uploadAsync(api + url, fileUri, {
        fieldName: 'file',
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        parameters: body,
        headers: {
            'Authorization': bearer?.toString() || ''
        }
    })
        .then(r => JSON.parse(r.body))
        .catch(console.error);

    if (response.success === false) {
        alert(response.reason);
    }
}

export const createPhoto = async (imageUri: string, labels: string[] | null = null) => {
    return uploadFile('/photos', imageUri, labels && {'labels': JSON.stringify(labels)});
};

export const createPhotoInAlbum = async (albumId: number, imageUri: string, labels: string[] | null = null) => {
    return uploadFile(`/photos/albums/${albumId}`, imageUri, labels && {'labels': JSON.stringify(labels)});
};

export interface PhotoUpdatePayload {
    name?: string,
    addLabels?: string[],
    removeLabels?: string[],
    albumId?: number,
}

export const updatePhoto = async (photoId: number, payload: PhotoUpdatePayload) => {
    const response = await axiosInstance.put<PhotoResponse>(`/photos/${photoId}`, payload);

    return response.data;
};

export const deletePhoto = async (photoId: number) => {
    const response = await axiosInstance.delete(`/photos/${photoId}`);

    return response.data;
};

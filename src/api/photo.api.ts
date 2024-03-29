import axiosInstance, {API_URL, axiosFiles} from "./index.api";

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

export const listPhoto = async (includeShared: boolean | null, search: string | null) => {
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

export const getPhotoFile = async (photoId: number) => {
    const response = await fetch(`${API_URL}/api/photos/file/${photoId}`)
    const blob = await response.blob();
    return URL.createObjectURL(blob);
};

const buildFormData = async (imageUri: string, labels: string[] | null) => {
    // à vérifier que les headers sont bons et que ça enregistre bien la photo sur le serveur...

    const blob = await fetch(imageUri)
        .then(response => response.blob());

    const filename = imageUri.split('/').pop() as string;
    //const extension = /\.(\w+)$/.exec(filename);
    //const type = extension ? `image/${extension[1]}` : `image`;

    const formData = new FormData();
    formData.append('file', blob, filename);
    formData.append('labels', JSON.stringify(labels))

    return formData;
}

export const createPhoto = async (imageUri: string, labels: string[] | null = null) => {
        const response = await axiosFiles.post('/photos',
            await buildFormData(imageUri, labels)
        );

        return response.data;
    }
;

export const createPhotoInAlbum = async (albumId: number, imageUri: string, labels: string[] | null = null) => {
    const response = await axiosFiles.post(`/photos/albums/${albumId}`,
        await buildFormData(imageUri, labels)
    );

    return response.data;
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

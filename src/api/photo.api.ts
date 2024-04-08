import {API_URL, axiosFiles, axiosInstance} from "./index.api";

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

export const getPhotoFile = async (photoId: number) => {
    const response = await fetch(`${API_URL}/api/photos/file/${photoId}`)
    const blob = await response.blob();
    return URL.createObjectURL(blob);
};

const fileFromPath = async (path:string)=>{
    const file = await fetch(path);
    const blob = await file.blob();

    const filename = path.split('/').pop() as string;

    const extension = /\.(\w+)$/.exec(filename);
    const type = extension ? `image/${extension[1]}` : `image`;

    return new File([blob], filename, {type});
}

const buildFormData = async (imageUri: string, labels: string[] | null) => {
    const formData = new FormData();

    formData.append('file', await fileFromPath(imageUri));

    if (labels !== null) {
        formData.append('labels', JSON.stringify(labels))
    }

    return formData;
}

export const createPhoto = async (imageUri: string, labels: string[] | null = null) => {
        const response = await axiosFiles.post('/photos',
            await buildFormData(imageUri, labels)
        )
        //   .catch(error => {
        //           if (error.response) {
        //               console.log('Error response:', error.response);
        //           } else if (error.request) {
        //               console.log('Error request:', error.request);
        //           } else {
        //               console.log('Error message:', error.message);
        //           }
        //       }
        //   )

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

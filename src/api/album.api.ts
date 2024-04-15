import {axiosInstance} from "./index.api";

export const createAlbum = async (name: string) => {
    const response = await axiosInstance.post("/albums",
        {
            "name": name,
            "owner": 3
        }
    );

    return response.data;
}

export const getAlbumsByUserId = async (userId: number) => {
    try {
        const response = await axiosInstance.get("/albums/users/" + userId);

        console.log(response.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
}

export const deleteAlbumById = async (albumIds: number[]) => {
    try {
        const response = await axiosInstance.delete("/albums", {
            data: {
                "idsToDelete": albumIds
            }
        });

        console.log('albums' + albumIds + 'deleted' + response.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
}
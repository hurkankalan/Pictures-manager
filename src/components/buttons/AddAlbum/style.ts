import styled from "styled-components/native";

interface AddAlbumContainerProps {
    selected?: boolean;
}

export const AddAlbumContainerStyle = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100px;
`;

export const OptionsContainerStyle = styled.View<AddAlbumContainerProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${({ selected }) => (selected ? 'space-between' : 'flex-end')};
`;

export const AddAlbumImageStyle = styled.Image`
    height: 70px;
    width: 70px;
`;
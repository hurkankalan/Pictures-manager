import styled from "styled-components/native";

interface AlbumContainerProps {
    selected: boolean;
}

export const AlbumContainerStyle = styled.TouchableOpacity<AlbumContainerProps>`
    background-color: ${({ selected }) => (selected ? 'grey' : 'transparent')};
    display: flex;
    align-content: space-between;
    border-radius: 10px;
    width: 100px;
    margin: 15px auto;
`;
export const AlbumImageStyle = styled.Image`
    width: 90px;
    height: 90px;
    margin: auto;
`;

export const AlbumTitleStyle = styled.Text`
    font-size: 18px;
    max-width: 200px;
    max-height: 40px;
    text-align: center;
`;
import styled from "styled-components/native";

interface PhotoContainerProps {
    selected: boolean;
}

export const PhotoContainerStyle = styled.TouchableOpacity<PhotoContainerProps>`
    border: 1px solid ${({ selected }) => (selected ? 'black' : 'transparent')};
    display: flex;
    align-content: space-between;
    border-radius: 10px;
    width: 140px;
    margin: 15px auto;
`;

export const PhotoImageStyle = styled.Image`
    width: 90px;
    height: 90px;
    margin: auto;
`;

export const PhotoStatusStyle = styled.Text`
    font-size: 14px;
    max-width: 150px;
    max-height: 20px;
    text-align: center;
`;

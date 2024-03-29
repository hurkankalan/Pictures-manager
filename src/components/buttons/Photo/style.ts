import styled from "styled-components/native";

interface PhotoContainerProps {
    selected: boolean;
}

export const PhotoContainerStyle = styled.TouchableOpacity<PhotoContainerProps>`
    background-color: ${({ selected }) => (selected ? 'grey' : 'transparent')};
    display: flex;
    align-content: space-between;
    border-radius: 10px;
    width: 100px;
    margin: 15px auto;
`;

export const PhotoImageStyle = styled.Image`
    width: 90px;
    height: 90px;
    margin: auto;
`;

export const PhotoTitleStyle = styled.Text`
    font-size: 18px;
    max-width: 200px;
    max-height: 40px;
    text-align: center;
`;

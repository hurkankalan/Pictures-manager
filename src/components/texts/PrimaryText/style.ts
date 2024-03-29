import styled from 'styled-components/native';

export const PrimaryTextStyle = styled.Text<{ textColor?: string }>`
    display: flex;
    justify-content: center;
    text-align: center;
    color: ${(props) => props.textColor || 'black'};
    font-size: 16px;
`;
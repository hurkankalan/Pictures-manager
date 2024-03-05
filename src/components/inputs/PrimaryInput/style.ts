import styled from 'styled-components/native';

export const FormInputStyle = styled.TextInput<{ color?: string }>`
    width: 300px;
    height: 50px;
    background: white;
    border-radius: 10px;
    margin: 10px auto 10px auto;
    padding-left: 10px;
    border: 1px solid ${(props) => props.color || '#B1B1B1'};
    
`;
import styled from "styled-components";

const StyledButton = styled.button`
    padding : 8px 16px;
    font-size : 16px;
    border-radius : 8px;
    cursor : pointer;
`;

// const Button = (props) => {
//     return(
//         <StyledButton onClick={props.onClick} disabled={props.disabled}>{props.title}</StyledButton>
//     );
// }

const Button = ({onClick, title, disabled}) => {
    return(
        <StyledButton onClick={onClick} disabled={disabled}>{title}</StyledButton>
    );
}

export default Button;
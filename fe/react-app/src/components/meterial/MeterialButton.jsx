import Button from '@mui/material/Button';

const MeterialButton = (props) => {
    return(
        <button onClick={props.onClick}>{props.title}</button>
    );
}

export default MeterialButton;
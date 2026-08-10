import { Button } from "react-bootstrap";


const WeatherButton = ({cities, city, handler}) => {
    return(
        <div className="button-group">
        {
            cities.map((item, idx) => {
                return(
                    <Button key={idx} 
                    className={`btn ${city===item.label ? 'active' : ''}`}
                    onClick={(e) => handler(e, item)}>{item.label}</Button>
                )
            })
        }
        </div>
    )
}

export default WeatherButton;

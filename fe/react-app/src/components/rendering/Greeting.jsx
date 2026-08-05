import GuestgGreeting from "./GuestgGreeting";
import UserGreeting from "./UserGreeting";

const Greeting = (props) => {
    {
        return props.flag ? <UserGreeting/> : <GuestgGreeting/>
    }
}

export default Greeting;
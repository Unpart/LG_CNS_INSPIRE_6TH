import styled from "styled-components";
import ForcastItem from "../item/ForcastItem";

const Grid = styled.div`
    display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px;
    @media (max-width: 960px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    @media (max-width: 700px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    @media (max-width: 380px) { grid-template-columns: 1fr; }
`;
const ForcastList = ({ items = [] }) => (
    <Grid>{items.map((item, index) => <ForcastItem key={`${item.category}-${index}`} item={item} />)}</Grid>
);
export default ForcastList;

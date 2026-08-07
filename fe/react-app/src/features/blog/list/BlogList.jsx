import styled       from "styled-components";
import BlogItem     from "../item/BlogItem";


const Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    min-height: 96px;
    margin-top: 8px;
    gap: 14px;
    color: #94a3b8;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
`;

const BlogList = (props) => {
    return(
        <Wrapper>
            {   props.ary && props.ary.length > 0 ?
                props.ary.map((blog, idx) => {
                    return <BlogItem    key={idx}
                                        blog={blog} />
                })
                :
                '등록된 글이 없습니다.'
            }
        </Wrapper>
    )
}

export default BlogList ;

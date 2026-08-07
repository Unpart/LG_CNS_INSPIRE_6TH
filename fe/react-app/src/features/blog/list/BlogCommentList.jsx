import styled from "styled-components";
import BlogCommentItem from "../item/BlogCommentItem";

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

const BlogCommentList = ({comments, handler}) => {
    return(
        <Wrapper>
            {
                comments.map((comment, idx) => {
                    return <BlogCommentItem
                                key={idx}
                                comment={comment}
                                handler={handler}/>
                })
            }
        </Wrapper>
    );
}

export default BlogCommentList;
import styled from "styled-components";
import BlogCommentItem from "../item/BlogCommentItem";

const Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    min-height: 104px;
    padding: 18px;
    margin-top: 6px;
    gap: 12px;
    border: 1px solid #edf0f5;
    border-radius: 18px;
    background: #f8fafc;
    color: #94a3b8;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
`;

const BlogCommentList = ({comments, handler, updateHandler}) => {
    return(
        <Wrapper>
            {
                comments.map((comment, idx) => {
                    return <BlogCommentItem
                                key={idx}
                                comment={comment}
                                handler={handler}
                                updateHandler={updateHandler}/>
                })
            }
        </Wrapper>
    );
}

export default BlogCommentList;

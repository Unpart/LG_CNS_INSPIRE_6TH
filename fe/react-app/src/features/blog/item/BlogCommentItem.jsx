import styled from "styled-components";
import Button from "../../../components/styled/Button";

const Wrapper = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 100%;
    min-height: 78px;
    padding: 18px 20px 18px 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    cursor: default;
    background: linear-gradient(135deg, #ffffff 0%, #fafbff 100%);
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
    transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 4px;
        background: linear-gradient(180deg, #6366f1, #38bdf8);
        opacity: 0.85;
    }

    &:hover {
        border-color: #c7d2fe;
        transform: translateY(-2px);
        box-shadow: 0 12px 24px rgba(79, 70, 229, 0.1);
    }

    &:focus-visible {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
    }
`;

const CommentText = styled.p`
    margin: 0;
    color: #1e293b;
    font-size: 16px;
    font-weight: 650;
    line-height: 1.6;
    letter-spacing: -0.02em;
    transition: color 0.2s ease;

    ${Wrapper}:hover & {
        color: #4f46e5;
    }

    & + div {
        align-self: flex-end;
        margin-top: 12px;
    }

    & + div button {
        padding: 6px 12px;
        border: 1px solid #fecaca;
        background: #fff;
        color: #ef4444;
        font-size: 13px;
        font-weight: 700;
        transition: all 0.2s ease;
    }

    & + div button:hover {
        border-color: #ef4444;
        background: #fef2f2;
    }
`;

const BlogCommentItem = ({comment, handler}) => {
    // 로그인 사용자 이메일
    const user = localStorage.getItem('user');

    return(
        <Wrapper>
            <CommentText>{comment.comment}</CommentText>
            {
                user === comment.email &&
                    <div>
                        <Button title={'삭제'}
                                onClick={(e) => handler(e, comment.id)}/>
                    </div>
            }
        </Wrapper>
    );
}

export default BlogCommentItem;

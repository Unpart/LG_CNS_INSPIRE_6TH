import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 100%;
    min-height: 88px;
    padding: 22px 24px 22px 28px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    cursor: pointer;
    background: linear-gradient(135deg, #ffffff 0%, #fafbff 100%);
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
    transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 5px;
        background: linear-gradient(180deg, #6366f1, #38bdf8);
        opacity: 0.85;
    }

    &:hover {
        border-color: #c7d2fe;
        transform: translateY(-3px);
        box-shadow: 0 14px 30px rgba(79, 70, 229, 0.12);
    }

    &:focus-visible {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
    }
`;

const TitleText = styled.p`
    margin: 0;
    color: #1e293b;
    font-size: 18px;
    font-weight: 750;
    line-height: 1.45;
    letter-spacing: -0.02em;
    transition: color 0.2s ease;

    ${Wrapper}:hover & {
        color: #4f46e5;
    }
`;
const CategoryBadge = styled.span`
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 10px;
    margin-bottom: 8px;
    border-radius: 999px;
    background: #eef2ff;
    color: #6366f1;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
`;

const BlogItem = ({blog}) => {

    const moveUrl = useNavigate();
    
    return(
        <Wrapper onClick={() => {
            moveUrl(`/blogs/read/${blog.blogId}`);
        }}>
        {blog.category && <CategoryBadge>{blog.category}</CategoryBadge>}
            <TitleText>{blog.title}</TitleText>
        </Wrapper>
    )
}

export default BlogItem ;

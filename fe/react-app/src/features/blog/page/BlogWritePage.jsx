import styled from "styled-components";
import Button from "../../../components/styled/Button";
import TextInput from "../../../components/styled/TextInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { categories } from "./BlogIndexPage";

const Wrapper = styled.div`
    box-sizing: border-box;
    min-height: 100vh;
    width: 100%;
    padding: 64px 20px 88px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background:
        radial-gradient(circle at 12% 8%, rgba(110, 99, 237, 0.12), transparent 24%),
        linear-gradient(145deg, #f8faff 0%, #f3f4fb 55%, #f8f6ff 100%);
    color: #20283b;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

    @media (max-width: 600px) {
        padding: 38px 16px 64px;
    }
`;

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    max-width: 760px;
    padding: 36px 38px 40px;
    border: 1px solid rgba(255, 255, 255, 0.9);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.94);
    box-shadow: 0 22px 60px rgba(62, 72, 125, 0.11);
    backdrop-filter: blur(14px);

    & > *:not(:last-child) {
        margin-bottom: 16px;
    }

    & > textarea {
        box-sizing: border-box;
        width: 100%;
        margin: 0 0 18px;
        padding: 15px 16px;
        resize: vertical;
        border: 1px solid #e1e4ed;
        border-radius: 12px;
        outline: none;
        background: #fafbfe;
        color: #293146;
        font-family: inherit;
        font-size: 13px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }

    & > textarea:focus {
        border-color: #7168ed;
        background: #ffffff;
        box-shadow: 0 0 0 4px rgba(113, 104, 237, 0.09);
    }

    & > textarea:first-of-type {
        min-height: 52px;
    }

    & > button {
        min-height: 45px;
        padding: 0 20px;
        border: 1px solid #dfe2eb;
        border-radius: 11px;
        background: #ffffff;
        color: #687084;
        font-family: inherit;
        font-size: 12px;
        font-weight: 750;
        transition: transform 0.18s ease, box-shadow 0.18s ease;
    }

    & > button:first-of-type {
        border-color: #6259df;
        background: linear-gradient(135deg, #6c63ed, #5147d5);
        box-shadow: 0 10px 22px rgba(81, 71, 213, 0.22);
        color: #ffffff;
    }

    & > button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 22px rgba(60, 69, 108, 0.12);
    }

    @media (max-width: 600px) {
        padding: 27px 20px 30px;
        border-radius: 18px;
    }
`;

const WelcomeMessage = styled.div`
    margin-bottom: 28px;
    padding-bottom: 22px;
    border-bottom: 1px solid #eceef4;
    color: #252d43;
    font-size: clamp(21px, 4vw, 27px);
    font-weight: 800;
    letter-spacing: -0.035em;

    &::before {
        content: "NEW POST";
        display: block;
        margin-bottom: 7px;
        color: #655ce0;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.18em;
    }
`;

// category UI
const CategoryLabel = styled.div`
    margin-bottom: 10px;
    color: #394156;
    font-size: 13px;
    font-weight: 750;
`;

const CategoryWrapper = styled.div`
    margin-bottom: 24px;
    padding: 18px;
    border: 1px solid #e8e8f1;
    border-radius: 15px;
    background: linear-gradient(135deg, #fbfbff, #f7f6ff);
`;

const CategoryRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 9px;
    width: 100%;
`;

const CategoryChip = styled.button`
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex-shrink: 0;
    white-space: nowrap;
    height: 40px;
    line-height: 1;

    border: 1px solid ${(props) => (props.$active ? "#635bdb" : "#dfe2eb")};
    background: ${(props) => (props.$active ? "#635bdb" : "#ffffff")};
    box-shadow: ${(props) => (props.$active ? "0 7px 15px rgba(99, 91, 219, 0.2)" : "none")};
    color: ${(props) => (props.$active ? "#ffffff" : "#4b5563")};
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
    padding: 0 15px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.18s ease;
    outline: none;

    &:focus-visible {
        outline: 3px solid rgba(99, 91, 219, 0.18);
        outline-offset: 2px;
    }

    &:hover {
        border-color: #635bdb;
        transform: translateY(-1px);
    }
`;

const BlogWritePage = () => {
    const user = localStorage.getItem('user');
    const moveUrl = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('');

    const writeCategories = categories.filter((category) => category.value !== 'all');

    return(
        <Wrapper>
            <Container>
                {user && <WelcomeMessage>{user}님 환영합니다.</WelcomeMessage>}

                {/* 카테고리 선택*/}
                <CategoryWrapper>
                    <CategoryLabel>카테고리</CategoryLabel>
                    <CategoryRow>
                        {writeCategories.map((category) => (
                            <CategoryChip
                                key={category.value}
                                type="button"
                                $active={selectedCategory === category.value}
                                aria-pressed={selectedCategory === category.value}
                                onClick={() => setSelectedCategory(category.value)}
                            >
                                <span aria-hidden="true">{category.icon}</span>
                                {category.label}
                            </CategoryChip>
                        ))}
                    </CategoryRow>
                </CategoryWrapper>

                {/* title*/}
                <TextInput height={20}/>

                {/* content */}
                <TextInput height={200}/>

                {/* button*/}
                <Button title={'글 작성하기'}/>
                &nbsp;&nbsp;&nbsp;
                <Button title={'이전'} onClick={() => { moveUrl('blog/index'); }}/>
            </Container>
        </Wrapper>
    );
}

export default BlogWritePage;

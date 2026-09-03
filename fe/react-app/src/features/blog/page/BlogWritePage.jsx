import styled       from "styled-components";
import Button       from "../../../components/styled/Button";
import TextInput    from "../../../components/styled/TextInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../../api/axios";



const Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-height: calc(100vh - 64px);
    padding: 64px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 10% 15%, rgba(99, 102, 241, 0.12), transparent 28%),
                radial-gradient(circle at 90% 85%, rgba(14, 165, 233, 0.1), transparent 30%),
                #f7f8fc;
`;

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: 720px;
    padding: 40px;
    border: 1px solid rgba(226, 232, 240, 0.9);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.1);

    & > *:not(:last-child) { margin-bottom: 20px; }

    & > textarea {
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        resize: vertical;
        border: 1px solid #dbe2ea;
        border-radius: 14px;
        background: #f8fafc;
        color: #1e293b;
        font-family: inherit;
        line-height: 1.65;
        transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }

    & > textarea:focus {
        outline: none;
        border-color: #6366f1;
        background: #fff;
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
    }

    & > button {
        min-height: 44px;
        border: 0;
        background: #4f46e5;
        color: #fff;
        font-weight: 700;
        box-shadow: 0 8px 18px rgba(79, 70, 229, 0.22);
        transition: transform 0.2s ease, background 0.2s ease;
    }

    & > button:hover { background: #4338ca; transform: translateY(-2px); }

    @media (max-width: 600px) { padding: 28px 20px; border-radius: 18px; }
`;

const WelcomeMessage = styled.div`
    padding-bottom: 18px;
    border-bottom: 1px solid #eef2f7;
    font-size: 22px;
    font-weight: 800;
    color: #172033;
    letter-spacing: -0.02em;
`;

// category UI 
const CategoryLabel = styled.div`
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: 700;
    color: #475569;
`;

const CategoryWrapper = styled.div`
    /* Container의 margin-bottom 규칙과 충돌 없이 label + row 묶기 위한 wrapper */
`;

const CategoryRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    width: 100%;
`;
const CategoryChip = styled.button`
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    white-space: nowrap;
    height: 38px;
    line-height: 1;
    border: 1px solid ${(props) => (props.$active ? "#4f46e5" : "#dbe2ea")};
    background: ${(props) => (props.$active ? "#4f46e5" : "#ffffff")};
    color: ${(props) => (props.$active ? "#ffffff" : "#475569")};
    font-size: 13px;
    font-weight: 600;
    padding: 0 18px;
    border-radius: 999px;
    cursor: pointer;
    box-shadow: ${(props) => (props.$active ? "0 6px 14px rgba(79, 70, 229, 0.22)" : "none")};
    transition: all 0.2s ease;
    outline: none;

    &:focus {
        outline: none;
        box-shadow: none;
    }

    &:hover {
        border-color: #6366f1;
        color: ${(props) => (props.$active ? "#ffffff" : "#4f46e5")};
        transform: translateY(-1px);
    }
`;


const BlogWritePage = () => {
    const user = localStorage.getItem('user');
    const CATEGORIES = ["전체", "개발", "생활", "취미", "일상"];

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState("전체");

    const writeHandler = async () => {
        /*
        Q)
        - api를 이용한 post 통신 : data(category, title, content, email)
        - status code : 201(Created)
        - blog index transition
        */
       console.log(`debug >>> BlogWtitePage writeHandler`);
       console.log(`debug >>> title ${title}, content ${content}, category ${category}`)
       await api.post('/blogs/insert', {
            title,
            content,
            category,
            email : user
       })
       .then(response => {
            console.log(`debug >>> axios request success`, response);

       })
       .catch(error => {
            console.log(`debug >>> axios request failed`, error);
       })
    }

    const moveUrl = useNavigate();

    return(
        <Wrapper>
            <Container>
                {user && <WelcomeMessage>{user}님 환영합니다.</WelcomeMessage>}

                {/* 카데코리 선택 */} 
                <CategoryWrapper>
                    <CategoryLabel>카테고리</CategoryLabel>
                    <CategoryRow>
                        {
                            // active 상태연결이 필요함
                            CATEGORIES.map((cat, idx) => {
                                return <CategoryChip   
                                                key={idx}
                                                type='button'
                                                $active={category === cat}
                                                onClick={(e) => {
                                                    setCategory(cat);
                                                }}>
                                    {cat}
                                </CategoryChip>
                            })
                        }
                    </CategoryRow>
                </CategoryWrapper>
                
                {/* title */}
                <TextInput height={20} value={title} handler={(e) => {
                    setTitle(e.target.value);
                }}/>
                
                {/* content */}
                <TextInput height={280} value={content} handler={(e) => {
                    setContent(e.target.value);
                }}/>
                
                {/* button */}
                <Button title='글 작성하기' onClick={writeHandler}/>
                &nbsp;&nbsp;&nbsp;
                <Button title='이전' 
                        onClick={() => {
                            moveUrl('/blogs/index') ;
                        }}/>
            </Container>
        </Wrapper>
    )
}

export default BlogWritePage ;

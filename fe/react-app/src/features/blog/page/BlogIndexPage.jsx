import Button from "../../../components/styled/Button";
import styled from "styled-components";
import BlogList from "../list/BlogList";
import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    box-sizing: border-box;
    min-height: 100vh;
    width: 100%;
    padding: 64px 20px 88px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background:
        radial-gradient(circle at 85% 8%, rgba(110, 99, 237, 0.14), transparent 25%),
        linear-gradient(145deg, #f8faff 0%, #f2f4fb 55%, #f8f6ff 100%);
    color: #20283b;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

    @media (max-width: 600px) {
        padding: 38px 16px 64px;
    }
`;

const Container = styled.div`
    width: 100%;
    max-width: 920px;

    & > *:not(:last-child) {
        margin-bottom: 16px;
    }

    & > button {
        min-height: 42px;
        padding: 0 17px;
        border: 1px solid #e0e3ed;
        border-radius: 11px;
        background: #ffffff;
        box-shadow: 0 5px 14px rgba(60, 69, 108, 0.06);
        color: #626a7d;
        font-family: inherit;
        font-size: 12px;
        font-weight: 700;
        transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
    }

    & > button:first-of-type {
        border-color: #6259df;
        background: linear-gradient(135deg, #6c63ed, #5147d5);
        box-shadow: 0 10px 22px rgba(81, 71, 213, 0.22);
        color: #ffffff;
    }

    & > button:hover {
        transform: translateY(-2px);
        border-color: #7971e5;
        box-shadow: 0 10px 22px rgba(60, 69, 108, 0.12);
    }
`;

const WelcomeMessage = styled.div`
    margin-bottom: 24px;
    color: #252d43;
    font-size: clamp(21px, 4vw, 29px);
    font-weight: 800;
    letter-spacing: -0.035em;

    &::before {
        content: "INSPIRE BLOG";
        display: block;
        margin-bottom: 7px;
        color: #655ce0;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.18em;
    }
`;

const CategoryPanel = styled.section`
    position: relative;
    margin: 32px 0 32px;
    padding: 25px 26px 27px;
    overflow: hidden;
    border: 1px solid #dcd9fa;
    border-radius: 20px;
    background: linear-gradient(135deg, #f5f3ff 0%, #eeecff 100%);
    box-shadow: 0 13px 30px rgba(86, 76, 181, 0.1);
    backdrop-filter: blur(12px);

    &::after {
        content: "";
        position: absolute;
        top: -60px;
        right: -35px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background: rgba(112, 102, 229, 0.08);
        pointer-events: none;
    }

    @media (max-width: 600px) {
        padding: 19px;
    }
`;

const CategoryHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 15px;
`;

const CategoryTitle = styled.h2`
    margin: 0;
    color: #37305e;
    font-size: 16px;
    letter-spacing: -0.02em;
`;

const PostCount = styled.span`
    padding: 6px 9px;
    border-radius: 999px;
    background: #f0effb;
    color: #726bca;
    font-size: 11px;
`;

const CategoryFilter = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 9px;
`;

const CategoryButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 40px;
    padding: 0 15px;
    border: 1px solid ${({ $active }) => ($active ? "#635bdb" : "#dedfeb")};
    border-radius: 999px;
    background: ${({ $active }) => ($active ? "#635bdb" : "#ffffff")};
    box-shadow: ${({ $active }) => ($active ? "0 7px 15px rgba(99, 91, 219, 0.22)" : "none")};
    color: ${({ $active }) => ($active ? "#ffffff" : "#676d7e")};
    font: inherit;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.18s ease, border-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;

    &:hover {
        border-color: #635bdb;
        color: ${({ $active }) => ($active ? "#ffffff" : "#5149c4")};
        transform: translateY(-1px);
    }

    &:focus-visible {
        outline: 3px solid rgba(99, 91, 219, 0.2);
        outline-offset: 2px;
    }
`;

const CategoryIcon = styled.span`
    font-size: 13px;
    line-height: 1;
`;

const ListArea = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: 58px 24px 24px;
    border: 1px solid #e1e4ed;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.76);
    box-shadow: 0 14px 36px rgba(60, 69, 108, 0.07);

    &::before {
        content: "글 목록";
        position: absolute;
        top: 23px;
        left: 25px;
        color: #293146;
        font-size: 16px;
        font-weight: 800;
        letter-spacing: -0.02em;
    }

    &::after {
        content: "";
        position: absolute;
        top: 51px;
        right: 24px;
        left: 24px;
        height: 1px;
        background: #eceef4;
    }

    & > div {
        gap: 18px;
        margin-top: 16px;
    }

    & > div > div {
        box-sizing: border-box;
        width: 100%;
        min-height: 112px;
        padding: 22px 24px;
        border: 1px solid #e5e8f0;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.94);
        box-shadow: 0 8px 24px rgba(60, 69, 108, 0.06);
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }

    & > div > div:hover {
        transform: translateY(-3px);
        border-color: #d2cff5;
        background: #ffffff;
        box-shadow: 0 15px 32px rgba(60, 69, 108, 0.11);
    }

    & > div > div p {
        margin: 0;
        color: #293146;
        font-size: 18px;
        letter-spacing: -0.02em;
    }

    @media (max-width: 600px) {
        padding: 55px 15px 15px;
        border-radius: 17px;

        &::before {
            top: 20px;
            left: 17px;
        }

        &::after {
            top: 48px;
            right: 15px;
            left: 15px;
        }
    }
`;

export const categories = [
    { value: 'all', label: '전체', icon: '✦' },
    { value: 'front-end', label: '프론트엔드', icon: '🖥️' },
    { value: 'back-end', label: '백엔드', icon: '⚙️' },
    { value: 'database', label: '데이터베이스', icon: '🗄️' },
    { value: 'devops', label: 'DevOps', icon: '☁️' },
    { value: 'daily', label: '개발 일상', icon: '☕' },
];

// blog property - title, content, category, email(pk)
const BlogIndexPage = () => {
    const user = localStorage.getItem('user');
    const [blog, setBlog] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    /*
    Q)
    - axios 통신(get(blog), params X)
    - 데이터를 reactive state 관리(setXXXX)
    - 렌더링 시점에 데이터 바인딩이 X, effect 필요함
    */
    const loadData = async () => {
        // json-server version
        await api.get('/blog')
                    .then(response => {
                        console.log(`debug >>>> axios request success`, response);
                        if(response.status === 200) {
                            setBlog(response.data);
                        }
                    })
                    .catch( error => {
                        console.log(`debug >>>> axios request error`, error);
                    });
    }

    useEffect(() => {
        loadData();
    },[])

    const filteredBlog = selectedCategory === 'all'
        ? blog
        : blog.filter((item) => item.category === selectedCategory);

    const moveUrl = useNavigate();

    const writeHandler = (e) => {
        moveUrl('/blog/write');
    }

    return(
        <Wrapper>
            <Container>
                {user && <WelcomeMessage>{user}님 환영합니다.</WelcomeMessage>}
                <Button title='글 작성하기' onClick={(e) => writeHandler(e)}></Button>
                &nbsp;&nbsp;&nbsp;
                <Button title='로그아웃'></Button>
                &nbsp;&nbsp;&nbsp;
                <Button title='기상예보'></Button>

                <CategoryPanel>
                    <CategoryHeader>
                        <CategoryTitle>카테고리</CategoryTitle>
                        <PostCount>게시글 {filteredBlog.length}개</PostCount>
                    </CategoryHeader>

                    <CategoryFilter aria-label="블로그 카테고리 필터">
                        {categories.map((category) => (
                            <CategoryButton
                                key={category.value}
                                type="button"
                                $active={selectedCategory === category.value}
                                aria-pressed={selectedCategory === category.value}
                                onClick={() => setSelectedCategory(category.value)}
                            >
                                <CategoryIcon aria-hidden="true">{category.icon}</CategoryIcon>
                                {category.label}
                            </CategoryButton>
                        ))}
                    </CategoryFilter>
                </CategoryPanel>

                <ListArea>
                    <BlogList ary={filteredBlog}/>
                </ListArea>

            </Container>
        </Wrapper>
    );
}

export default BlogIndexPage;

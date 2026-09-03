import styled from "styled-components";
import Button from "../../../components/styled/Button" ;
import BlogList from "../list/BlogList";
import { useEffect, useMemo, useState } from "react";
import api from "../../../api/axios";
import '../ui/blog.css';
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-height: calc(100vh - 64px);
    padding: 64px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: radial-gradient(circle at 12% 12%, rgba(99, 102, 241, 0.12), transparent 28%),
                radial-gradient(circle at 88% 80%, rgba(14, 165, 233, 0.09), transparent 30%),
                #f7f8fc;
`;

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: 720px;
    padding: 36px;
    border: 1px solid rgba(226, 232, 240, 0.9);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.1);

    & > *:not(:last-child) {
        margin-bottom: 22px;
    }

    & > div:last-child > * { box-sizing: border-box; width: 100%; }

    @media (max-width: 600px) { padding: 26px 20px; border-radius: 18px; }
`;

const WelcomeMessage = styled.div`
    padding-bottom: 18px;
    border-bottom: 1px solid #eef2f7;
    font-size: 22px;
    font-weight: 800;
    color: #172033;
    letter-spacing: -0.02em;
`;

const LogoutButton = styled(Button)`
    border: 0;
    background-color: #ef4444;
    color: white;

    &:hover {
        background-color: #d32f2f;
    }
`;

// ---------- 버튼 영역 ----------
const ButtonRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;

    & > button {
        box-sizing: border-box;
        min-height: 42px;
        border: 1px solid #dbe2ea;
        background: #fff;
        color: #475569;
        font-size: 14px;
        font-weight: 700;
        outline: none;
        transition: all 0.2s ease;
    }

    & > button:first-child {
        border-color: #4f46e5;
        background: #4f46e5;
        color: #fff;
        box-shadow: 0 8px 18px rgba(79, 70, 229, 0.22);
    }

    & > button:hover { border-color: #6366f1; color: #4f46e5; transform: translateY(-2px); }
    & > button:first-child:hover { background: #4338ca; color: #fff; }

    & > button:focus {
        outline: none;
        box-shadow: none;
    }
`;

// ---------- 카테고리 필터 UI ----------
const CategoryRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    background: #f8fafc;
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
// blog property - title, content, category, email(pk)
const BlogIndexPage = () => {
    
    const CATEGORIES = ["전체", "개발", "생활", "취미", "일상"];
    
    const user = localStorage.getItem('user');

    const [blogs , setBlogs] = useState([]);
    // const blogs = [
    //     {
    //         "title"    : "til 작성",
    //         "content"  : "component",
    //         "category" : "front-end",
    //         "email"    : user
    //     },
    //     {
    //         "title"    : "링거(술)",
    //         "content"  : "java",
    //         "category" : "back-end",
    //         "email"    : user
    //     }
    // ];

    /*
    Q)
    - axios 통신(get(blogs) , params X)
    - 데이터를 reactive state 관리(setXXXX) 
    - 렌더링시점에 데이터 바인딩이 X, side effect  필요함!!
    */
    const loadData = async () => {
        // json-server version
        await api.get(`/blogs/index`)
                .then( response => {
                    console.log(`debug >>>> axios request success` , response);  
                    if(response.status === 200) {
                        setBlogs(response.data);
                    }
                })
                .catch( error => {
                    console.log(`debug >>>> axios request error` , error); 
                });
    }
    useEffect(() => {
        loadData() ;
    }, []);
    
    
    // 선택된 카테고리에 따라 blogs 필터링
    const [selectedCategory, setSelectedCategory] = useState("전체");
    // case 01
    // const filteredBlogs = selectedCategory === "전체"
    //     ? blogs
    //     : blogs.filter((blog) => blog.category === selectedCategory);

    // case 02 : useMemo() - 성능개선을 위해서
    const filteredBlogs = useMemo(() => {
        return selectedCategory === "전체"
        ? blogs
        : blogs.filter((blog) => blog.category === selectedCategory);
    }, [blogs, selectedCategory]);
        


    const moveUrl = useNavigate();
    // handler
    const writeHandler = (e) => {
        moveUrl('/blogs/write'); 
    };

    return (
        <Wrapper>
            <Container>
                {user && <WelcomeMessage>{user}님 환영합니다.</WelcomeMessage>}
                <ButtonRow>
                    <Button title='글 작성하기'
                            onClick={(e) => writeHandler(e)}></Button>
                    <Button title='로그아웃'
                            onClick={(e) => moveUrl('/users/signIn')}></Button>
                    <Button title='기상예보'></Button>
                    <Button title='OpenAPI'
                            onClick={(e) => moveUrl('/openapi/index')}></Button>
                </ButtonRow>

                <CategoryRow>
                    {CATEGORIES.map((category) => (
                        <CategoryChip
                            key={category}
                            $active={category === selectedCategory}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </CategoryChip>
                    ))}
                </CategoryRow>

                <BlogList ary={filteredBlogs || []}/>

            </Container>
        </Wrapper>
    );
}
export default BlogIndexPage ;

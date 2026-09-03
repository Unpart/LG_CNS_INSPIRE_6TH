import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import api from "../../../api/axios";
import Button from "../../../components/styled/Button";
import TextInput from "../../../components/styled/TextInput";
import BlogCommentList from "../list/BlogCommentList";

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
    padding: 38px;
    border: 1px solid rgba(226, 232, 240, 0.9);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.1);

    & > *:not(:last-child) {
        margin-bottom: 20px;
    }

    & > button {
        min-height: 42px;
        border: 1px solid #dbe2ea;
        background: #fff;
        color: #475569;
        font-size: 14px;
        font-weight: 700;
        transition: all 0.2s ease;
    }

    & > button:hover {
        border-color: #6366f1;
        color: #4f46e5;
        transform: translateY(-2px);
    }

    & > button:last-child {
        border-color: #4f46e5;
        background: #4f46e5;
        color: #fff;
        box-shadow: 0 8px 18px rgba(79, 70, 229, 0.2);
    }

    & > textarea {
        box-sizing: border-box;
        width: 100%;
        min-height: 72px;
        margin: 0;
        resize: vertical;
        border: 1px solid #dbe2ea;
        border-radius: 14px;
        background: #f8fafc;
        color: #1e293b;
        font-family: inherit;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    & > textarea:focus {
        outline: none;
        border-color: #6366f1;
        background: #fff;
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
    }

    @media (max-width: 600px) { padding: 26px 20px; border-radius: 18px; }
`;

const PostContainer = styled.div`
    position: relative;
    overflow: hidden;
    min-height: 220px;
    padding: 30px;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    background: linear-gradient(145deg, #ffffff 0%, #f8faff 100%);
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 5px;
        background: linear-gradient(90deg, #6366f1, #38bdf8);
    }
`;

const TitleText = styled.p`
    margin: 0 0 22px;
    padding-bottom: 18px;
    border-bottom: 1px solid #e8edf4;
    color: #172033;
    font-size: 30px;
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: -0.03em;
`;

const ContentText = styled.p`
    margin: 0;
    color: #475569;
    font-size: 17px;
    line-height: 1.85;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    margin: 32px 0 0;
    color: #1e293b;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.02em;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 5px solid #e0e7ff;
  border-top: 5px solid #4f46e5;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  animation: ${spin} 0.8s linear infinite;
  margin: 100px auto;
`;

const WelcomeMessage = styled.div`
    padding-bottom: 18px;
    border-bottom: 1px solid #eef2f7;
    color: #172033;
    font-size: 21px;
    font-weight: 800;
    letter-spacing: -0.02em;
`;

const BlogReadPage = () => {
    const {blogId} = useParams();
    const user = localStorage.getItem('user');
    const at = localStorage.getItem('at');
    console.log(`debug >>> BlogReadPage rendering ${blogId} , ${user}, ${at}`)
    const moveUrl = useNavigate();

    // 블로그 정보
    const [blog, setBlog] = useState({});
    
    // 댓글 배열 정보
    const [comments, setComments] = useState([]);

    // 댓글 입력
    const [comment, setComment] = useState('');
    /*
    Q)
    - component mount 일때 blogId 해당하는 객체를 얻어올 수 있어야함
    - api.get('/blogs/blogId') : blog
    - blog 는 reactive state 상태로 관리 : useState();
    */

    const loadData = async () => {
        // json-server : 댓글이 없는 상황
        /*
        - axios - get(blogs?key=value&key=value)
        - axios - get(blogs, {
            params : {}
        })
        - axios - get(blogs/&{}/&{}/${})
        */
        const id = blogId

        // await api.get(`/blogs/${id}?_embed=comments`)

        // spring boot version
            await api.get(`/blogs/read/${id}`, {
                headers : {Authorization : at ? at : ""}
            })
                .then( response => {
                    console.log(`debug >>>> axios request success` , response);  
                    if(response.status === 200) {
                        setBlog(response.data);
                        setComments(response.data.comments);
                    }
                })
                .catch( error => {
                    console.log(`debug >>>> axios request error` , error); 
                });
        // json-server : 댓글이 있는 상황

    }
    useEffect(()=>{
        loadData();
    },[blogId]);
    
    // comment handler
    const commentHandler = async (e) => {
        /*
        Q)
        - data - (comment, blogId, email)
        - axios post(url, data)
        - status 201(Created)
        - 부분 리렌더링을 위한 작업(comments - 배열)
        */
       console.log(`debug >>>> commentHandler event`);
       let email = user;
       await api.post('/comments/insert', {blogId : Number(blogId), comment, email}, {
                headers : {Authorization : at ? at : ""}
            })
            .then(response => {
                console.log(`debug >>>> axios request success`, response);

                if(response.status === 201) {
                    setComments(ary => [...ary, response.data]);
                    setComment('');
                }
            })
            .catch(error => {
                console.log(`debug >>>> axios request error`, error);
            })
    };

    // comment delete handler
    const commentDeleteHandler = async (e, id) => {
        console.log(`debug >>>> commentDeleteHandler event`);
        console.log(`debug >>>> commentDeleteHandler comment id ${id}`);
        /*
        Q}
        - axios delete('/comment/${id}'), status 204(NO_CONTENT)
        - 삭제됨 comment id 만 필터링 해서 re-rendering
        */
       await api.delete(`/comments/${id}`)
            .then(response => {
                console.log(`debug >>>> axios request success`, response);

                if(response.status === 200) {
                    setComments(comments.filter((c) => {
                        return c.id !== id
                    }));
                }
            })
            .catch(error => {
                console.log(`debug >>>> axios request error`, error);
            })
    }

    // comment update
    const commentUpdateHandler = async (id, mention) => {
        console.log(`debug >>>> commentUpdateHandler`); 
        console.log(`debug >>>> commentUpdateHandler id ${id}, mention ${mention}`);

        // update : axios put(전체교체), patch(부분수정)
        await api.patch(`/comments/${id}`, {
            comment : mention
        })
        .then( response => {
            console.log(`debug >>>> axios request success`, response);
            if(response.status === 200) {
                setComments(ary => {
                    return ary.map(comment =>{
                        return comment.id === id ? {...comment, comment : mention} : comment
                    })
                })
            } 
        })
        .catch(error => {
            console.log(`debug >>>> axios request error`, error);
        });
    }
    return (
        <Wrapper>
            {!blog.id && <Spinner/>}
            {blog.id &&
                <Container>
                    {user && <WelcomeMessage>{user}님 환영합니다.</WelcomeMessage>}
                    <Button title='메인페이지' onClick={() => {
                        moveUrl('/blogs/index');
                    }}/>

                    {/* blog title, content, category */}
                    <PostContainer>
                        <TitleText>{blog.title}</TitleText>
                        <ContentText>{blog.content}</ContentText>
                    </PostContainer>

                    {/* 댓글 UI 설계 - BlogCommentList, BlogCommnetItem */}
                    <CommentLabel>작성된 댓글 목록</CommentLabel>

                    {/* BlogCommentList */}
                    <BlogCommentList comments={comments || []} 
                        handler={commentDeleteHandler}
                        updateHandler={commentUpdateHandler}/>

                    {/* 댓글 입력과 이벤트 */}
                    <TextInput height={14} value={comment} handler={(e) => {
                        setComment(e.target.value);
                    }}/>
                    <Button title='댓글 작성' onClick={commentHandler}/>
                </Container>
            }
        </Wrapper>
    );
    
}

export default BlogReadPage;

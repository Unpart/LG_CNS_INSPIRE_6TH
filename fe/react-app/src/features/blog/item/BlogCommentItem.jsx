import styled from "styled-components";
import Button from "../../../components/styled/Button";
import { useEffect, useState } from "react";
import TextInput from "../../../components/styled/TextInput";

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

    & > textarea {
        box-sizing: border-box;
        width: 100%;
        min-height: 64px;
        padding: 12px 14px;
        resize: vertical;
        border: 1px solid #d7dee9;
        border-radius: 12px;
        background: #fbfcfe;
        color: #1e293b;
        font-family: inherit;
        font-size: 15px;
        line-height: 1.55;
        transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }

    & > textarea:focus {
        outline: none;
        border-color: #6366f1;
        background: #fff;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
    }

    & > textarea:disabled {
        cursor: default;
        background: #f8fafc;
        color: #334155;
        opacity: 1;
    }

    & > div {
        align-self: flex-end;
        display: flex;
        gap: 6px;
        margin-top: 2px;
    }

    & > div button {
        min-width: 58px;
        padding: 7px 12px;
        border: 1px solid #dbe2ea;
        border-radius: 8px;
        background: #fff;
        color: #64748b;
        font-size: 13px;
        font-weight: 700;
        transition: all 0.2s ease;
    }

    & > div button:first-child:hover {
        border-color: #818cf8;
        background: #eef2ff;
        color: #4f46e5;
    }

    & > div button:last-child {
        border-color: #fecaca;
        color: #ef4444;
    }

    & > div button:last-child:hover {
        border-color: #ef4444;
        background: #fef2f2;
        color: #dc2626;
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

`;

const BlogCommentItem = ({comment, handler, updateHandler}) => {
    // 로그인 사용자 이메일
    const user = localStorage.getItem('user');

    const [isEdit, setIsEdit] = useState(false);
    const [mention, setMention] = useState('');

    const updateMentionHandler = (e) => {
        if(!isEdit) {
            // 수정모드 on
            setIsEdit(true);
        } else {
            /*
            SQL
            -   update table
                set    column = value
                where  id = ? ;
            - 선택된 특정댓글의 기본키 값을 가지고 사용자가 입력한 값으로 수정
            - UI - 일부 리렌더링(댓글 목록만)
            - 당연한 json-server 수정이 되어야 함
            */
            // 수정완료모드 on
            updateHandler(comment.id, mention); // read page : commentUpdateHandler();
            setIsEdit(false);
        }
    }

    useEffect(() => {
        setMention(comment.comment);
    }, [comment.comment]);

    return(
        <Wrapper>
            {/* <CommentText>{comment.comment}</CommentText> */}
            <TextInput height={16} value={mention} handler={(e) => setMention(e.target.value)} disabled={!isEdit}/>
            {
                user === comment.email &&
                    <div>
                        <Button title={isEdit ? '수정완료' : '수정'}
                                onClick={(e) => updateMentionHandler(e)}/>
                        <Button title={'삭제'}
                                onClick={(e) => handler(e, comment.id)}/>
                    </div>
            }
        </Wrapper>
    );
}

export default BlogCommentItem;

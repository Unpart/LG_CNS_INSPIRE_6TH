import React, { useState }  from 'react';
import styled               from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import api from '../../../api/axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const FormWrapper = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.1);
  width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0,123,255,0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const TextLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// npm install styled-components @mui/material @mui/icons-material @emotion/react @emotion/styled

const SignUpPage = () => {

    const [form, setForm] = useState({
        name : '',
        email : '',
        password : ''
    }) ;

    // 기존값을 유지하면서 현재 입력된 필드에 대한 상태변화(업데이트)를 처리 
    const keyHandler = (e) => {
        const {name, value} = e.target ;
        setForm({...form, [name]:value});
    };

    const moveUrl = useNavigate();

    const signUpHandler = async (e) => {
        e.preventDefault();
        console.log(`debug >>>> SignUpPage signUpHandler event`); 
        const data = {...form} ; 
        /*
        Q)
        - npx json-server --watch db.json --port 5000 
        - axios(/users) 통신을 통해서 json-server 데이터를 전달하고 저장
        - post, get, put-patch, delete
        - 가입성공시(201) - SignInPage 이동( useNavigate ) 
        - 가입실패(4XX) - 현재페이지에 에러메시지를 출력 
        */
       
        // json-server version
        // await api.post('/users', data)
        //         .then( response => {
        //             console.log(`debug >>>> axios request success` , response);  
        //             if( response.status === 201) {
        //                 moveUrl('/users/signIn');
        //             } 
        //         })
        //         .catch( error => {
        //             console.log(`debug >>>> axios request error` , error); 
        //         }) 

        // spring boot version
        await api.post('/users/signUp', data)
                .then( response => {
                    console.log(`debug >>>> axios request success` , response);  
                    if( response.status === 201) {
                        moveUrl('/users/signIn');
                    } 
                })
                .catch( error => {
                    console.log(`debug >>>> axios request error` , error); 
                }) 
    }


    return(
        <Container>
            <FormWrapper>
                <Title>회원가입</Title>
                <form onSubmit={signUpHandler}>
                    <Input  type='text' 
                            name='name'
                            placeholder="이름 입력하세요"
                            value={form.name} 
                            onChange={keyHandler}/>
                    <Input  type='email' 
                            name='email'
                            placeholder="이메일 입력하세요"
                            value={form.email} 
                            onChange={keyHandler}/>
                    <Input  type='password' 
                            name='password'
                            placeholder="패스워드 입력하세요"
                            value={form.passwrd} 
                            onChange={keyHandler}/>
                    <Button type='submit'>가입하기</Button>
                </form>
                <TextLink to='/users/signIn'>이미회원이시면 로그인</TextLink>
            </FormWrapper>
        </Container>
    )
}

export default SignUpPage ;



// gen ai agent code 

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Link, useNavigate } from "react-router-dom";

// import {
//   PersonOutlined as PersonOutlineIcon,      // 사람 아이콘 (outline 스타일)
//   EmailOutlined as EmailOutlinedIcon,
//   LockOutlined as LockOutlinedIcon,
//   Visibility as VisibilityIcon,
//   VisibilityOff as VisibilityOffIcon,
//   CheckCircle as CheckCircleIcon,
// } from '@mui/icons-material';
// import api from '../../../api/axios';

// const Wrapper = styled.div`
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
//   padding: 20px;
// `;

// const Card = styled.div`
//   background: #ffffff;
//   width: 100%;
//   max-width: 420px;
//   border-radius: 16px;
//   padding: 40px 36px;
//   box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   font-weight: 700;
//   color: #1f2937;
//   margin: 0 0 8px;
//   text-align: center;
// `;

// const Subtitle = styled.p`
//   font-size: 14px;
//   color: #6b7280;
//   margin: 0 0 32px;
//   text-align: center;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 18px;
// `;

// const FieldGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 6px;
// `;

// const Label = styled.label`
//   font-size: 13px;
//   font-weight: 600;
//   color: #374151;
// `;

// const InputBox = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   border: 1.5px solid ${(props) => (props.$error ? '#ef4444' : '#e5e7eb')};
//   border-radius: 10px;
//   padding: 12px 14px;
//   transition: border-color 0.2s;
//   background: #f9fafb;

//   &:focus-within {
//     border-color: ${(props) => (props.$error ? '#ef4444' : '#6366f1')};
//     background: #ffffff;
//   }

//   svg {
//     color: ${(props) => (props.$error ? '#ef4444' : '#9ca3af')};
//     font-size: 20px;
//     flex-shrink: 0;
//   }
// `;

// const Input = styled.input`
//   border: none;
//   outline: none;
//   background: transparent;
//   flex: 1;
//   font-size: 14px;
//   color: #111827;

//   &::placeholder {
//     color: #9ca3af;
//   }
// `;

// const ToggleButton = styled.button`
//   border: none;
//   background: transparent;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   padding: 0;

//   svg {
//     color: #9ca3af;
//     font-size: 20px;
//   }
// `;

// const ErrorText = styled.span`
//   font-size: 12px;
//   color: #ef4444;
// `;

// const SubmitButton = styled.button`
//   margin-top: 8px;
//   background: #6366f1;
//   color: #fff;
//   border: none;
//   border-radius: 10px;
//   padding: 14px;
//   font-size: 15px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: background 0.2s;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 8px;

//   &:hover {
//     background: #4f46e5;
//   }

//   &:disabled {
//     background: #c7c9f5;
//     cursor: not-allowed;
//   }
// `;

// const Footer = styled.p`
//   margin-top: 24px;
//   text-align: center;
//   font-size: 13px;
//   color: #6b7280;

//   a {
//     color: #6366f1;
//     font-weight: 600;
//     text-decoration: none;
//     cursor: pointer;
//   }
// `;

// const TextLink = styled(Link)`
//   display: block;
//   text-align: center;
//   margin-top: 15px;
//   font-size: 14px;
//   color: #007bff;
//   text-decoration: none;
//   cursor: pointer;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// function SignupPage() {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!form.name.trim()) newErrors.name = '이름을 입력해주세요.';
//     if (!form.email.trim()) {
//       newErrors.email = '이메일을 입력해주세요.';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = '올바른 이메일 형식이 아닙니다.';
//     }
//     if (!form.password) {
//       newErrors.password = '비밀번호를 입력해주세요.';
//     } else if (form.password.length < 8) {
//       newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
//     }
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validate();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
//     // TODO: 실제 회원가입 API 호출
//     // json-server version
//     await api.post('/users', form)
//             .then( response => {
//                 console.log(`debug >>>> axios request success` , response);  
//                 if( response.status === 201) {
//                     console.log('회원가입 데이터:', form);
//                     setSubmitted(true);
//                     // moveUrl('/users/signIn');
//                 } 
//             })
//             .catch( error => {
//                 console.log(`debug >>>> axios request error` , error); 
//             }) 
    
//   };

//   return (
//     <Wrapper>
//       <Card>
//         <Title>회원가입</Title>
//         <Subtitle>몇 가지 정보만 입력하면 바로 시작할 수 있어요</Subtitle>

//         <Form onSubmit={handleSubmit} noValidate>
//           <FieldGroup>
//             <Label htmlFor="name">이름</Label>
//             <InputBox $error={!!errors.name}>
//               <PersonOutlineIcon />
//               <Input
//                 id="name"
//                 name="name"
//                 type="text"
//                 placeholder="홍길동"
//                 value={form.name}
//                 onChange={handleChange}
//               />
//             </InputBox>
//             {errors.name && <ErrorText>{errors.name}</ErrorText>}
//           </FieldGroup>

//           <FieldGroup>
//             <Label htmlFor="email">이메일</Label>
//             <InputBox $error={!!errors.email}>
//               <EmailOutlinedIcon />
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="example@email.com"
//                 value={form.email}
//                 onChange={handleChange}
//               />
//             </InputBox>
//             {errors.email && <ErrorText>{errors.email}</ErrorText>}
//           </FieldGroup>

//           <FieldGroup>
//             <Label htmlFor="password">비밀번호</Label>
//             <InputBox $error={!!errors.password}>
//               <LockOutlinedIcon />
//               <Input
//                 id="password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="8자 이상 입력해주세요"
//                 value={form.password}
//                 onChange={handleChange}
//               />
//               <ToggleButton
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//               >
//                 {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//               </ToggleButton>
//             </InputBox>
//             {errors.password && <ErrorText>{errors.password}</ErrorText>}
//           </FieldGroup>

//           <SubmitButton type="submit" disabled={submitted}>
//             {submitted ? (
//               <>
//                 <CheckCircleIcon fontSize="small" />
//                 가입 완료
//               </>
//             ) : (
//               '회원가입'
//             )}
//           </SubmitButton>
//         </Form>

//         <Footer>
//           이미 계정이 있으신가요? <TextLink to="/users/signIn">로그인</TextLink>
//         </Footer>
//       </Card>
//     </Wrapper>
//   );
// }

// export default SignupPage;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../../api/axios";

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await api.get("/users", {
        params: {
          email: formData.email.trim(),
          pswd: formData.password,
        },
      });

      if (response.data.length > 0) {
        const loggedInUser = response.data[0];
        localStorage.setItem("user", loggedInUser.email);
        window.alert("로그인에 성공했습니다.");
        navigate("/blogs/index", { replace: true });
        return;
      }

      window.alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    } catch (error) {
      console.error("로그인 요청 실패", error);
      window.alert("로그인 요청에 실패했습니다. 서버 연결을 확인해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <BackgroundShape $position="top" />
      <BackgroundShape $position="bottom" />

      <SignInCard>
        <Brand aria-label="Inspire 홈으로 이동" to="/">
          <BrandMark aria-hidden="true">I</BrandMark>
          <BrandName>INSPIRE</BrandName>
        </Brand>

        <Header>
          <Eyebrow>WELCOME BACK</Eyebrow>
          <Title>다시 만나서 반가워요</Title>
          <Description>이메일과 비밀번호를 입력해 로그인해 주세요.</Description>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="email">이메일</Label>
            <InputBox>
              <InputIcon aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="m3 6 9 7 9-7M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
                </svg>
              </InputIcon>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputBox>
          </Field>

          <Field>
            <Label htmlFor="password">비밀번호</Label>
            <InputBox>
              <InputIcon aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M7 10V8a5 5 0 0 1 10 0v2M6 21h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2Z" />
                </svg>
              </InputIcon>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해 주세요"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <PasswordToggle
                type="button"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "숨김" : "보기"}
              </PasswordToggle>
            </InputBox>
          </Field>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "로그인 중..." : "로그인"}
            {!isSubmitting && <span aria-hidden="true">→</span>}
          </SubmitButton>
        </Form>

        <Divider><span>아직 계정이 없으신가요?</span></Divider>
        <TextLink to="/">회원가입하러 가기</TextLink>
      </SignInCard>

      <Footer>© 2026 INSPIRE. All rights reserved.</Footer>
    </Page>
  );
};

const Page = styled.main`
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  overflow: hidden;
  padding: 56px 24px 76px;
  background: linear-gradient(145deg, #f8faff 0%, #f1f5ff 48%, #f7f4ff 100%);
  color: #172033;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  @media (max-width: 520px) {
    padding: 24px 16px 64px;
    background: #ffffff;
  }
`;

const BackgroundShape = styled.div`
  position: absolute;
  width: 440px;
  height: 440px;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(2px);
  background: ${({ $position }) =>
    $position === "top"
      ? "linear-gradient(135deg, rgba(104, 112, 255, 0.16), rgba(139, 92, 246, 0.04))"
      : "linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(124, 58, 237, 0.12))"};
  top: ${({ $position }) => ($position === "top" ? "-220px" : "auto")};
  right: ${({ $position }) => ($position === "top" ? "-120px" : "auto")};
  bottom: ${({ $position }) => ($position === "bottom" ? "-260px" : "auto")};
  left: ${({ $position }) => ($position === "bottom" ? "-140px" : "auto")};

  @media (max-width: 520px) { display: none; }
`;

const SignInCard = styled.section`
  position: relative;
  z-index: 1;
  width: min(100%, 430px);
  box-sizing: border-box;
  padding: 42px 42px 36px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 24px 70px rgba(62, 72, 125, 0.13), 0 3px 12px rgba(62, 72, 125, 0.05);
  backdrop-filter: blur(18px);

  @media (max-width: 520px) {
    padding: 20px 8px;
    border: 0;
    box-shadow: none;
  }
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #212b46;
  text-decoration: none;
`;

const BrandMark = styled.span`
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border-radius: 9px;
  background: linear-gradient(135deg, #6d63f6, #4f46d9);
  box-shadow: 0 6px 14px rgba(79, 70, 217, 0.25);
  color: white;
  font-size: 16px;
  font-weight: 800;
`;

const BrandName = styled.span`
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.16em;
`;

const Header = styled.header` margin: 28px 0 30px; `;

const Eyebrow = styled.p`
  margin: 0 0 8px;
  color: #6860e8;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.18em;
`;

const Title = styled.h1`
  margin: 0;
  color: #151c2f;
  font-size: 26px;
  line-height: 1.35;
  letter-spacing: -0.04em;

  @media (max-width: 380px) { font-size: 23px; }
`;

const Description = styled.p`
  margin: 10px 0 0;
  color: #7a8295;
  font-size: 13px;
  line-height: 1.65;
  letter-spacing: -0.01em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 19px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #343c50;
  font-size: 13px;
  font-weight: 700;
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 15px;
  display: flex;
  color: #a0a7b8;
  pointer-events: none;
  transition: color 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.8;
  }

  ${InputBox}:focus-within & { color: #6259df; }
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 54px 0 44px;
  border: 1px solid #e4e7ef;
  border-radius: 13px;
  outline: none;
  background: #fafbfe;
  color: #222a3d;
  font: inherit;
  font-size: 13px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &::placeholder { color: #b1b7c5; }
  &:hover { border-color: #cfd3df; }
  &:focus {
    border-color: #7168ed;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(113, 104, 237, 0.1);
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 14px;
  padding: 5px;
  border: 0;
  background: transparent;
  color: #777f91;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;

  &:hover { color: #554bd6; }
  &:focus-visible { outline: 2px solid #7168ed; border-radius: 5px; }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 52px;
  margin-top: 5px;
  border: 0;
  border-radius: 13px;
  background: linear-gradient(135deg, #6c63ed 0%, #5147d5 100%);
  box-shadow: 0 12px 24px rgba(81, 71, 213, 0.24);
  color: #ffffff;
  font: inherit;
  font-size: 14px;
  font-weight: 750;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  span { font-size: 18px; transition: transform 0.2s ease; }
  &:hover { transform: translateY(-2px); box-shadow: 0 16px 28px rgba(81, 71, 213, 0.29); }
  &:hover span { transform: translateX(3px); }
  &:active { transform: translateY(0); }
  &:focus-visible { outline: 3px solid rgba(81, 71, 213, 0.25); outline-offset: 3px; }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
    transform: none;
    box-shadow: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 27px 0 13px;
  color: #a0a6b4;
  font-size: 11px;
  white-space: nowrap;

  &::before, &::after { content: ""; width: 100%; height: 1px; background: #eceef3; }
`;

const TextLink = styled(Link)`
  display: block;
  color: #5d54df;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  font-weight: 750;

  &:hover { text-decoration: underline; text-underline-offset: 3px; }
`;

const Footer = styled.p`
  position: absolute;
  bottom: 18px;
  margin: 0;
  color: #a0a6b5;
  font-size: 10px;
  letter-spacing: 0.02em;
`;

export default SignInPage;

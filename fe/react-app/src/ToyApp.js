import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogIndexPage from "./features/blog/page/BlogIndexPage";
import SignInPage from "./features/user/page/SignInPage";
import SignUpPage from "./features/user/page/SignUpPage";
import BlogWritePage from "./features/blog/page/BlogWritePage";
import BlogReadPage from "./features/blog/page/BlogReadPage";


const ToyApp = () => {
    return(
        <BrowserRouter>
            <Routes>
                {/* user */}
                <Route path="/" element={<SignUpPage/>}/>
                <Route path="/users/signIn" element={<SignInPage/>}/>
                
                {/* blog */}
                <Route path="/blog/index" element={<BlogIndexPage/>}/>
                <Route path="/blog/write" element={<BlogWritePage/>}/>
                <Route path="/blog/read/:blogId" element={<BlogReadPage/>}/>
                
                {/* blog - comment */}
            </Routes>
        </BrowserRouter>
    );
}

export default ToyApp;

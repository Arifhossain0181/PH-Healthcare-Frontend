import LoginForm from "../components/modules/auth/loginForm";
import React from "react";
interface LoginPageProps {
    searchParams?: {
        redirect?: string;
    }
}
const LoginPage = ({ searchParams }: LoginPageProps) => {
    const redirectPath = searchParams?.redirect 
    return (
        <div>
            <LoginForm redirectPath={redirectPath} />
        </div>
    );
};

export default LoginPage;

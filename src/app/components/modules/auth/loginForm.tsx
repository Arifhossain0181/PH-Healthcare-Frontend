"use client";
import { loginaction } from "@/app/commonlayout/auth(RouteGrouP)/login/_action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import ILoginPayload from "@/app/commonlayout/auth(RouteGrouP)/login/ILoginPayload";
export interface ILoginPayload {
  email: string;
  password: string;
}
import { useForm } from "node_modules/@tanstack/react-form/dist/esm/useForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { loginSchemaZod } from "@/zod/auth.validation";
import Appfield from "../../shared/form/APPField";
import React from "react";
import { Button } from "../../ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription } from "../../ui/alert";
import APPsubmittedButton from "../../shared/form/APPsubmitted-button";
const LoginForm = () => {
  const queryClient = useQueryClient();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: ILoginPayload) => {
      return await loginaction(payload);
    },
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const result = (await mutateAsync(value));
        if (result && typeof result === 'object' && 'success' in result && !result.success) {
          setServerError(result.message || "An unexpected error occurred. Please try again.");
          return;
        }
        // Debug: log tokens if present
        if (result && typeof result === 'object' && 'accessToken' in result && 'refreshToken' in result) {
          console.log('AccessToken:', result.accessToken);
          console.log('RefreshToken:', result.refreshToken);
        }
      } catch (error) {
        console.log(error);
        setServerError("An unexpected error occurred. Please try again.");
      }
    },
  });
  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="p-6 text-center">
        <CardTitle className="text-2xl font-bold mb-4">Login</CardTitle>
        <CardTitle className="text-sm text-muted-foreground mb-4 text-2xl font-bold">
          Please enter your credentials to login.
        </CardTitle>
        <CardDescription className="space-y-4 ">
          Please enter your email and password to access your account. If you
          dot have an account, you can sign up for one. If you forgot your
          password, you can reset it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          method="POST"
          action="#"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field
            name="email"
            validators={{ onChange: loginSchemaZod.shape.email.safeParseAsync }}
          >
            {(field) => (
              <Appfield
                field={field}
                label="Email"
                type="email"
                placeholder="Enter your email"
              />
            )}
          </form.Field>
          <form.Field
            name="password"
            validators={{
              onChange: loginSchemaZod.shape.password.safeParseAsync,
            }}
          >
            {(field) => (
              <Appfield
                field={field}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                aria-label={showPassword ? "Hide password" : "Show password"}
                append={
                  <Button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    variant="ghost"
                    size="icon"
                    className="text-sm text-primary"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" aria-hidden="true"></EyeOff>
                    ) : (
                      <Eye className="size-4" aria-hidden="true"></Eye>
                    )}
                  </Button>
                }
              />
            )}
          </form.Field>
          <div className="text-right mt-2 ">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline underline-offset-4"
            >
              Forgot Password?
            </Link>
          </div>
          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}
          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitted] as const}
          >
            {([canSubmit, isSubmitted]) => (
              <APPsubmittedButton
                isPending={isPending || isSubmitted}
                disable={!canSubmit && isSubmitted}
              >
                Login
              </APPsubmittedButton>
            )}
          </form.Subscribe>
        </form>
        <div className="text-center mt-4 relative my-6">
          <div className="absolute inset-0 items-center">
            <div className="w-full border-t border-gray-300">

            </div>
            <div className="relative flex justify-center text-sm"></div>
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          
        </div>
        <Button variant="outline" className="w-full"  onClick={() => {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

            //todo redirect to google auth page
            window.location.href = `${baseUrl}/auth/login/google`
        }}>
          Continue with Google
        </Button>
      </CardContent>
      <CardFooter className="justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground"> Dont have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline underline-offset-4"
            >
              Sign Up
            </Link>
        </p>
         
        
      </CardFooter>
    </Card>
  );
};
export default LoginForm;

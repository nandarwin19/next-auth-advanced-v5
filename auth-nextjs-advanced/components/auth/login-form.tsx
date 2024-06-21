import React from "react";
import { CardWrapper } from "./card-wrapper";

export default function LoginForm() {
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      Login
    </CardWrapper>
  );
}

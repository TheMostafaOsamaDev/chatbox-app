import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Register",
  description: "Create an account",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="h-screen grid place-items-center">{children}</section>
  );
}

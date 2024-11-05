"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import React from "react";

export default function RegisterPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-center mb-4">Register Form</h2>

      <form onSubmit={handleSubmit} className="w-[320px] flex flex-col gap-4">
        <div className="input-container">
          <Label>Email</Label>
          <Input type="email" required name="email" />
        </div>
        <div className="input-container">
          <Label>Password</Label>
          <Input type="password" required name="password" />
        </div>
        <div className="input-container">
          <Label>Confirm Password</Label>
          <Input type="password" required name="confirmPassword" />
        </div>

        <Button>Register</Button>

        <Button asChild variant={"secondary"}>
          <Link href={"/"}>Return Back</Link>
        </Button>
      </form>
    </div>
  );
}

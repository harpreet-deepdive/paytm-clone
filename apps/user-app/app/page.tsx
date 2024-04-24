"use client";

import { Login } from "@repo/ui/login";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  async function onSubmit(values: { phoneNumber: string; password: string }) {
    console.log(values);

    try {
      const res = await signIn("credentials", {
        redirect: true,
        phone: values.phoneNumber,
        password: values.password,
        callbackUrl: "/dashboard",
      });

      console.log(res);

      setLoading(false);
      // if (!res?.error) {
      //   router.push(callbackUrl);
      // } else {
      //   setError("Incorrect email or password");
      // }
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      setError(error);
    }
  }

  return <Login onSubmit={onSubmit} />;
}

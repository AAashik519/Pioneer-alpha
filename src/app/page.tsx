"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { MainLayout } from "../components/layout/main-layout";

import TodoPage from "../components/TodoPage/TodoPage";

export default function TodosPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (!token) {
      router.replace("/auth/signup");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (isAuthorized === null) {
    return null;
  }
  return (
    <>
      <MainLayout>
        <TodoPage />
      </MainLayout>
    </>
  );
}

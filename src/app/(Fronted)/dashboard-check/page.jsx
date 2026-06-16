"use strict";
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DashboardCheck = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const userRole = session.user.role;

      // রোল যদি admin হয় তবে ড্যাশবোর্ডে যাবে, অন্যথায় হোম পেজে
      if (userRole === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }

      // ক্লায়েন্ট সাইড স্টেট সিঙ্ক করার জন্য রিফ্রেশ
      setTimeout(() => {
        router.refresh();
      }, 100);
    }
  }, [session, status, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 animate-pulse">
          অপেক্ষা করুন...
        </p>
      </div>
    </div>
  );
};

export default DashboardCheck;

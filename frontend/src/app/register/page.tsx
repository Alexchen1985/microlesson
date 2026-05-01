"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await auth.register(phone, password);
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "注册失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">🎓</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">微课工场</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">创建账号</h1>
          <p className="text-gray-500 text-center mb-8">开始您的微课制作之旅</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                手机号
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input"
                placeholder="请输入手机号"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="请输入密码"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !rounded-xl"
            >
              {loading ? "注册中..." : "注册"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            已有账号？<Link href="/login" className="text-blue-600 font-medium hover:underline">登录</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
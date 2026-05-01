"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">微课工场</h1>
          <p className="text-xl text-blue-100 mb-8">
            面向高校教师的专业微课视频制作平台
            <br />
            替代市场 3000-4000 元/门的微课制作，降低到 399 元起
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50"
            >
              立即开始
            </Link>
            <Link
              href="/login"
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white/10"
            >
              登录
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">核心功能</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-4">🎬</div>
              <h3 className="font-semibold mb-2">视频上传</h3>
              <p className="text-gray-600">支持 MP4/MOV 格式，拖拽上传，操作简单</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-4">✍️</div>
              <h3 className="font-semibold mb-2">AI 字幕生成</h3>
              <p className="text-gray-600">Whisper 自动识别，准确率达 90%+</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-4">✨</div>
              <h3 className="font-semibold mb-2">模板包装</h3>
              <p className="text-gray-600">一键套用片头片尾，专业效果即得</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">收费方案</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-gray-500 mb-2">免费体验</div>
              <div className="text-3xl font-bold mb-4">¥0</div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>3 节视频</li>
                <li>≤2 分钟/节</li>
                <li>AI 字幕</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-2 border-blue-500">
              <div className="text-blue-600 font-semibold mb-2">单课包</div>
              <div className="text-3xl font-bold mb-4">¥799</div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>1 门微课</li>
                <li>≤20 节</li>
                <li>≤30 分钟/节</li>
                <li>AI 字幕 + 模板</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-gray-500 mb-2">套餐包</div>
              <div className="text-3xl font-bold mb-4">¥2995</div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>5 门微课</li>
                <li>约 599 元/门</li>
                <li>全部功能</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-gray-500 mb-2">高级包</div>
              <div className="text-3xl font-bold mb-4">¥3990</div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>10 门微课</li>
                <li>约 399 元/门</li>
                <li>全部功能</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        © 2026 微课工场. 面向高校教师的专业微课制作平台。
      </footer>
    </div>
  );
}
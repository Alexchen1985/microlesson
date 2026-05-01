"use client";

import { useState } from "react";
import Link from "next/link";

const features = [
  {
    icon: "🎬",
    title: "视频上传",
    desc: "支持 MP4/MOV 格式，拖拽上传，操作简单",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: "✍️",
    title: "AI 字幕生成",
    desc: "Whisper 自动识别，准确率达 90%+",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: "✨",
    title: "模板包装",
    desc: "一键套用片头片尾，专业效果即得",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: "📊",
    title: "课程管理",
    desc: "多课程统一管理，视频资产井井有条",
    color: "bg-green-50 text-green-600",
  },
];

const pricing = [
  {
    name: "免费体验",
    price: "¥0",
    features: ["3 节视频", "≤2 分钟/节", "AI 字幕"],
    highlight: false,
  },
  {
    name: "单课包",
    price: "¥799",
    features: ["1 门微课", "≤20 节", "≤30 分钟/节", "AI 字幕 + 模板"],
    highlight: true,
  },
  {
    name: "套餐包",
    price: "¥2995",
    features: ["5 门微课", "约 599 元/门", "全部功能"],
    highlight: false,
  },
  {
    name: "高级包",
    price: "¥3990",
    features: ["10 门微课", "约 399 元/门", "全部功能"],
    highlight: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🎓</span>
            </div>
            <span className="text-xl font-bold text-gray-900">微课工场</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">
              登录
            </Link>
            <Link href="/register" className="btn-primary text-sm !px-5 !py-2">
              立即开始
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🚀</span>
            <span>专为高校教师打造</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            轻松制作
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}专业微课{" "}
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            替代传统 3000-4000 元/门的微课制作服务
            <br />
            降低到 399 元起，让每个老师都能轻松出精品
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register" className="btn-primary text-lg">
              免费试用
            </Link>
            <a href="#features" className="btn-secondary text-lg">
              了解更多
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心功能</h2>
            <p className="text-gray-600">从录制到成品，一站式完成</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="feature-card text-center">
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">收费方案</h2>
            <p className="text-gray-600">选择适合您的方案</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={`pricing-card ${p.highlight ? "featured" : ""}`}
              >
                {p.highlight && (
                  <div className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">
                    推荐
                  </div>
                )}
                <div className="text-gray-500 text-sm mb-2">{p.name}</div>
                <div className="text-4xl font-bold text-gray-900 mb-6">{p.price}</div>
                <ul className="space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`mt-8 block text-center rounded-xl py-3 font-semibold transition-all ${
                    p.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  开始使用
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">准备好开始了吗？</h2>
          <p className="text-blue-100 mb-8">立即注册，免费体验 3 节视频制作</p>
          <Link href="/register" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all inline-block shadow-lg">
            立即注册 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm bg-gray-50">
        © 2026 微课工场 · 面向高校教师的专业微课制作平台
      </footer>
    </div>
  );
}
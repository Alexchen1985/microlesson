"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { courses } from "@/lib/api";

interface Course {
  id: number;
  title: string;
  description: string | null;
  video_count: number;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await courses.list() as Course[];
      setCourseList(data);
    } catch (err) {
      console.error("加载课程失败", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await courses.create(newTitle, newDesc);
      setNewTitle("");
      setNewDesc("");
      setShowCreate(false);
      loadCourses();
    } catch (err: any) {
      alert(err.message || "创建失败");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除这门课程？")) return;
    try {
      await courses.delete(id);
      loadCourses();
    } catch (err: any) {
      alert(err.message || "删除失败");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🎓</span>
            </div>
            <span className="text-xl font-bold text-gray-900">微课工场</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">欢迎使用</span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100"
            >
              退出
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">我的课程</h2>
            <p className="text-gray-500 text-sm mt-1">管理您的微课视频</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="btn-primary"
          >
            + 创建新课程
          </button>
        </div>

        {/* Create Modal */}
        {showCreate && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <h3 className="font-semibold text-lg text-gray-900 mb-6">创建新课程</h3>
            <form onSubmit={handleCreate} className="space-y-5">
              <div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="课程名称"
                  className="input"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="课程描述（可选）"
                  className="input"
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary">
                  创建
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="btn-outline"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Course List */}
        {courseList.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-500 mb-4">还没有课程</p>
            <button
              onClick={() => setShowCreate(true)}
              className="text-blue-600 font-medium hover:underline"
            >
              创建第一个课程
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseList.map((course) => (
              <div key={course.id} className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                    {course.video_count} 节视频
                  </div>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {course.description || "暂无描述"}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    {new Date(course.created_at).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/project/${course.id}`}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    管理 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
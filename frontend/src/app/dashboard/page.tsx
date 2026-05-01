"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { courses, auth } from "@/lib/api";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">微课工场</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">欢迎使用</span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              退出
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">我的课程</h2>
          <button
            onClick={() => setShowCreate(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            创建新课程
          </button>
        </div>

        {/* Create Modal */}
        {showCreate && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="font-semibold mb-4">创建新课程</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="课程名称"
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="课程描述（可选）"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  创建
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Course List */}
        {courseList.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <p className="text-gray-500 mb-4">还没有课程</p>
            <button
              onClick={() => setShowCreate(true)}
              className="text-blue-600 hover:underline"
            >
              创建第一个课程
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseList.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {course.description || "暂无描述"}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {course.video_count} 节视频
                  </span>
                  <div className="flex gap-2">
                    <Link
                      href={`/project/${course.id}`}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      管理
                    </Link>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { courses, videos } from "@/lib/api";

interface Video {
  id: number;
  title: string;
  status: string;
  original_url: string | null;
  created_at: string;
}

interface Course {
  id: number;
  title: string;
  description: string | null;
  video_count: number;
}

export default function ProjectPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = Number(params.id);
  
  const [course, setCourse] = useState<Course | null>(null);
  const [videoList, setVideoList] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    loadData();
  }, [courseId]);

  const loadData = async () => {
    try {
      const courseData = await courses.get(courseId) as Course;
      setCourse(courseData);
      // TODO: 加载视频列表
    } catch (err) {
      console.error("加载失败", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    
    setUploading(true);
    try {
      await videos.upload(courseId, uploadTitle, uploadFile);
      setUploadTitle("");
      setUploadFile(null);
      loadData();
    } catch (err: any) {
      alert(err.message || "上传失败");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">课程不存在</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
              ← 返回
            </Link>
            <h1 className="text-xl font-bold">{course.title}</h1>
          </div>
          <Link href="/dashboard" className="text-sm text-gray-500">
            工作台
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="font-semibold mb-2">{course.title}</h2>
          <p className="text-sm text-gray-500">{course.description || "暂无描述"}</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="font-semibold mb-4">上传视频</h3>
          <form onSubmit={handleUpload} className="space-y-4">
            <input
              type="text"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              placeholder="视频标题"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="file"
              accept="video/mp4,video/mov"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              className="w-full"
              required
            />
            <button
              type="submit"
              disabled={uploading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? "上传中..." : "上传"}
            </button>
          </form>
        </div>

        {/* Video List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">视频列表</h3>
          {videoList.length === 0 ? (
            <p className="text-gray-400 text-center py-8">暂无视频</p>
          ) : (
            <div className="space-y-4">
              {videoList.map((video) => (
                <div key={video.id} className="flex justify-between items-center p-4 border rounded">
                  <div>
                    <div className="font-medium">{video.title}</div>
                    <div className="text-sm text-gray-400">
                      状态: {video.status} | 上传于: {new Date(video.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 text-sm hover:underline">
                      编辑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
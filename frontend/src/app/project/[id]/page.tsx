"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { courses, videos as videoApi } from "@/lib/api";

interface Video {
  id: number;
  title: string;
  status: string;
  original_url: string | null;
  processed_url: string | null;
  subtitle_url: string | null;
  template_id: number | null;
  created_at: string;
}

interface Course {
  id: number;
  title: string;
  description: string | null;
  video_count: number;
}

export default function ProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
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
      await videoApi.upload(courseId, uploadTitle, uploadFile);
      setUploadTitle("");
      setUploadFile(null);
      loadData();
    } catch (err: any) {
      alert(err.message || "上传失败");
    } finally {
      setUploading(false);
    }
  };

  const handleTranscribe = async (videoId: number) => {
    try {
      await videoApi.transcribe(videoId);
      alert("字幕识别任务已提交");
      loadData();
    } catch (err: any) {
      alert(err.message || "提交失败");
    }
  };

  const handleApplyTemplate = async (videoId: number, templateId: number) => {
    try {
      await videoApi.applyTemplate(videoId, templateId);
      alert("模板已套用");
      loadData();
    } catch (err: any) {
      alert(err.message || "操作失败");
    }
  };

  const handleExport = async (videoId: number) => {
    try {
      await videoApi.export(videoId);
      alert("导出任务已提交");
      loadData();
    } catch (err: any) {
      alert(err.message || "导出失败");
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
          <h3 className="font-semibold mb-4">📤 上传视频</h3>
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
          <h3 className="font-semibold mb-4">📹 视频列表</h3>
          {videoList.length === 0 ? (
            <p className="text-gray-400 text-center py-8">暂无视频，请先上传</p>
          ) : (
            <div className="space-y-4">
              {videoList.map((video) => (
                <div key={video.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-lg">{video.title}</div>
                      <div className="text-sm text-gray-400 mt-1">
                        上传于: {new Date(video.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      video.status === 'completed' ? 'bg-green-100 text-green-700' :
                      video.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                      video.status === 'exporting' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {video.status}
                    </span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 flex-wrap">
                    <button
                      onClick={() => handleTranscribe(video.id)}
                      disabled={video.status !== 'uploaded'}
                      className="bg-purple-50 text-purple-700 px-3 py-1 rounded text-sm hover:bg-purple-100 disabled:opacity-50"
                    >
                      ✍️ AI字幕
                    </button>
                    <button
                      onClick={() => handleApplyTemplate(video.id, 1)}
                      disabled={video.status === 'processing'}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-100 disabled:opacity-50"
                    >
                      ✨ 套模板
                    </button>
                    <button
                      onClick={() => handleExport(video.id)}
                      disabled={video.status !== 'processed'}
                      className="bg-green-50 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-100 disabled:opacity-50"
                    >
                      📥 导出
                    </button>
                  </div>

                  {/* Status Progress */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <span className={video.original_url ? 'text-green-600' : 'text-gray-300'}>●</span>
                    <span>上传</span>
                    <span>→</span>
                    <span className={video.subtitle_url ? 'text-green-600' : 'text-gray-300'}>●</span>
                    <span>字幕</span>
                    <span>→</span>
                    <span className={video.processed_url ? 'text-green-600' : 'text-gray-300'}>●</span>
                    <span>模板</span>
                    <span>→</span>
                    <span className={video.status === 'completed' ? 'text-green-600' : 'text-gray-300'}>●</span>
                    <span>完成</span>
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
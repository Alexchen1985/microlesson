# 微课工场 (MicroKeGC) — 产品规格说明书

> 本文件是唯一真实来源，Claude Code 必须严格遵守。

---

## 1. 产品概述

- **产品名称：** 微课工场
- **一句话描述：** 面向高校教师的专业微课视频制作平台
- **目标用户：** 高校教师
- **核心价值：** 替代市场3000-4000元/门的微课制作，降低到399元起
- **当前阶段：** MVP

---

## 2. 产品路线图

### 路径1（核心）：录制 → 上传 → AI加工 → 精品微课
1. 老师录制讲解视频
2. 上传到平台
3. AI自动处理（字幕+包装）
4. 导出精品微课

### 路径2（扩展）：输入主题 → AI生成PPT/案例视频

---

## 3. MVP功能范围

### P0（必须）
- 用户注册/登录（手机号）
- 课程管理（创建/列表/删除）
- 视频上传（MP4/MOV）
- AI字幕生成（Whisper）
- 模板包装（片头/片尾）
- 视频导出

### P1（第二版）
- 内置录制（摄像头+提词器）
- 字幕编辑器
- AI生成PPT

### P2（第三版）
- 封面生成
- 支付接入

---

## 4. 会员收费体系

| 套餐 | 内容 | 定价 |
|------|------|------|
| 单课包 | 1门微课（≤20节，≤30分钟/节） | 799元 |
| 套餐包 | 5门微课 | 2995元 |
| 高级包 | 10门微课 | 3990元 |
| 免费体验 | 3节，≤2分钟/节 | 0元 |

---

## 5. 技术架构

### 前端
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS
- React

### 后端
- Python FastAPI
- PostgreSQL
- FFmpeg（视频处理）
- Whisper（AI字幕）

### 存储
- 本地存储（MVP）
- 阿里云OSS（后续）

---

## 6. 页面结构

```
/                    # 官网首页
/login               # 登录
/register            # 注册
/dashboard           # 工作台
/project/[id]        # 项目详情
/project/[id]/upload # 上传
/project/[id]/subtitle # 字幕
/project/[id]/template # 模板
/project/[id]/export   # 导出
```

---

## 7. 数据库模型

### User
- id, phone, password_hash, created_at

### Member
- id, user_id, plan_type, video_remaining, video_limit

### Course
- id, user_id, title, description, video_count

### Video
- id, course_id, title, original_url, subtitle_url, template_id, duration, status

---

## 8. API 设计

### 认证
- `POST /api/auth/register` — 注册
- `POST /api/auth/login` — 登录
- `GET /api/auth/me` — 当前用户

### 课程
- `GET /api/courses` — 列表
- `POST /api/courses` — 创建
- `GET /api/courses/[id]` — 详情
- `DELETE /api/courses/[id]` — 删除

### 视频
- `POST /api/videos/upload` — 上传
- `POST /api/videos/[id]/transcribe` — AI字幕
- `POST /api/videos/[id]/apply-template` — 套模板
- `POST /api/videos/[id]/export` — 导出

---

## 9. MVP里程碑

| 阶段 | 目标 |
|------|------|
| M1 | 基础框架 + 用户系统 |
| M2 | 视频上传 → 字幕 → 模板 → 导出 |

---

*最后更新：2026-05-01*
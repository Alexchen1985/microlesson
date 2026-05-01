# CLAUDE.md — 微课工场

严格遵循 SPEC.md 开发。

## 项目结构
```
backend/   # FastAPI
frontend/  # Next.js 15
```

## 开发约定
- 代码必须能跑，优先完成再优化
- API返回格式：`{code, message, data}`
- 所有配置通过 .env 管理

## 当前阶段：M1（基础框架）
- [x] 后端项目结构
- [x] 用户注册/登录API
- [x] 课程CRUD API
- [x] 视频上传API（预留）
- [ ] 前端页面
- [ ] AI字幕对接
- [ ] 模板包装
- [ ] 视频导出

---

*最后更新：2026-05-01*
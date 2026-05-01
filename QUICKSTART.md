# 微课工场 - 快速启动指南

## 1. 创建数据库

```bash
createdb microke
```

如果 `createdb` 命令不存在，先安装 PostgreSQL：
```bash
brew install postgresql
brew services start postgresql
createdb microke
```

## 2. 启动后端

```bash
cd ~/microlesson/microlesson/backend
chmod +x start.sh
./start.sh
```

看到 `Uvicorn running on http://0.0.0.0:8000` 即启动成功。

## 3. 启动前端（新终端）

```bash
cd ~/microlesson/microlesson/frontend
npm run dev
```

看到 `Ready in Xms` 即启动成功。

## 4. 访问系统

打开浏览器访问：http://localhost:3000

1. **注册账号** — 使用手机号注册
2. **登录** — 注册后自动登录
3. **创建课程** — 在工作台创建第一个课程
4. **上传视频** — 进入课程，上传 MP4/MOV 视频

## 5. 测试 API（可选）

```bash
# 注册
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"phone": "13800138000", "password": "test123"}'

# 登录
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone": "13800138000", "password": "test123"}'
```

## 常见问题

**Q: 数据库连接失败**
A: 确保 PostgreSQL 运行中：`brew services start postgresql`

**Q: 前端无法访问后端 API**
A: 确保后端在 8000 端口运行，且 `.env.local` 配置正确

**Q: 上传视频失败**
A: 检查 token 是否有效，重新登录获取新 token

---

*最后更新：2026-05-01*
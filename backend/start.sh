#!/bin/bash
# 启动微课工场后端服务

cd "$(dirname "$0")"

# 创建虚拟环境（如果不存在）
if [ ! -d "venv" ]; then
    echo "创建虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
source venv/bin/activate

# 安装依赖（如果需要）
pip install -r requirements.txt -q

# 检查数据库连接
echo "检查数据库..."
python -c "from app.core.database import engine; engine.connect()" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "❌ 数据库连接失败，请确保 PostgreSQL 运行中且数据库 'microke' 已创建"
    echo "   创建数据库命令: createdb microke"
    exit 1
fi

# 启动服务
echo "🚀 启动后端服务..."
uvicorn app.main:app --reload --port 8000 --host 0.0.0.0
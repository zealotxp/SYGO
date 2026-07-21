#!/bin/bash
# 自动提交脚本：bump 版本号 + 更新 CHANGELOG + commit + push 到 GitHub
# 用法: ./auto-commit.sh "本次改动说明"
set -e

PROJ_DIR="/d/Save/WorkBuddy/2026-05-22-15-24-47/shangyao-go"
cd "$PROJ_DIR"

MSG="${1:-自动同步更新}"
DATE=$(date +%Y-%m-%d)

# 1. 同步远程
git fetch origin main

# 2. 检测是否有改动
if ! git status --porcelain | grep -q .; then
  echo "无改动，跳过提交"
  exit 0
fi

# 3. 拉取远程并 rebase（避免产生 merge commit）
if ! git pull --rebase origin main 2>&1; then
  echo "rebase 冲突，请手动解决后再提交"
  exit 1
fi

# 4. 再次检测（rebase 后可能无改动）
if ! git status --porcelain | grep -q .; then
  echo "rebase 后无改动，跳过提交"
  exit 0
fi

# 5. bump 版本号 (语义化版本 patch +1)
if [ -f package.json ]; then
  VER=$(grep '"version"' package.json | head -1 | sed -E 's/.*"version": *"([^"]+)".*/\1/')
else
  VER="1.0.0"
fi
IFS='.' read -r MAJOR MINOR PATCH <<< "$VER"
PATCH=$((PATCH + 1))
NEWVER="$MAJOR.$MINOR.$PATCH"

# 写回 package.json
if [ -f package.json ]; then
  sed -i -E "s/(\"version\": *\")[^\"]+(\")/\1$NEWVER\2/" package.json
fi

# 6. 更新 CHANGELOG.md（在顶部插入新条目）
TMP=$(mktemp)
{
  echo "# 更新记录"
  echo ""
  echo "## [$NEWVER] - $DATE"
  echo "- $MSG"
  echo ""
  tail -n +3 CHANGELOG.md 2>/dev/null || true
} > "$TMP"
mv "$TMP" CHANGELOG.md

# 7. 提交并推送
git add -A
git commit -m "v$NEWVER: $MSG"
git push origin main

echo "✅ 已提交 v$NEWVER 并推送到 GitHub"
echo "🔗 预览: https://zealotxp.github.io/SYGO/"

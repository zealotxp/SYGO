#!/bin/bash
# 自动提交脚本：bump 版本号 + 更新 CHANGELOG + commit + push 到 GitHub
# 用法: ./auto-commit.sh "本次改动说明"
set -e

PROJ_DIR="/d/Save/WorkBuddy/2026-05-22-15-24-47/shangyao-go"
cd "$PROJ_DIR"

MSG="${1:-自动同步更新}"
DATE=$(date +%Y-%m-%d)

# 1. 同步远程引用
git fetch origin main

# 2. 若有未提交改动 -> 先提交（bump 版本 + 更新 CHANGELOG）
if git status --porcelain | grep -q .; then
  git add -A

  # bump 版本号 (语义化版本 patch +1)
  if [ -f package.json ]; then
    VER=$(grep '"version"' package.json | head -1 | sed -E 's/.*"version": *"([^"]+)".*/\1/')
  else
    VER="1.0.0"
  fi
  IFS='.' read -r MAJOR MINOR PATCH <<< "$VER"
  PATCH=$((PATCH + 1))
  NEWVER="$MAJOR.$MINOR.$PATCH"

  if [ -f package.json ]; then
    sed -i -E "s/(\"version\": *\")[^\"]+(\")/\1$NEWVER\2/" package.json
  fi

  # 更新 CHANGELOG.md（在顶部插入新条目）
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

  git add -A
  git commit -m "v$NEWVER: $MSG"
  echo "已创建提交 v$NEWVER"
fi

# 3. 推送（先把本地 commit rebase 到远程之上，避免 non-fast-forward）
if [ -n "$(git rev-list origin/main..HEAD 2>/dev/null)" ]; then
  if ! git pull --rebase origin main 2>&1; then
    echo "rebase 冲突，请手动解决后再提交"
    exit 1
  fi
  git push origin main
  CURVER=$(grep '"version"' package.json 2>/dev/null | head -1 | sed -E 's/.*"version": *"([^"]+)".*/\1/')
  echo "✅ 已推送到 GitHub (当前版本: ${CURVER:-未知})"
else
  echo "无改动，跳过提交"
fi
echo "🔗 预览: https://zealotxp.github.io/SYGO/"

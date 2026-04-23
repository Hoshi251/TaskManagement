---
name: start-servers
description: バックエンド（port 8080）とフロントエンド（port 5173）のサーバーを起動する。ポート競合が発生した場合は競合プロセスを停止してから指定ポートで起動する。
allowed-tools: Bash(netstat *) Bash(taskkill *) Bash(docker *) Bash(npm *)
---

## サーバー起動ルール

以下のポートはアプリで固定されており、**変更してはいけない**。

| サービス | ポート |
|----------|--------|
| バックエンド（Spring Boot） | 8080 |
| フロントエンド（Vite） | 5173 |
| PostgreSQL | 5432 |

## 起動手順

### Step 1: ポート競合チェックと解消

各ポートについて競合プロセスが存在する場合は、代替ポートへの変更は絶対に行わず、競合プロセスを強制停止する。

```bash
# 使用中の PID を確認（Windows）
netstat -ano | findstr ":<PORT>" | findstr "LISTENING"

# プロセスを強制停止
taskkill /PID <PID> /F
```

チェック順序: 5432（postgres） → 8080（backend） → 5173（frontend）

### Step 2: バックエンド起動

```bash
docker compose -f "<プロジェクトルート>/docker-compose.yml" up -d postgres backend
```

コンテナの起動を確認してから次へ進む。

### Step 3: フロントエンド起動

```bash
cd <プロジェクトルート>/frontend && npm run dev
```

バックグラウンドで起動し、`http://localhost:5173` が 200 を返すことを確認する。

### Step 4: ブラウザを開く

```bash
start http://localhost:5173
```

## 禁止事項

- `--port 8081` など別ポートを指定して起動すること
- ポート競合を無視して別ポートで動作確認すること
- 競合確認をスキップすること

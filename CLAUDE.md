# CLAUDE.md — Claude Code が厳守すべき開発ルール

## 1. 作業開始前の必須手順

**何らかの実装・修正・ドキュメント作業を始める前に、必ず GitHub Issue を作成してから作業を開始すること。**

Issue 作成コマンド例:
```bash
gh issue create \
  --title "feat: ボード一覧APIの実装" \
  --label "feat" \
  --body "## 概要\n...\n\n## 完了条件\n- [ ] ..."
```

---

## 2. ブランチ命名規則

```
<type>/issue-<番号>-<簡潔な説明（英語）>
```

### type の種類

| type | 用途 |
|------|------|
| `feat` | 新機能追加 |
| `fix` | バグ修正 |
| `docs` | ドキュメント変更のみ |
| `chore` | ビルド設定・依存関係・環境整備 |
| `refactor` | リファクタリング（機能変更なし） |
| `test` | テスト追加・修正 |

### 具体例

```
feat/issue-2-board-list-api
fix/issue-3-modal-button-not-working
docs/issue-4-update-readme
chore/issue-1-setup-github-rules
```

ブランチ作成コマンド:
```bash
git switch -c feat/issue-2-board-list-api
```

---

## 3. コミットメッセージ規則

```
<type>: <日本語で内容を簡潔に説明>
```

説明は**日本語**で書く。type 部分は英語のまま。

### 良い例
```
feat: ボード一覧 API（GET /api/boards）を実装
fix: モーダルの保存ボタンが押下できないバグを修正
docs: README にローカル起動手順を追加
chore: Flyway マイグレーションスクリプトを追加
refactor: BoardService のロジックをメソッド分割
test: BoardController の統合テストを追加
```

### 禁止事項
- `update:` `change:` など非標準 type の使用
- type 以外の部分を英語で書くこと
- 説明なしのコミット（例：`feat:` のみ）

---

## 4. main ブランチへの直接プッシュ禁止

- `main` ブランチへの直接コミット・プッシュは**絶対に禁止**
- すべての変更は必ずフィーチャーブランチを作成し、**PR 経由でマージ**すること
- 誤ってローカルの main にコミットした場合は `git reset` で巻き戻してから作業すること

---

## 5. プルリクエスト（PR）作成ルール

### PR タイトル規則
```
<type>: <日本語で内容を簡潔に説明> (close #<Issue番号>)
```

例:
```
feat: ボード一覧 API を実装 (close #2)
fix: モーダルの保存ボタンが効かないバグを修正 (close #3)
```

### PR 作成コマンド
```bash
gh pr create \
  --title "feat: ボード一覧 API を実装 (close #2)" \
  --base main \
  --head feat/issue-2-board-list-api
```

### PR マージ・後処理
```bash
# マージ後にブランチを削除する
gh pr merge --squash --delete-branch
```

---

## 6. 全体ワークフロー（チェックリスト）

1. [ ] `gh issue create` で Issue を作成する
2. [ ] Issue 番号を確認する
3. [ ] `git switch -c <type>/issue-<番号>-<説明>` でブランチを作成する
4. [ ] 実装・修正を行う
5. [ ] `git commit -m "<type>: <日本語説明>"` でコミットする
6. [ ] `git push origin <ブランチ名>` でプッシュする
7. [ ] `gh pr create` で PR を作成する
8. [ ] PR をマージし、ブランチを削除する
9. [ ] Issue が自動クローズされていることを確認する

---

## 7. 技術スタック（参考）

| 区分 | 技術 |
|------|------|
| バックエンド | Java 21 + Spring Boot 3.x + Spring Data JPA + Gradle |
| フロントエンド | React 18 + Vite 5 + TypeScript 5 + Zustand + Tailwind CSS |
| データベース | PostgreSQL 16 + Flyway |
| インフラ | Docker / Docker Compose |

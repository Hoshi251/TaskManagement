-- テストデータ投入
-- Board
INSERT INTO boards (title, position) VALUES
    ('開発タスク', 0),
    ('学習メモ',   1);

-- List（Board 1: 開発タスク）
INSERT INTO lists (board_id, title, position) VALUES
    (1, 'TODO',      0),
    (1, '進行中',    1),
    (1, '完了',      2);

-- List（Board 2: 学習メモ）
INSERT INTO lists (board_id, title, position) VALUES
    (2, 'インプット',  0),
    (2, 'アウトプット', 1);

-- Card（List 1: TODO）
INSERT INTO cards (list_id, title, description, position) VALUES
    (1, 'ボード一覧APIの実装',      'GET /api/boards を実装する',            0),
    (1, 'カード移動APIの実装',      'PATCH /api/cards/{id}/move を実装する', 1),
    (1, 'フロントエンド環境構築',    'Vite + React + TypeScript のセットアップ', 2);

-- Card（List 2: 進行中）
INSERT INTO cards (list_id, title, description, position) VALUES
    (2, 'READ APIの実装',  'GET エンドポイントを実装中', 0);

-- Card（List 3: 完了）
INSERT INTO cards (list_id, title, description, position) VALUES
    (3, 'Spring Boot 雛形作成',  'Spring Initializr でプロジェクトを生成した', 0),
    (3, 'DB設計',                 'boards / lists / cards テーブルを定義した',  1);

-- Card（List 4: インプット）
INSERT INTO cards (list_id, title, description, position) VALUES
    (4, 'Spring Data JPA 学習', '@OneToMany / @ManyToOne の使い方を学んだ', 0),
    (4, 'Flyway 学習',          'マイグレーションファイルの命名規則を学んだ', 1);

-- Card（List 5: アウトプット）
INSERT INTO cards (list_id, title, description, position) VALUES
    (5, 'Qiita 記事執筆', 'Spring Boot + PostgreSQL の環境構築手順をまとめる', 0);

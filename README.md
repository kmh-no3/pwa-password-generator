# PWA Password Generator

セキュアなパスワード生成アプリケーション - Progressive Web App (PWA)対応

## 🌐 ライブデモ

**GitHub Pages**: https://yourusername.github.io/pwa-password-generator

## 🚀 機能

### 🔐 セキュアなパスワード生成
- **WebCrypto API**を使用した暗号学的に安全な乱数生成
- 8-64文字の長さ調整
- 大文字・小文字・数字・記号の選択可能
- パスワード強度の5段階評価

### 📋 パスワード管理
- ワンクリックでクリップボードにコピー
- パスワード履歴機能（最新10件）
- 履歴からの再コピー・削除機能
- ローカルストレージでの安全な保存

### 📱 PWA機能
- オフライン対応
- ホーム画面に追加可能
- ネイティブアプリのような体験
- レスポンシブデザイン

### 🎨 UI/UX
- モダンで美しいインターフェース
- ダークモード対応
- レスポンシブデザイン
- アクセシビリティ対応

## 🛠️ 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **ビルドツール**: Vite
- **PWA**: vite-plugin-pwa
- **スタイリング**: CSS3 (カスタムスタイル)
- **暗号化**: WebCrypto API
- **状態管理**: React Hooks

## 📦 インストール

```bash
# リポジトリをクローン
git clone https://github.com/kmh-no3/pwa-password-generator.git
cd pwa-password-generator

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

## 🚀 使用方法

1. **開発サーバー起動**
   ```bash
   npm run dev
   ```

2. **ブラウザでアクセス**
   - `http://localhost:3001` にアクセス

3. **パスワード生成**
   - 「🔄 新しいパスワードを生成」ボタンをクリック
   - スライダーで長さを調整
   - チェックボックスで文字種を選択

4. **パスワードコピー**
   - 「📋 コピー」ボタンでクリップボードにコピー

5. **履歴管理**
   - 「📋 パスワード履歴」で過去のパスワードを確認
   - 個別削除や全履歴クリアが可能

## 🔧 ビルド

```bash
# 本番用ビルド
npm run build

# プレビュー
npm run preview
```

## 🚀 GitHub Pagesへのデプロイ

### 自動デプロイ（推奨）

1. **GitHubリポジトリの設定**
   - Settings > Pages > Source を "GitHub Actions" に設定

2. **mainブランチにプッシュ**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

3. **自動デプロイ**
   - GitHub Actionsが自動的にビルドとデプロイを実行
   - 数分後に `https://yourusername.github.io/pwa-password-generator` でアクセス可能

### 手動デプロイ

```bash
# 依存関係をインストール
npm install

# デプロイ
npm run deploy
```

### 設定のカスタマイズ

`package.json`の`homepage`フィールドを自分のGitHubユーザー名に変更：

```json
{
  "homepage": "https://yourusername.github.io/pwa-password-generator"
}
```

## 📱 PWAとしてインストール

1. ブラウザでアプリにアクセス
2. アドレスバーの「インストール」アイコンをクリック
3. または、メニューから「ホーム画面に追加」を選択

## 🔒 セキュリティ

- **WebCrypto API**: 暗号学的に安全な乱数生成
- **ローカルストレージ**: パスワード履歴は外部に送信されません
- **HTTPS対応**: 本番環境では安全な通信
- **オフライン動作**: インターネット接続不要

## 🎯 今後の予定

- [ ] パスワード強度の詳細分析
- [ ] カスタム文字セットの追加
- [ ] パスワードのエクスポート機能
- [ ] 複数言語対応
- [ ] テーマカスタマイズ

## 📄 ライセンス

MIT License

## 👨‍💻 作者

Hosoda Kenji

## 🔗 リンク

- **GitHub**: https://github.com/kmh-no3/pwa-password-generator
- **デモ**: http://localhost:3001 (開発環境)
- **ポートフォリオ**: https://kenji-hub.vercel.app/works 
# PWA Password Generator

セキュアなパスワード生成アプリケーション - Progressive Web App (PWA)対応

## 🌐 ライブデモ

**GitHub Pages**: https://kmh-no3.github.io/pwa-password-generator

## 🚀 機能

### 🔐 セキュアなパスワード生成
- **WebCrypto API**を使用した暗号学的に安全な乱数生成
- 8-64文字の長さ調整
- 大文字・小文字・数字・記号の選択可能
- パスワード強度の5段階評価（弱い〜最強）

### 📋 パスワード管理
- ワンクリックでクリップボードにコピー
- パスワード履歴機能（最新10件）
- 履歴からの再コピー・削除機能
- ローカルストレージでの安全な保存
- 個別のコピーボタン状態管理

### ⚙️ 設定管理
- パスワード設定の表示/非表示切り替え
- 履歴の表示/非表示切り替え
- 直感的なトグルUI

### 📱 PWA機能
- オフライン対応
- ホーム画面に追加可能
- ネイティブアプリのような体験
- レスポンシブデザイン

### 🎨 UI/UX
- 目に優しいグラデーション背景
- ダークモード対応
- レスポンシブデザイン
- アクセシビリティ対応
- ボタン間隔の最適化
- モバイルフレンドリーなデザイン

## 🛠️ 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **ビルドツール**: Vite
- **PWA**: vite-plugin-pwa
- **スタイリング**: CSS3 (カスタムスタイル)
- **暗号化**: WebCrypto API
- **状態管理**: React Hooks
- **デプロイ**: GitHub Actions + GitHub Pages

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
   - 「⚙️ パスワード設定」で詳細設定を調整
   - スライダーで長さを調整（8-64文字）
   - チェックボックスで文字種を選択

4. **パスワードコピー**
   - 「📋 コピー」ボタンでクリップボードにコピー
   - コピー成功時は「✓ コピー済み」と表示

5. **履歴管理**
   - 「📋 パスワード履歴」で過去のパスワードを確認
   - 個別のコピー・削除ボタン
   - 全履歴クリア機能

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
   git commit -m "Update deployment"
   git push origin main
   ```

3. **自動デプロイ**
   - GitHub Actionsが自動的にビルドとデプロイを実行
   - 数分後に `https://kmh-no3.github.io/pwa-password-generator` でアクセス可能

### 手動デプロイ

```bash
# 依存関係をインストール
npm install

# デプロイ
npm run deploy
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
- [ ] パスワード生成履歴の統計表示

## 📄 ライセンス

MIT License

## 👨‍💻 作者

Hosoda Kenji

## 🔗 リンク

- **GitHub**: https://github.com/kmh-no3/pwa-password-generator
- **デモ**: https://kmh-no3.github.io/pwa-password-generator
- **ポートフォリオ**: https://kenji-hub.vercel.app/works 
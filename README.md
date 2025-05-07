# Alex Crypto Bot

這是一個使用 Next.js 和 TypeScript 開發的加密貨幣交易機器人專案。

## 功能特點

- 使用 Next.js 15.0.3 框架
- 採用 TypeScript 進行開發
- 整合 Tailwind CSS 進行樣式設計
- 使用 React Hook Form 處理表單
- 整合技術分析指標庫 (technicalindicators)
- 現代化的 UI 組件 (使用 Radix UI)

## 技術棧

- **前端框架**: Next.js 15.0.3
- **程式語言**: TypeScript
- **UI 框架**: 
  - Tailwind CSS
  - Radix UI 組件
- **表單處理**: React Hook Form
- **驗證**: Zod
- **技術分析**: technicalindicators

## 開始使用

### 前置需求

- Node.js (建議使用最新的 LTS 版本)
- Yarn 套件管理器

### 安裝步驟

1. 克隆專案
```bash
git clone [repository-url]
cd alex-crypto-bot
```

2. 安裝依賴
```bash
yarn install
```

3. 啟動開發伺服器
```bash
yarn dev
```

4. 開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 其他可用指令

- `yarn build` - 建置生產版本
- `yarn start` - 啟動生產伺服器
- `yarn lint` - 執行程式碼檢查

## 專案結構

```
alex-crypto-bot/
├── app/              # Next.js 應用程式目錄
├── components/       # React 組件
├── hooks/           # 自定義 React Hooks
├── interfaces/      # TypeScript 介面定義
├── lib/             # 工具函數和通用程式碼
├── pages/           # 頁面組件
├── public/          # 靜態資源
└── services/        # API 服務和外部整合
```

## 開發指南

- 使用 TypeScript 進行開發
- 遵循 ESLint 規範
- 使用 Tailwind CSS 進行樣式設計
- 組件開發遵循 React 最佳實踐

## 授權

[授權類型] - 詳見 LICENSE 文件

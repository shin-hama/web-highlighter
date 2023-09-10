# Readme

## 開発用コマンド

### DB の更新

Push コマンドはマイグレーションを作らないコマンド。
プロトタイピング中は基本これで OK

```bash
pnpm exec prisma db push
```

## デプロイ

```bash
pnpm exec prisma migrate deploy
```

### reset

```bash
pnpm exec prisma migrate reset
```

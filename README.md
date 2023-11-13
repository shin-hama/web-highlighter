# Web Highlighter

## Deploy

### web app

Vercel にデプロイしているので main ブランチにマージすれば自動でデプロイされる。

### database

database は [PlanetScale](https://planetscale.com/) を使っている。
PlanetScale で DB の変更をデプロイする際には、GitHub の PR を使ったフローと同じような作業が必要。

まず staging ブランチに DB の変更を Push。
そして DB の変更を Push する。

```sh
pscale connect web-highlighter staging --port 3309
pnpm db:push
```

Prisma + PlanetScale を使うときは [migrate ではなく push を使うことが推奨されている](https://planetscale.com/docs/prisma/prisma-quickstart#:~:text=The%20recommended%20workflow%20with%20using%20Prisma%20alongside%20PlanetScale%20is%20to%20use%20prisma%20db%20push%20instead%20of%20prisma%20migrate.%20You%20can%20read%20more%20about%20prisma%20db%20push%20here.)

> The recommended workflow with using Prisma alongside PlanetScale is to use prisma db push instead of prisma migrate. You can read more about prisma db push here.

Push が完了したら PlanetScale のダッシュボード上で変更を確認して、 Deploy Request を作成する

<https://app.planetscale.com/htysivista/web-highlighter/staging>

Deploy Request 上で Deploy を実行すると、ダウンタイム無しで DB のマイグレーションが実行される。
こんな感じで PlanetScale 上でマイグレーションを管理する仕組みが整っているため、Prisma のマイグレーションは使う必要がない。

### browser extension

GitHub Actions にデプロイ用のコマンドを用意した
現在は手動で実行する必要がある

<https://github.com/shin-hama/web-highlighter/actions/workflows/publish-browser.yml>

ストアのリンクはこちら

- [Chrome](https://chrome.google.com/webstore/detail/web-highlighter/fjphbbbplmoegekelnhpkbkilpjdghdi)

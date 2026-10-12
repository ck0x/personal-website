# Personal Website

Source for my personal site — a small React + TypeScript app built with Vite and deployed as static assets on Cloudflare Workers.

## Development

```sh
bun install
bun dev          # start the dev server
bun run build    # type-check and build to dist/
bun run lint
```

## ETH feed

The sidebar shows the latest Ethereum mainnet blocks. It uses the public
[PublicNode](https://ethereum-rpc.publicnode.com) RPC by default. To use Etherscan
instead, set `VITE_ETHERSCAN_API_KEY` in `.env.local` — note that `VITE_` variables
are bundled into the client, so only use a free key.

## Deploy

```sh
bun run build && bunx wrangler deploy
```

import type { NextConfig } from 'next'
import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

const config: NextConfig = {
  reactStrictMode: true,
  webpack(cfg, { isServer }) {
    if (!isServer) {
      cfg.resolve.fallback = {
        ...cfg.resolve.fallback,
        buffer: 'buffer/',
        string_decoder: 'string_decoder',
        events: 'events/',
        stream: false,
        fs: false,
        path: false,
        os: false,
        crypto: false,
      }
      cfg.resolve.alias = {
        ...cfg.resolve.alias,
        'node:buffer': 'buffer/',
        'node:string_decoder': 'string_decoder',
        'node:events': 'events/',
      }
    }
    return cfg
  },
}

export default withMDX(config)

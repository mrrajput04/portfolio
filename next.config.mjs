let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [],
    unoptimized: false,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

function mergeConfig(baseConfig, userConfig) {
  if (!userConfig || !userConfig.default) {
    return baseConfig
  }

  const merged = { ...baseConfig }
  const userConfigObj = userConfig.default

  // Deep merge for images
  if (userConfigObj.images) {
    merged.images = { 
      ...merged.images, 
      ...userConfigObj.images
    }
  }

  // Merge experimental features
  if (userConfigObj.experimental) {
    merged.experimental = { 
      ...merged.experimental, 
      ...userConfigObj.experimental
    }
  }

  return merged
}

export default mergeConfig(nextConfig, userConfig)

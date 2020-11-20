// vite.config.ts
import { UserConfig } from 'vite';
import path from 'path';

const config: UserConfig = {
  alias: {
    '/@/': path.resolve(__dirname, 'src'),
  },
  assetsDir: 'assets',
};

export default config;

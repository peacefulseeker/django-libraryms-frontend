import type { User } from './auth';

import type PageError from '@/types/pageError';

export interface RootProps {
  user?: User;
  access?: string;
  error?: PageError;
}

declare global {
  interface Window {
    __rootProps: RootProps;
  }
}

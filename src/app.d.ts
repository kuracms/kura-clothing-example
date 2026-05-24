declare global {
  namespace App {
    interface Platform {
      env?: {
        KURA_BASE_URL?: string;
        KURA_PROJECT?: string;
        KURA_TOKEN?: string;
      };
    }
  }
}

export {};

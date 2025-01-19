/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_AWS_ACCESS_KEY_ID: string;
    VITE_AWS_SECRET_ACCESS_KEY: string;
    VITE_AWS_REGION: string;
    VITE_AWS_BUCKET_NAME: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
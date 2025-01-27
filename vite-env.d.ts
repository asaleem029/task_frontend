/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_AUTH_API_BASE_URL: string;
  readonly VITE_ORG_API_BASE_URL: string;
  readonly VITE_MICRO_COMMS_SERVICE_URL: string;
  // Add other variables here as needed
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
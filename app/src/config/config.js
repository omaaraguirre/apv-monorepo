export const IS_DEV = import.meta.env.DEV
export const IS_PROD = import.meta.env.PROD

export const BACKEND_URL = IS_DEV
  ? import.meta.env.VITE_D_BACKEND_URL
  : import.meta.env.VITE_P_BACKEND_URL

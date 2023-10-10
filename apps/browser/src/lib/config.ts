if (!process.env.PLASMO_PUBLIC_APP_HOST) {
  throw new Error("PLASMO_PUBLIC_API_HOST is not set");
}

export const APP_HOST = process.env.PLASMO_PUBLIC_APP_HOST;

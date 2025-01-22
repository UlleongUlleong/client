export {};

declare global {
  interface Window {
    setIsEmailVerified?: (verified: boolean) => void;
  }
}

export {};

declare global {
  interface Window {
    paypal: any;
    ethereum: any;
  }
}

declare module "yup" {
  interface ArraySchema<T> {
    unique(message: string): NumberSchema<T>;
  }
}

export type TAppState = {
  id: string;
  name: string;
  email: string;
  token: string;
  isLoading: boolean;
};

export type TSignInPayload = {email: string; password: string};

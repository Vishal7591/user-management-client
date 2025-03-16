export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthSuccess {
  user: {
    email: string;
    id: number;
  };
  token: string;
}

export interface AuthFailure {
  statusCode: number;
  message: string | Array<string>;
  error?: string;
}

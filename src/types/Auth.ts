export interface LoginFields {
  email: string;
  password: string;
}

export interface RegisterFields {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateProfileFields {
  name: string;
  email: string;
}

export interface UpdateSettingsFields {
  language: string;
  currency: string;
  theme: string;
}

export interface ChangePasswordFields {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface ResetPasswordFields {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}

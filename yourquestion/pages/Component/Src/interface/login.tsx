// Loginpopup.tsx interface
export interface IUser {
  userName: string;
  userEmail: string;
  userID: string;
}

export interface JwtPayload {
  userName: string;
  userEmail: string;
  userID: string;
  exp: number;
}

export interface LoginPopupProps {
  showButton?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

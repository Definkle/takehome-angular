export interface User {
  idNumber: number;
  firstName: string;
  lastName: string;
}

export interface UserData {
  idNumber: number;
  firstName: string;
  lastName: string;
  actions: UserDataActions[];
}

export interface UserDataActions {
  icon: string;
  ariaLabel: string;
  label: string;
  onClick: () => void;
}

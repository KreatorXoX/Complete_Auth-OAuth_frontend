interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
}

interface IToken {
  accessToken: string;
}
interface AccessTokenType {
  UserInfo: {
    _id: string;
    email: string;
    isAdmin: boolean;
  };
  exp: number;
  iat: number;
}

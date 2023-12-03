import { Session, SessionData } from 'express-session';

interface UserSessionType extends SessionData {
  currentUser: string; // Ganti dengan tipe data yang sesuai untuk currentUser
}

declare module 'express-session' {
  interface Session extends UserSessionType {}
}


export default UserSessionType


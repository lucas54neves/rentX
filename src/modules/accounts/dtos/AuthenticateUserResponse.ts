export type AuthenticateUserResponse = {
  user: {
    name: string
    email: string
  }
  token: string
}

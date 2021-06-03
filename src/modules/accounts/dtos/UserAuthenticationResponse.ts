export type UserAuthenticationResponse = {
  user: {
    name: string
    email: string
  }
  token: string
}

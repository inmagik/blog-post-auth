import { useAuthActions, useAuthUser } from 'use-eazy-auth'

export default function Home() {
  const { user } = useAuthUser()
  const { logout } = useAuthActions()
  return (
    <div>
      <h1>Hello @{user.username} !!!</h1>
      <button onClick={logout}>Log Out</button>
    </div>
  )
}

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import UserServices from '../api/services/user.services'
interface Props {}

const UserPage = (props: Props) => {
  const { userId } = useParams()

  const { isLoading, error, data: user } = useQuery({
    queryKey: [`userId-${userId}`],
    queryFn:UserServices.findById.bind(null, userId!),
    enabled: !!userId
  })

  if (isLoading)
    return <p>Loading spinner ...</p>


  if (error instanceof Error)
    return <p>{error.message}</p>

  return <section>
    <h3>Welcome</h3>
    <h2>{user?.firstName} - {user?.lastName}</h2>
  </section>
}

export default UserPage

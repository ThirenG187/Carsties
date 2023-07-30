import { getSession } from '@/actions/auth/getSession'
import Heading from '@/components/heading'
import AuthTest from './components/auth-test'
import { getTokenWorkaround } from '@/actions/auth/getTokenWorkaround'

interface SessionPageProps {}

const SessionPage: React.FC<SessionPageProps> = async () => {
  const session = await getSession()
  const token = await getTokenWorkaround()

  return (
    <div>
      <Heading
        title="Session Dashboard"
        subtitle="Simple test page to have a look at current session"
      />
      <div className="bg-blue-200 border-2 border-blue-500 mt-4 p-2 rounded-lg">
        <h3 className="text-lg">Session data</h3>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
      <div className="mt-4">
        <AuthTest />
      </div>
      <div className="bg-green-200 border-2 border-blue-500 mt-4 p-2 rounded-lg">
        <h3 className="text-lg">Token data</h3>
        <pre className="overflow-auto">{JSON.stringify(token, null, 2)}</pre>
      </div>
    </div>
  )
}

export default SessionPage

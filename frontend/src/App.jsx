import { AuthProvider } from './context/AuthContext.jsx';
import Approutes from './Routes/Approutes.jsx';
const App = () => {

  return (
    <>
      <AuthProvider>
        <Approutes />
      </AuthProvider>
    </>
  )
}

export default App
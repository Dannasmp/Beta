import { AuthProvider } from './src/context/authContext';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  return (
    <AuthProvider>
      <LoginScreen />
    </AuthProvider>
  );
}


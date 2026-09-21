import ReduxProvider from "@/components/ReduxProvider";
import AuthProvider from "@/components/Auth/AuthProvider";
import Header from "@/components/Header/Header";

const SiteShell = ({ children }) => (
  <ReduxProvider>
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  </ReduxProvider>
);

export default SiteShell;

import { ReactNode } from "react";
import Loader from "./Loader";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => <Loader pushTo="/">{children}</Loader>

export default ProtectedRoute;

import { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";
import { Container } from "./styles";

interface LayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Sidebar />
      {children}
    </Container>
  );
};

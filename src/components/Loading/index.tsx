import LoadingSpin from "react-loading-spin";
import { LoadingContainer } from "./styles";

interface LoadingProps {
  size: string;
  width: string;
}

export function Loading({ size, width }: LoadingProps) {
  return (
    <LoadingContainer>
      <LoadingSpin
        size={size}
        width={width}
        primaryColor="var(--primary-400)"
        secondaryColor="#EDEDED"
        animationDuration="1.5s"
        animationTimingFunction="ease-in-out"
        numberOfRotationsInAnimation={3}
      />
    </LoadingContainer>
  );
}

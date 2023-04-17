import { Aadhar, PANCard } from "@/components/cards";
import { ProtectedRoute } from "@/components/shared";

function Me() {
  return (
    <ProtectedRoute>
      <div className="flex gap-5 items-center justify-center">
        <Aadhar name="Mohamed Sami" aadharNumber="12345678" />
        <PANCard name="Mohamed Sami" pan="CDHPM1234G" />
      </div>
    </ProtectedRoute>
  );
}

export default Me;

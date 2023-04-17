import { ProtectedRoute } from "@/components/shared";

function Me() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Me</h1>
      </div>
    </ProtectedRoute>
  );
}

export default Me;

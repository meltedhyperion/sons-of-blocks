import { Loader2 } from "lucide-react";


const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Loader2 className="mr-2 h-10 w-10 animate-spin" />
    </div>
  )
}

export default Loader;

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="flex flex-row items-center justify-between p-8 w-full max-w-7xl mx-auto gap-8">
      <div className="flex flex-col space-y-4 lg:w-1/2">
        <h1 className="text-5xl font-bold">
          Find your{' '}
          <span>pawfect</span>{' '}
          match
        </h1>
        <p className="text-lg">
          The new revolutionary pet finding platform. For dog owners, made by dog owners.
        </p>
        <div className="flex space-x-4 pt-4">
          <Link to="/signup">
            <Button>Adopt</Button>
          </Link>
          <Link to="/signup">
            <Button>Rehome</Button>
          </Link>
        </div>
      </div>

      <div className="relative lg:w-1/2 h-96 flex items-center justify-center">
        <img src="/hero.png" alt="Paw" className="object-contain max-w-full max-h-full" />
      </div>
    </div>
  );
}

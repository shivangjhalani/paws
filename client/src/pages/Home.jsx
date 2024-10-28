import { Button } from "@/components/ui/button"
export default function Home({ array }) {
  return (
    <div className="p-4">
      <Button>Click me</Button>
      <ul>
        {array.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  )
}


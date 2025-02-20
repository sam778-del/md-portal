import Link from "next/link"
import { Button } from "./components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-gray-500">This page could not be found.</p>
        {/* <Button asChild variant="link">
          <Link href="/a/123456">Go to Demo Form</Link>
        </Button> */}
      </div>
    </div>
  )
}


import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-[350px] text-center">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <p>
          View <Link href="/blog">all posts</Link>
        </p>
        <div className="mt-3">
          <Link href="/">
            <Button variant="primary">Back Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

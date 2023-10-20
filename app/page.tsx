import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>Welcome to messagelizer</div>
      go to <Link href="/dashboard">dashboard</Link>
    </div>
  );
}

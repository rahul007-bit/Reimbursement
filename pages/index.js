import Link from "next/link";
export default function Home() {
  return (
    <>
      <Link href={"/login"}>Login</Link>
      <Link href={"/reimbursement"}>Reimbursement</Link>
      <Link href={"/signup"}>Signup</Link>
    </>
  );
}

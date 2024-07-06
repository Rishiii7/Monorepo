"use client";
import { useBalance } from "@repo/store/useBalance";

export default function GetBal() {
  const balance = useBalance();

  if (balance === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Hi there {balance}
    </div>
  );
}

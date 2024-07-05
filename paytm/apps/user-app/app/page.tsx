import { PrismaClient } from "@repo/database";
const client = new PrismaClient();

export  default async function Home() {

  return (
    <div className="text-2xl text-cyan-600">
        App page
    </div>
  );
}

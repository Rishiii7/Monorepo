
import GetBal from "../components/GetBal";

export  default async function Home() {
  console.log("Home component rendered");
  return (
    <div className="text-2xl text-cyan-600">
        App page
        <GetBal />
    </div>
  );
}

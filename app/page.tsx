import Header from "./_components/Header";
import Nav from "./_components/Nav";

export default function Home() {
  return (
    <main className="h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-between">
      <Header title="홈" />
      <Nav />
    </main>
  );
}

import LoginButton from "@/app/_components/buttons/login-button";

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="flex justify-between items-center px-10 py-3">
        <h1 className="text-black text-lg font-bold">Task Tracker</h1>
        <div>
          <LoginButton />
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="flex justify-between items-center px-10 py-3">
        <h1 className="text-black text-lg font-bold">Task Tracker</h1>
        <div>
          <button className="text-black text-sm font-bold rounded-lg bg-buttonBg px-[10px] h-10">Login</button>
        </div>
      </div>
    </header>
  );
}

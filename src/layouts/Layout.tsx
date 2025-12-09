import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className="mx-auto flex h-screen max-h-[100svh] max-w-[1200px] min-w-0">
      <div className="flex h-full min-h-0 min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}

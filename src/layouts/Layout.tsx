import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className="mx-auto flex h-screen max-h-screen max-w-[1200px] min-w-[375px]">
      <div className="flex min-h-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}

import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className="mx-auto min-h-screen max-w-[1200px] min-w-[375px] p-5">
      <Outlet />
    </div>
  );
}

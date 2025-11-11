// src/components/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import VolumeControl from "../VolumeControl";
import "./style.css";

export default function Layout() {
  return (
    <div className="bg-cyan-950">
      <main className="pt-14 p-4 xs:p-0 xs:pt-14">
        <Outlet />
      </main>
      <span className="fixed bottom-0 left-2 z-20 pr-2 pb-1 text-muted-foreground md:text-[12px] sm:text-[8px] xs:text-[10px]">
        BS7 Ver.1.8 | copyright@2025 DevonYura
      </span>
      {/* Volume Control */}
      <VolumeControl />
    </div>
  );
}

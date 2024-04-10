import { LogoLink } from "./LogoLink";
import { WebsiteLink } from "./WebsiteLink";
import { Navigation } from "./Nav";

export function DesktopAside() {
  return (
    <aside className="sticky left-0 top-0 z-40 hidden h-screen w-[250px] bg-aside-pattern px-4 py-6 md:flex md:flex-col md:justify-between">
      <div>
        <LogoLink className="mb-24" />
        <Navigation />
      </div>
      <div>
        <WebsiteLink />
      </div>
    </aside>
  );
}

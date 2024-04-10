import "~/styles/wills.css";
import { ReactNode } from "react";

export default function WillsLayout({ children }: { children: ReactNode }) {
  return <div className="p-12">{children}</div>;
}

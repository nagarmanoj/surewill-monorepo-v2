import { Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { useEffect } from "react";

interface DrawerProps {
  active: boolean;
  onMouseOverBackdrop?: () => void;
  onClickBackdrop?: () => void;
  children: React.ReactNode;
}

export const Drawer = ({
  active,
  onMouseOverBackdrop,
  onClickBackdrop,
  children,
}: DrawerProps) => {
  useEffect(() => {
    if (active) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [active]);
  return (
    <>
      <Transition
        className="fixed right-0 top-0 z-[9999999] h-screen w-full max-w-full overflow-auto bg-white md:max-w-md"
        show={active}
        enter="transition duration-300"
        enterFrom="opacity-0 translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition duration-300"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-full"
      >
        {children}
      </Transition>
      {active && (
        <div
          onClick={onClickBackdrop}
          onMouseEnter={onMouseOverBackdrop}
          className={clsx(
            "absolute left-0 top-0 z-20 h-[50000000px] w-full bg-black-1 opacity-50",
            active ? "block" : "hidden"
          )}
        />
      )}
    </>
  );
};

import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  id: string;
}

export const PageWrapper = ({ children, id }: PageWrapperProps) => {
  return (
    <section
      id={id}
      className="h-screen w-screen overflow-hidden bg-blue-500 items-center sm:items-end "
    >
      {children}
    </section>
  );
};

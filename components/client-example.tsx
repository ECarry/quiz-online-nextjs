"use client";

import { useSession } from "next-auth/react";
import SessionData from "./session-data";

export default function ClientExample() {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Client Side Rendering</h1>

      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <SessionData session={session} />
      )}
    </div>
  );
}

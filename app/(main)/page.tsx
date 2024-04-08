import { auth } from "@/auth";
import ZustandTest from "@/components/zustand-test";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">NextAuth.js Example</h1>
      <div className="flex flex-col rounded-md bg-neutral-100 dark:bg-primary-foreground">
        <div className="p-4 font-bold rounded-t-md bg-neutral-200 dark:bg-primary-foreground">
          Current Session
        </div>
        <pre className="py-6 px-4 whitespace-pre-wrap break-all">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      <div>
        <ZustandTest />
      </div>
    </div>
  );
}

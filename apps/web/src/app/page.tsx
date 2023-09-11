"use client";

import { signIn, signOut, useSession } from "@whl/auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <>Loading</>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp; Hello&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
          <code className="font-mono font-bold">
            {session?.user?.name ?? "guest"}
          </code>
        </p>

        {!session && (
          <button
            onClick={() => signIn()}
            className="flex w-full justify-center border-2 border-b border-red-300 hover:border-red-400 bg-red-200 hover:bg-red-300 pb-6 pt-8 backdrop-blur-2xl dark:border-red-800 dark:hover:border-red-900 dark:bg-red-800/50 dark:hover:bg-red-900/30 lg:static lg:w-auto lg:rounded-xl lg:p-4"
          >
            Sign In
          </button>
        )}

        {session && (
          <button
            onClick={() => signOut()}
            className="flex w-full justify-center border-2 border-b border-green-300 bg-green-200 pb-6 pt-8 backdrop-blur-2xl dark:border-green-800 dark:bg-green-800/30 lg:static lg:w-auto lg:rounded-xl lg:p-4 hover:border-green-400 hover:bg-green-300 dark:hover:border-green-900 dark:hover:bg-green-900/30"
          >
            Sign Out
          </button>
        )}
      </div>
    </main>
  );
}

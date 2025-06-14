import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SessionPanel() {
  const { data: session } = useSession();

  const handleDiscordLogout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  if (!session?.user) return null;

  return (
    <div className="border-t bottom-0 w-80 absolute border-[#252525]">
      <div className="py-3 px-4 rounded-br-2xl bg-zinc-900/20">
        <p className="text-zinc-400 text-xs font-medium mb-3 tracking-wider">
          Signed in as:
        </p>
        <div className="flex items-center gap-3">
          <Image
            src={session.user.image || "/default-avatar.png"}
            alt="Profile"
            width={36}
            height={36}
            className="rounded-full ring-2 ring-zinc-800"
          />
          <div className="flex-1 min-w-0">
            <p className="text-zinc-200 font-medium text-sm truncate">
              {session.user.name}
            </p>
          </div>
          <button
            onClick={handleDiscordLogout}
            className="flex invisible md:visible text-sm items-center gap-2 px-4 py-1 cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors"
          >
            <LogOut className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

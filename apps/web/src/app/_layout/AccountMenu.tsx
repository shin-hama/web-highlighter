import { getServerAuthSession } from "@whl/auth";
import { signOut } from "@whl/auth/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@whl/ui/components/ui/avatar";
import { Button } from "@whl/ui/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@whl/ui/components/ui/dropdown-menu";

const AccountMenu = async () => {
  const session = await getServerAuthSession();
  const UserInfo = session
    ? () => {
        return (
          <>
            <Avatar>
              <AvatarImage src={session.user.image ?? ""} />
              <AvatarFallback>{session.user.name}</AvatarFallback>
            </Avatar>
            <div>Account</div>
          </>
        );
      }
    : () => {
        return (
          <>
            <Avatar>
              <AvatarFallback>Account</AvatarFallback>
            </Avatar>
            <div>Unknown Account</div>
          </>
        );
      };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className="whl-justify-start whl-space-x-2 whl-rounded-none"
        >
          <UserInfo />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <UserInfo />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut}>SignOut</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;

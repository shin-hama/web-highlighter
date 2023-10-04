import { getServerAuthSession } from "@whl/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@whl/ui/components/ui/avatar";

const UserInfo = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="align-center whl-flex whl-items-center whl-space-x-2">
      {session ? (
        <>
          <Avatar>
            <AvatarImage src={session.user.image ?? ""} />
            <AvatarFallback>{session.user.name?.at(0)}</AvatarFallback>
          </Avatar>
          <span>{session.user.name}</span>
        </>
      ) : (
        <>
          <Avatar>
            <AvatarFallback>Account</AvatarFallback>
          </Avatar>
          <div>Unknown Account</div>
        </>
      )}
    </div>
  );
};

export default UserInfo;

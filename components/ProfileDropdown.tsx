import { Dropdown, DropdownItem } from "flowbite-react";
import { useAuth } from "./AuthHook";

export function ProfileDropdown() {
  const { user } = useAuth();
  return (
    <div className="flex items-center">
      {user && (
        <Dropdown
          label={
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
              alt="Avatar"
              className="h-10 w-10 rounded-full"
            />
          }
        >
          <DropdownItem>
            <a href="/profile">Profile</a>
          </DropdownItem>
          <DropdownItem formMethod="POST" href="/auth/signedout">
            Sign out
          </DropdownItem>
        </Dropdown>
      )}
    </div>
  );
}

"use client";
import { useAuth } from "@/components/AuthHook";
import { Button, Card, HR, TextInput, FileInput, Label } from "flowbite-react";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <main className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 dark:bg-gray-700">
      <Card className="mt-6 w-full max-w-[80%] rounded p-7 shadow-lg dark:bg-gray-800">
        <h1 className="text-2xl text-white">General Settings</h1>
        <HR />
        <h3 className="text-white">Given Name</h3>
        <TextInput placeholder={user?.signInDetails} />
        <h3 className="text-white">Email</h3>
        <TextInput
          disabled
          className="text-white"
          value={user?.signInDetails.loginId}
        />

        <div>
          <div className="mb-2 block">
            <Label htmlFor="file-upload" value="Upload Profile Picture" />
          </div>
          <FileInput
            accept=".svg"
            id="file-upload-helper-text"
            helperText="SVG (MAX. 800x400px)."
          />
        </div>
        <Button>Update</Button>
      </Card>
      <Card className="mb-6 w-full max-w-[80%] rounded p-7 shadow-lg dark:bg-gray-800">
        <h1 className="text-2xl text-white">Password Settings</h1>
        <HR />
        <h3 className="text-white">Current Password</h3>
        <TextInput type="password" required placeholder="********" />

        <h3 className="text-white">New Password</h3>
        <TextInput type="password" required placeholder="********" />

        <h3 className="text-white">Confirm Password</h3>
        <TextInput type="password" required placeholder="********" />

        <Button>Update Password</Button>
      </Card>
    </main>
  );
}

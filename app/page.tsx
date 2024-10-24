import { Button, Card, FloatingLabel } from "flowbite-react";

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-full items-center justify-center gap-2 dark:bg-gray-700">
      <form action="/api/submit" method="POST" className="w-1/2">
        <Card className="dark:bg-gray-800">
          <FloatingLabel
            label="Password"
            id="password"
            variant="standard"
            type="Password"
            required
            helperText="Your password is not stored anywhere and is encrypted before being checked against breached credentials."
          />
          <div className="mt-4 flex gap-3">
            <Button
              type="reset"
              outline
              gradientDuoTone="pinkToOrange"
              className="flex-1"
            >
              Clear
            </Button>
            <Button
              type="submit"
              outline
              gradientDuoTone="greenToBlue"
              className="flex-1"
            >
              Submit
            </Button>
          </div>
        </Card>
      </form>
    </main>
  );
}

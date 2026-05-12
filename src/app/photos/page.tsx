import { auth } from "@/auth";
import SignIn from "@/components/sign-in";

export default async function Page() {
  const session = await auth();
  console.log("session:", JSON.stringify(session));

  if (!session?.user) {
    return <SignIn />;
  }

  return (
    <div>
      <h1>Photos</h1>
      {/* gallery */}
    </div>
  );
}

import { auth } from "@/auth";
import SignIn from "@/components/sign-in";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <SignIn />;
  }

  const isAdmin =
    session.user?.email == "garrettmeldrum14@gmail.com" ||
    session.user?.email == "malorie2000@hotmail.com";

  return (
    <div>
      <h1>Photos</h1>
      {isAdmin && <div>{/* Upload/delete controls */}</div>}
      {/* gallery */}
    </div>
  );
}

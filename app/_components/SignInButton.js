import { signInAction } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

export default function SignInButton() {
  return (
    <form action={signInAction}>
      <SubmitButton />
    </form>
  );
}

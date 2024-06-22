import { MouseEvent, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";
import { FirebaseError } from "@firebase/util";

export function Signup() {
  const {signUp, currentUser} = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function clearForm() {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  async function handleSubmit(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (email && password && confirmPassword) {
      try {
        await signUp({email, password});
      } catch (error) {
        if (error instanceof FirebaseError) {
          alert(error?.message);
        }
      }
    }

    clearForm();
  }

  return (
    <div className="container">
      <h2>Signup</h2>
      <h3>{currentUser?.email}</h3>

      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <label htmlFor="password_confirmation">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />

        <button
          className="button-block"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Signup
        </button>
      </form>
    </div>
  )
}

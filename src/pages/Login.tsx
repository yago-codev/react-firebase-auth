import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const {signIn} = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  function clearForm() {
    setEmail("");
    setPassword("");
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    setButtonDisabled(true);

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await signIn({ email, password });
      navigate("/");
      clearForm();
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(error.message)
      }
    } finally {
      setButtonDisabled(false);
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
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
        <button
          className="button-block"
          type="submit"
          onClick={(e) => handleSubmit(e)}
          disabled={!email || !password || buttonDisabled}
        >
          Login
        </button>
      </form>
    </div>
  )
}

import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { FirebaseError } from 'firebase/app';

export function UpdateProfile() {
  const { currentUser, updateUserProfile } = useAuthContext();
  const [email, setEmail] = React.useState(currentUser?.email?.toString());
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  async function handleUpdateProfile() {
    if (!email) {
      alert("Email is required");
      return;
    }

    try {
      setButtonDisabled(true);
      await updateUserProfile(email);
      alert("Profile updated successfully");
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(error.message);
      }
    } finally {
      setButtonDisabled(false);
    }
  }

  return (
    <div className="container">
      <h2>Update Profile</h2>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="button-block"
          onClick={handleUpdateProfile}
          disabled={buttonDisabled}
        >
          Update
        </button>
      </form>
    </div>
  )
}

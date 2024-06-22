import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { FirebaseError } from "firebase/app";

export function UserProfile() {
  const {currentUser, logOut} = useAuthContext();
  const navigate = useNavigate();

  async function handleLogOut() {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(error.message)
      }
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>User profile</h1>
        <button type="button" onClick={handleLogOut}>Logout</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{currentUser?.email}</td>
            <td>
              <Link to="/update-profile">Atualizar perfil do usuário</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

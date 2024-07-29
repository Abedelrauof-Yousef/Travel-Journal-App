import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";

function RegisterAndLogin() {
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const firstName = e.target.firstName?.value;
    const lastName = e.target.lastName?.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword?.value;

    if (type === 'signup') {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Set user's display name
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`
        });
        navigate("/profile");
      } catch (err) {
        alert(err.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/profile");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(err => {
        alert(err.message);
      });
  };

  return (
    <div className="form">
      {user ? (
        <div>
          <h1>Welcome, {user.displayName || user.email.split('@')[0]}</h1>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <>
          <h1>{login ? 'Sign In' : 'Sign Up'}</h1>
          <form onSubmit={(e) => handleSubmit(e, login ? 'signin' : 'signup')}>
            {!login && (
              <>
                <input type="text" name="firstName" placeholder="First Name" required /> <br />
                <input type="text" name="lastName" placeholder="Last Name" required /> <br />
              </>
            )}
            <input type="email" name="email" placeholder="Email" required /> <br />
            <input type="password" name="password" placeholder="Password" required /> <br />
            {!login && (
              <>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" required /> <br />
              </>
            )}
            <br />
            <button id="signInButton" type="submit">{login ? 'Sign In' : 'Sign Up'}</button>
          </form>
          <br />
          {login ? (
            <p>
              Don't have an account? <button onClick={() => setLogin(false)}>Sign Up</button>
            </p>
          ) : (
            <p>
              Already have an account? <button onClick={() => setLogin(true)}>Sign In</button>
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default RegisterAndLogin;

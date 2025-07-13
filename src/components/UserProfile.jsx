import React from 'react';
import { useAppContext } from './AppContext';

function UserProfile() {
  const { user } = useAppContext();

  return (
    <section className="profile-card">
      <h4>👤 Welcome, {user.name}</h4>
      <p>Role: <strong>{user.role}</strong></p>
      <p>User ID: {user.id}</p>
      <p>Access Level: Tailored to {user.role} operations</p>
    </section>
  );
}

export default UserProfile;
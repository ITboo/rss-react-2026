import React from 'react';
import styles from "./styles.module.css"

interface UserProps {
  userName?: string;
  avatarUrl?: string;
}

const User: React.FC<UserProps> = ({ userName, avatarUrl }) => {
  const displayName = userName && userName.trim() !== '' ? userName : 'Reviewer 1';
  const defaultAvatar = 'https://forums.opera.com/assets/uploads/profile/395252-profileavatar-1645373095479.jpeg';
  const avatarSrc = avatarUrl || defaultAvatar;

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      <img
        src={avatarSrc}
        alt="User avatar"
        className={styles.avatar}
        onError={(e) => {
          (e.target as HTMLImageElement).src = defaultAvatar;
        }}
      />
      <div style={{ marginTop: '8px', fontSize: '1.2rem' }}>
        Welcome, <span className={styles.name}>{displayName}</span>!
      </div>
    </div>
  );
};

export default User;
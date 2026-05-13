import type { Character } from '../../types/types';
import { UI } from '../../data/enums';
import styles from './styles.module.css';

interface CardProps {
  character: Character;
}

const Card = ({ character }: CardProps) => {
  const { name, status, species, image, location } = character;
  return (
    <article className={styles.card}>
      <img
        src={image}
        alt={name}
        className={styles.card_img}
      />
      <div>
        <h3>
          {name} — {status} ({species})
        </h3>
        <p>
          {UI.LOCATION}: {location.name}
        </p>
      </div>
    </article>
  );
};

export default Card;

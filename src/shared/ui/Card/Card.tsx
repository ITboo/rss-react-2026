import { Component } from 'react';
import type { Character } from '../../types/types';
import { UI } from '../../data/enums';
import styles from './styles.module.css';

interface CardProps {
  character: Character;
}

class Card extends Component<CardProps, {}> {
  render() {
    const { name, status, species, image, location } = this.props.character;
    return (
      <article
      className={styles.card}
      >
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
  }
}
export default Card;

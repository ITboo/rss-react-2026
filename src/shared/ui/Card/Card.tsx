import { Component } from 'react';
import type { Character } from '../../types/types';
import { UI } from '../../data/enums';

interface CardProps {
  character: Character;
}

class Card extends Component<CardProps, {}> {
  render() {
    const { name, status, species, image, location } = this.props.character;
    return (
      <article
        style={{
          border: '1px solid #ccc',
          margin: '10px',
          padding: '10px',
          borderRadius: '8px',
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
        }}
      >
        <img
          src={image}
          alt={name}
          style={{ width: '80px', borderRadius: '50%' }}
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

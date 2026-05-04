import { Component } from 'react';
import type { Character } from '../../types/types';

interface CardProps {
  character: Character;
}

export class Card extends Component<CardProps> {
  render() {
    const { name, role, level, health, weapon } = this.props.character;
    return (
      <div className="card">
        <h3>{name} — {role}</h3>
        <p>Уровень: {level} | Здоровье: {health} | Оружие: {weapon}</p>
      </div>
    );
  }
}

export default Card;
import { Component } from 'react';
import { Header } from '../../widgets/Header/Header';
import { CardList } from '../../widgets/CardList/CardList';

export class MainPage extends Component {
  render() {
    return <>
    <Header />
    <CardList/>
    </>
  }
}
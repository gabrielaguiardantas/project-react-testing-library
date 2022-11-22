import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('some tests in component About', () => {
  it('contains infos about pokedex', () => {
    renderWithRouter(<About />);
    const pokedexInfoEl1 = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const pokedexInfoEl2 = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );
    const headingPokedex = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    const imagePokedex = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(pokedexInfoEl1).toBeInTheDocument();
    expect(pokedexInfoEl2).toBeInTheDocument();
    expect(headingPokedex).toBeInTheDocument();
    expect(imagePokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

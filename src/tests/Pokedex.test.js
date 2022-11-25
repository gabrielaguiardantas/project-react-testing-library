import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('some tests in the component Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  const typeTestId = 'pokemon-type-button';

  it('has a h2 with text: "Encountered Pokémon', () => {
    const headerPokedex = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });
    expect(headerPokedex).toBeInTheDocument();
  });
  it('shows next pokemon when we click on the "Próximo Pokémon" button', () => {
    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const arrayPokemonObj = ['Pikachu', 'Charmander', 'Caterpie'];
    arrayPokemonObj.forEach((element) => {
      const pokemon = screen.getByText(element);
      expect(nextPokemonButton).toBeInTheDocument();
      expect(pokemon).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });
    for (let i = 0; i < 6; i += 1) {
      userEvent.click(nextPokemonButton);
    }
    const firstPokemonAgain = screen.getByText(/pikachu/i);
    expect(firstPokemonAgain).toBeInTheDocument();
  });
  it('shows only one pokemon at time on the screen', () => {
    const pokemonDetailsLink = screen.getAllByRole('link', {
      name: /more details/i,
    });
    expect(pokemonDetailsLink).toHaveLength(1);
  });
  it('has filter buttons on the screen', () => {
    const filterButtons = screen.getAllByTestId(typeTestId);
    expect(filterButtons).toHaveLength(7);
  });
  it('filter buttons works properly', () => {
    const filteredButton = screen.getAllByTestId(typeTestId)[0]; // qualquer elemento desse array deve retornar true no expect
    userEvent.click(filteredButton);
    const typeTextOnTheScreen = screen.getAllByText(filteredButton.innerHTML);
    expect(typeTextOnTheScreen).toHaveLength(2);
    const allPokemonButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allPokemonButton).toBeInTheDocument();
  });
  it('contains a reset filter button', () => {
    const pikachuNameEl = screen.getByText(/pikachu/i);
    expect(pikachuNameEl).toBeInTheDocument();
    const allPokemonButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allPokemonButton).toBeInTheDocument();
    const filteredButton = screen.getAllByTestId(typeTestId)[3];
    userEvent.click(filteredButton);
    const pikachuNameEl2 = screen.queryByText(/pikachu/i);
    expect(pikachuNameEl2).not.toBeInTheDocument();
    userEvent.click(allPokemonButton);
    const pikachuNameEl3 = screen.getByText(/pikachu/i);
    expect(pikachuNameEl3).toBeInTheDocument();
  });
});

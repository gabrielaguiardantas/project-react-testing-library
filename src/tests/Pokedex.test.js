import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../pages';
import pokemonList from '../data';

describe('some tests in the component Pokedex', () => {
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: true,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false };
  const typeTestId = 'pokemon-type-button';

  it('has a h2 with text: "Encountered Pokémon', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const headerPokedex = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });
    expect(headerPokedex).toBeInTheDocument();
  });
  it('shows next pokemon when we click on the "Próximo Pokémon" button', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(nextPokemonButton).toBeInTheDocument();
    expect(firstPokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    const secondPokemon = screen.getByText(/charmander/i);
    expect(secondPokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    const thirdPokemon = screen.getByText(/caterpie/i);
    expect(thirdPokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    const firstPokemonAgain = screen.getByText(/pikachu/i);
    expect(firstPokemonAgain).toBeInTheDocument();
  });
  it('shows only one pokemon at time on the screen', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemonDetailsLink = screen.getAllByRole('link', {
      name: /more details/i,
    });
    expect(pokemonDetailsLink).toHaveLength(1);
  });
  it('has filter buttons on the screen', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const filterButtons = screen.getAllByTestId(typeTestId);
    expect(filterButtons).toHaveLength(7);
  });
  it('filter buttons works properly', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
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
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
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

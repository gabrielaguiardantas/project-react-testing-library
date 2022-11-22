import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import data from '../data';

describe('some tests in the component FavoritePokemon', () => {
  it('render "No favorite pokemon found" if doesnt have favorite pokemons at list', () => {
    renderWithRouter(<FavoritePokemon />);
    const noFavoritePokemonText = screen.getByText(/no favorite pokémon found/i);
    expect(noFavoritePokemonText).toBeInTheDocument();
  });
  it('render pokemon favorites properly', () => {
    const pokemonlist = [data[3], data[2]];
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonlist } />);
    const pokemonName1 = screen.getByText(/ekans/i);
    const pokemonName2 = screen.getByText(/caterpie/i);
    expect(pokemonName1).toBeInTheDocument();
    expect(pokemonName2).toBeInTheDocument();
  });
});

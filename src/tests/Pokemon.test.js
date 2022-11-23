import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('some tests in the Pokemon component', () => {
  it('render a card with the correct infos about the specific pokemon', () => {
    const showDetailsLink = true;
    const isFavorite = false;
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonList[0] }
        showDetailsLink={ showDetailsLink }
        isFavorite={ isFavorite }
      />,
    );
    const pikachuName = screen.getByText(/pikachu/i);
    const pikachuType = screen.getByTestId(/pokemon-type/);
    const pikachuWeight = screen.getByText(/average weight: 6\.0 kg/i);
    const pikachuLink = screen.getByRole('link', {
      name: /more details/i,
    });
    const pikachuImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pikachuName).toBeInTheDocument();
    expect(pikachuType).toBeInTheDocument();
    expect(pikachuType.innerHTML).toBe('Electric');
    expect(pikachuWeight).toBeInTheDocument();
    expect(pikachuLink).toBeInTheDocument();
    expect(pikachuImg).toBeInTheDocument();
    expect(pikachuImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('has a nav link to pokemon details', () => {
    const showDetailsLink = true;
    const isFavorite = false;
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonList[0] }
        showDetailsLink={ showDetailsLink }
        isFavorite={ isFavorite }
      />,
    );
    const pikachuLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pikachuLink).toBeInTheDocument();
    expect(pikachuLink.pathname).toBe('/pokemon/25');
    userEvent.click(pikachuLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });
  it('has a star on the screen when we access a pokemon favorite details', () => {
    const showDetailsLink = true;
    const isFavorite = true;
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonList[0] }
        showDetailsLink={ showDetailsLink }
        isFavorite={ isFavorite }
      />,
    );
    const pokemonFavoriteStar = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(pokemonFavoriteStar).toBeInTheDocument();
    expect(pokemonFavoriteStar).toHaveAttribute('src', '/star-icon.svg');
  });
});

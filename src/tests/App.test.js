import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('some tests in component App', () => {
  it('has three links: "Home", "About" and "Favorite Pokemon"', () => {
    renderWithRouter(<App />);
    const homeLinkEl = screen.getByRole('link', {
      name: /home/i,
    });
    const aboutLinkEl = screen.getByRole('link', {
      name: /about/i,
    });
    const favoritePokemonLinkEl = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    expect(homeLinkEl).toBeInTheDocument();
    expect(aboutLinkEl).toBeInTheDocument();
    expect(favoritePokemonLinkEl).toBeInTheDocument();
  });

  it('is been redirected to url "/" after click on home link', () => {
    const { history } = renderWithRouter(<App />);
    const homeLinkEl = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLinkEl);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('is been redirected to url "/about" after click on about link', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLinkEl = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLinkEl);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('is been redirected to url "/favorites" after click on Favorite Pokémon link', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonLinkEl = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(favoritePokemonLinkEl);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});

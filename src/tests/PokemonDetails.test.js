import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('some tests in the PokemonDetails component', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);
  });

  it('shows detailed and correctly infos about a specific pokemon', () => {
    const headingPikachuDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    const moreDetailsLink = screen.queryByRole('link', {
      name: /more details/i,
    });
    const summaryHeading = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    const summaryText = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    expect(headingPikachuDetails).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();
    expect(summaryHeading).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
  });
  it('has a section with maps and locations about the specific pokemon', () => {
    const headingPikachuLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    const pikachuLocationMap = screen.getAllByRole('img', {
      alt: /Pikachu location/i,
    });
    const pikachuLocationText1 = screen.getByText(/kanto viridian forest/i);
    const pikachuLocationText2 = screen.getByText(/kanto power plant/i);
    expect(headingPikachuLocation).toBeInTheDocument();
    expect(pikachuLocationMap[0]).toBeInTheDocument();
    expect(pikachuLocationText1).toBeInTheDocument();
    expect(pikachuLocationMap[1]).toBeInTheDocument();
    expect(pikachuLocationText2).toBeInTheDocument();
  });
  it('has a working properly checkbox', () => {
    const favoritePokemonCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(favoritePokemonCheckbox).toBeInTheDocument();
    userEvent.click(favoritePokemonCheckbox);
    const favoritePokemonStar = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoritePokemonStar).toBeInTheDocument();
    userEvent.click(favoritePokemonCheckbox);
    expect(favoritePokemonStar).not.toBeInTheDocument();
  });
});

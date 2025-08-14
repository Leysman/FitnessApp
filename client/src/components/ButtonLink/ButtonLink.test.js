// src/components/ButtonLink/ButtonLink.test.js
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ButtonLink from './ButtonLink';
import styles from './ButtonLink.module.scss';

describe('ButtonLink', () => {
  test('renders link with title and correct href', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ButtonLink to="/account" titleName="Account" />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /account/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringContaining('/account'));
    expect(link).toHaveClass(styles.link);
  });

  test('applies active class when current route matches "to"', () => {
    render(
      <MemoryRouter initialEntries={['/account']}>
        <ButtonLink to="/account" titleName="Account" />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /account/i });
    expect(link).toHaveClass(styles.link);
    expect(link).toHaveClass(styles.active);
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  test('does NOT apply active class when route does not match', () => {
    render(
      <MemoryRouter initialEntries={['/feed']}>
        <ButtonLink to="/account" titleName="Account" />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /account/i });
    expect(link).toHaveClass(styles.link);
    expect(link).not.toHaveClass(styles.active);
    expect(link).not.toHaveAttribute('aria-current');
  });
});

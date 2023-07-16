// Write your tests here
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AppClass from './AppClass';

test('sanity', () => {
  expect(true).toBe(true)
})

test('renders without errors', () => {

  render(<AppClass/>);

});

test('renders coordinates', () => {

  render(<AppClass/>);

  const coordinatesHeader = screen.queryByText(/Coordinates/)

  expect(coordinatesHeader).toBeInTheDocument();
});


test('renders up', () => {

  render(<AppClass/>);

  const upButton = screen.queryByText(/UP/)

  expect(upButton).toBeInTheDocument();
});

test('renders reset', () => {

  render(<AppClass/>);

  const resetButton = screen.queryByText(/reset/)

  expect(resetButton).toBeInTheDocument();
});

test('can type in input feild', () => {

  render(<AppClass/>);

  const emailField = screen.queryByPlaceholderText(/type email/i);
    userEvent.type(emailField, 'jasemgreer@gmail.com');

  const email = screen.queryByText(/jasemgreer@gmail.com/)
  expect(email).toBeInTheDocument();
});
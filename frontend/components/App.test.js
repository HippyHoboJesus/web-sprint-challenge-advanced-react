// Write your tests here
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';
import AppClass from './AppClass';

test('sanity', () => {
  expect(true).toBe(false)
})

test('renders without errors', () => {

  render(<AppClass/>);

});

test('renders coordinates', () => {

  render(<AppClass/>);

  const coordinatesHeader = screen.queryByText(/Coordinates/)

  expect(coordinatesHeader).toBeInTheDocument();
});
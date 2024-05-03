import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";
import '@testing-library/jest-dom';
class IntersectionObserver {
    constructor() {}
  
    observe() {
      // do nothing
    }
  
    unobserve() {
      // do nothing
    }
    disconnect(){

    }
  }
  
  global.IntersectionObserver = IntersectionObserver;
jest.mock('../../assets/video/header.mp4', () => 'mocked-video-url');
jest.mock('./Header.css', () => ({}));


describe("Header component", () => {
  test("renders header for home page", () => {
    const { getByText, getByAltText } = render(
      <Header text="Quizzy" page="home" img="image-url" />
    );
    const headerTitle = getByText("Meet Quizzy");
    const headerSubtitle = getByText("The next generation interviewer bot");
    const tryButton = getByText("Try it now!");

    expect(headerTitle).toBeInTheDocument();
    expect(headerSubtitle).toBeInTheDocument();
    expect(tryButton).toBeInTheDocument();
  });

  test("renders small header for infoPage", () => {
    const { getByText, getByAltText } = render(
      <Header text="Info" page="infoPage" img="image-url" />
    );
    const headerTitle = getByText("Info");

    expect(headerTitle).toBeInTheDocument();
  });

  test("renders medium header for other pages", () => {
    const { getByText, getByAltText } = render(
      <Header text="Other" page="otherPage" img="image-url" />
    );
    const headerTitle = getByText("Other");

    expect(headerTitle).toBeInTheDocument();
  });
});

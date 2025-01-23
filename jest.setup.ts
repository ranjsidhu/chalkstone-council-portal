import "@testing-library/jest-dom";
require("jest-fetch-mock").enableMocks();
jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

import * as assert from "assert";
import { encode } from "../encoder";

suite("Encoder Test Suite", () => {
  test("Encode function should return an array of single tokens", () => {
    const input = "Hello, world!";
    const expectedOutput = ["Hello", ",", " world", "!"];

    const result = encode(input);

    assert.deepStrictEqual(result, expectedOutput);
  });

  test("Encode function should handle empty input", () => {
    const input = "";
    const expectedOutput: string[] = [];

    const result = encode(input);

    assert.deepStrictEqual(result, expectedOutput);
  });

  test("Encode function should handle special characters", () => {
    const input = "Hello, @world!";
    const expectedOutput = ["Hello", ",", " @", "world", "!"];

    const result = encode(input);

    assert.deepStrictEqual(result, expectedOutput);
  });

  test("Encode function should handle utf-8 language", () => {
    const input = "שלו";
    const expectedOutput = ["ש", "ל", "ו"];

    const result = encode(input);

    assert.deepStrictEqual(result, expectedOutput);
  });
});

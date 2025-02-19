import { expect, test, describe } from "vitest";
import { cleanId } from "../src/cleaner";

describe("clean IDs", () => {
  test("random characters", () => {
    expect(cleanId('1gh#j"k!;[34hjkl5')).toBe("1ghjk34hjkl5");
  });

  //   no edits
  //   slash at start
  //   slash at end
  //   2 start
  //   2 end
  //   (2 middle)
  //   multiple start
  //   multiple end
  //   (multiple middle)
  // repeat with back slashes

  test("1 segment: 12t3st45", async () => {
    const tests = [
      "12t3st45",
      "/12t3st45",
      "12t3st45/",
      "//12t3st45",
      "12t3st45//",
      "///12t3st45",
      "12t3st45///",

      "\\12t3st45",
      "12t3st45\\",
      "\\\\12t3st45",
      "12t3st45\\\\",
      "\\\\\\12t3st45",
      "12t3st45\\\\\\",
    ];

    tests.forEach((test) => {
      expect(cleanId(test)).toBe("12t3st45");
    });
  });

  test("2 segments: 12t3st45/6a7b8c", async () => {
    const tests = [
      "12t3st45/6a7b8c",
      "/12t3st45/6a7b8c",
      "12t3st45/6a7b8c/",
      "//12t3st45/6a7b8c",
      "12t3st45/6a7b8c//",
      "12t3st45//6a7b8c",
      "///12t3st45/6a7b8c",
      "12t3st45/6a7b8c///",
      "12t3st45///6a7b8c",

      "\\12t3st45\\6a7b8c",
      "12t3st45\\6a7b8c\\",
      "\\\\12t3st45\\6a7b8c",
      "12t3st45\\6a7b8c\\\\",
      "12t3st45\\\\6a7b8c",
      "\\\\\\12t3st45\\6a7b8c",
      "12t3st45\\6a7b8c\\\\\\",
      "12t3st45\\\\\\6a7b8c",
    ];

    tests.forEach((test) => {
      expect(cleanId(test)).toBe("12t3st45/6a7b8c");
    });
  });

  test("3 segments (last segment 1 char): 12t3st45/6a7b8c/c", async () => {
    const tests = [
      "12t3st45/6a7b8c/c",
      "/12t3st45/6a7b8c/c",
      "12t3st45/6a7b8c/c/",
      "//12t3st45/6a7b8c/c",
      "12t3st45/6a7b8c/c//",
      "12t3st45//6a7b8c/c",
      "///12t3st45/6a7b8c/c",
      "12t3st45/6a7b8c/c///",
      "12t3st45///6a7b8c/c",

      "\\12t3st45\\6a7b8c\\c",
      "12t3st45\\6a7b8c\\c\\",
      "\\\\12t3st45\\6a7b8c\\c",
      "12t3st45\\6a7b8c\\c\\\\",
      "12t3st45\\\\6a7b8c\\c",
      "12t3st45\\6a7b8c\\\\c",
      "\\\\\\12t3st45\\6a7b8c\\c",
      "12t3st45\\6a7b8c\\c\\\\\\",
      "12t3st45\\\\\\6a7b8c\\c",
      "12t3st45\\6a7b8c\\\\\\c",
    ];

    tests.forEach((test) => {
      expect(cleanId(test)).toBe("12t3st45/6a7b8c/c");
    });
  });
});

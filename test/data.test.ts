import { fs, vol } from "memfs";
import { describe, expect, beforeEach, test, vi } from "vitest";
import { File } from "../src/data.ts";
import { open } from "../src/handler.ts";

vi.mock("node:fs");
vi.mock("node:fs/promises");

beforeEach(() => {
  // reset the state of in-memory fs
  vol.reset();
  fs.mkdirSync("/data");
});

describe("new Data", async () => {
  test("parses read properly: file exists", async () => {
    // setup fs
    fs.writeFileSync(
      "/data/test.yml",
      `test:
  content: "hello world"
  value: 5
  array:
    - 1
    - 2
    - 3`
    );

    // basecase
    expect((await new File("test").read()).data).toStrictEqual({
      test: {
        content: "hello world",
        value: 5,
        array: [1, 2, 3],
      },
    });
  });

  test("parses read properly: file does not exist", async () => {
    expect((await new File("test").read()).data).toStrictEqual({});
  });

  test.todo("readRaw a file", () => {});

  test.todo("write a file", () => {});

  test.todo("writeRaw a file", () => {});
});

describe("open", () => {
  test("should return a file: base case", async () => {
    // setup fs
    const content = `test:
  content: "hello world"
  value: 5
  array:
    - 1
    - 2
    - 3`;
    fs.writeFileSync("/data/test.yml", content);

    // basecase
    expect(await open("test")).toBe(content);
  });

  test("should return a file: nested", async () => {
    // setup fs
    fs.mkdirSync("/data/c");
    fs.writeFileSync("/data/c/lorem.yml", `test: content`);

    // subfolder case
    expect(await open("c/lorem")).toStrictEqual(`test: content`);
  });

  test("should return a file: create file if missing", async () => {
    // file not found case
    expect(await open("failure")).toStrictEqual("");
    expect(fs.readFileSync("/data/failure.yml", "utf8")).toBe("");

    // file not found nested case
    expect(await open("c/failure")).toStrictEqual("");
    expect(fs.readFileSync("/data/c/failure.yml", "utf8")).toBe("");

    // file not found nested case
    expect(await open("c/abc/failure")).toStrictEqual("");
    expect(fs.readFileSync("/data/c/abc/failure.yml", "utf8")).toBe("");
  });
});

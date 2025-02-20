import * as YAML from "yaml";
import { cleanId } from "./cleaner";
import { open } from "./handler";
import * as fs from "fs";
import { readFile } from "fs/promises";

export class File {
  #content: Promise<Object>;
  #id: string;

  constructor(id: string) {
    this.#id = cleanId(id);
    this.#content = open(this.#id).then((x) => YAML.parse(x) ?? {});
  }

  get id(): string {
    return this.#id;
  }

  async read(): Promise<{
    state: "clean" | "dirty" | undefined;
    data: Object;
  }> {
    return { state: undefined, data: await this.#content };
  }
  async readRaw(): Promise<Blob> {
    // use openAsBlob if it exists bc its probably better and more robust
    if (fs.openAsBlob) {
      return await fs.openAsBlob(`/data/${this.#id}.yml`);
    }

    // fallback when openAsBlob doesn't work
    const file = await readFile(`/data/${this.#id}.yml`);
    return new Blob([file]);
  }

  async write(data: Object): Promise<void> {}
  async writeRaw(data: string | Buffer): Promise<void> {}
}

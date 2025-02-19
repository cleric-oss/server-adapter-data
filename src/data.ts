import * as YAML from "yaml";
import { cleanId } from "./cleaner";
import { open } from "./handler";

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
  async readRaw(): Promise<void> {}

  async write(data: Object): Promise<void> {}
  async writeRaw(data: string | Buffer): Promise<void> {}
}

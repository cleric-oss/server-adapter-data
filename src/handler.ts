import { cleanId } from "./cleaner";
import { readFile, writeFile, mkdir } from "fs/promises";

export async function open(id: string) {
  id = cleanId(id);

  let file;
  try {
    file = await readFile(`/data/${id}.yml`, "utf8");
  } catch (_e) {
    // store e as an error
    const e = new Error(
      _e instanceof Error ? _e.message : (_e as any).toString()
    ) as Error;
    // if error message doesnt start with ENOENT, throw the original error
    if (!e.message.match(/^ENOENT/gm)) throw _e;

    // create file if it is missing
    // identify the folders
    const folders = id.split("/").slice(0, -1);
    // for each folder
    folders.forEach(async (_: string, i: number) => {
      try {
        await mkdir(`/data/${folders.slice(0, i + 1).join("/")}`);
      } catch {}
    });
    await writeFile(`/data/${id}.yml`, "");

    file = "";
  }

  return file;
}

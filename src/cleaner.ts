
export function cleanId(id: string) {
  // remove all chars except from a-z A-Z 0-9 "." "\" "/"
  let out = id.replaceAll(/[^a-zA-Z0-9.\\\/]/gm, "");
  // turn all slashes to /
  out = out.replaceAll("\\", "/");
  // replace sequences of / with a single /
  out = out.replaceAll(/\/+/gm, "/");
  // discard / at the start
  out = out.replaceAll(/^\//gm, "");
  // discard / at the end
  out = out.replaceAll(/\/$/gm, "");
  return out;
}

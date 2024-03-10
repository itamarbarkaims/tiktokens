import { TiktokenModel, encoding_for_model } from "tiktoken";

export function encode(input: string, model: TiktokenModel = "gpt-4"): string[] {
  const singleTokens: string[] = [];
  const enc = encoding_for_model(model);
  const tokenBytes = enc.encode(input);
  tokenBytes.forEach((element) => {
    singleTokens.push(fromBinaryArray(enc.decode_single_token_bytes(element)));
  });

  return singleTokens;
}

function fromBinaryArray(bytes: Uint8Array) {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(bytes);
}

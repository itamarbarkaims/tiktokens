export interface ITokensOutput {
  readonly count: number;
  readonly tokens: string[];
}

export class TokensOutput implements ITokensOutput {
  constructor(tokens: string[]) {
    this.tokens = tokens;
    this.count = tokens.length;
  }

  count: number;
  tokens: string[];
}

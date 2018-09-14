
declare module '@semantic-release/error' {
  export default class SemanticReleaseError {
    constructor(
      error: string,
      code: string,
      message: string,
    )
  }
}

declare module '@semantic-release/error' {
  export default class SemanticReleaseError {
    constructor(
      error: string,
      code: string,
      message: string,
    )
  }
}

declare module 'plist' {
  const plist: any;
  export default plist;
}
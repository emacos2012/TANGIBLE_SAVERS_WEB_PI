// CSS type declarations for side-effect imports
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

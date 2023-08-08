export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['md-filled-button']: React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >
      ['md-outlined-field']: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement & {
        label: string
      }>, HTMLInputElement & {
        label: string
      }>
    }
  }
}

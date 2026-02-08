export const selectbutton = {
    css : () => `

      .p-togglebutton {
      background-color: var(--guru-surface-0) !important;
      border: 1px solid var(--guru-surface-300) !important;
      border-radius: var(--guru-border-radius-sm) !important;
    .p-togglebutton-content {
      background-color: var(--guru-surface-0);
      color: var(--guru-gray-700) !important;
      border-radius: unset;
    }
    &.p-togglebutton-checked {
            background-color: var(--guru-primary-500);
            color: var(--guru-surface-0);
            padding: unset;
      .p-togglebutton-content {
        background-color: var(--guru-primary-500);
        color: var(--guru-surface-0) !important;
        border-radius: var(--guru-border-radius-md);
      }
    }
    `
        
      
}

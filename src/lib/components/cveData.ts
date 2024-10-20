import { writable, type Writable } from 'svelte/store'
export const cveData: Writable<CVEList | { vendor: string, products: string[] }> = writable()
import { ISnippet } from './snippet';


export interface ITemplate {
    id?: string | null
    name?: string | null
    snippets?: ISnippet[] | null
}

export class Template implements ITemplate {
    constructor(
        public id: string | null = null,
        public name: string | null = null,
        public width: number | null = null,
        public height: number | null = null,
        public snippets: (ISnippet | null)[]  | null = null,
    ) { }
}
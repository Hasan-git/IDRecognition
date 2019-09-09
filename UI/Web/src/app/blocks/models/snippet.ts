import { IDimension, Dimension } from './dimension';

export interface ISnippet {
    metadata?: string | null
    dimensions?: IDimension | null
}

export class Snippet implements ISnippet {
    constructor(
        public metadata: string | null = null,
        public dimensions: IDimension | null = new Dimension(),
    ) { }
}
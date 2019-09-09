
export interface IDimension {
    x?: number | null
    y?: number | null
    width?: number | null
    height?: number | null
}

export class Dimension implements IDimension {
    constructor(
        public x: number | null = null,
        public y: number | null = null,
        public width: number | null = null,
        public height: number | null = null,
    ) { }
}
export interface Sources {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface DataSources {
    source: Sources;
}

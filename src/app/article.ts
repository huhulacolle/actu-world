export interface Article {
    source?: {
        id?: number;
        name?: string;
    };
    title?: string;
    description?: string;
    url?: string;
    urlToImage?: string;
    publishAt?: string;
    content: string;
}

export interface Data {
    articles: Article;
}

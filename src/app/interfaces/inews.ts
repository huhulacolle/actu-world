export interface INews {
    articles: {
        url: string;
        urlToImage: string;
        source: {
            name: string;
        };
        title: string;
        description: string;
        content: string;
    };
}

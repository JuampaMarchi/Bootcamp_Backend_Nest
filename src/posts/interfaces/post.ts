export class Posts {
    title: string;
    content: string;
    author: string;
    creatorId: string;
    category: string[];
    comments: [
        {
            comment: string,
            commenterId: string
        }
    ];
}
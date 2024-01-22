export class Posts {
    post: string;
    creatorId: string;
    likes: number;
    comments: [
        {
            comment: string,
            commenterId: string
        }
    ];
}
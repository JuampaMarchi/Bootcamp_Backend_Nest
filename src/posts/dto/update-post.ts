export class UpdatePostDto {
    readonly title?: string;
    readonly content?: string;
    readonly author?: string;
    readonly creatorId: string;
    readonly category?: string[];
    readonly comments?: [
        {
            comment?: string,
            commenterId?: string
        }
    ];
}
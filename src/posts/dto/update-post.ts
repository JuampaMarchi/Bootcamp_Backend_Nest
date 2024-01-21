export class UpdatePostDto {
    readonly post?: string;
    readonly creatorId?: string;
    readonly likes?: number;
    readonly comments?: [
        {
            comment?: string,
            commenterId?: string,
            likes?: number,
        }
    ];
}
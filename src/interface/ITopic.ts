export interface ITopic {
    id: string;
    title: string;
    date: Date;
    ownerkeyImage: string;
    description: string;  
    likes: string; 
    dislikes: string;
    voteFor?: string;
    voteAgainst?: string;
}
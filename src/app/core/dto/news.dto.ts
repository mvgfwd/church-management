export interface NewsDTO {
  id: number;
  thumbnail?: File; //IMAGE
  title: string;
  category:
    | 'baptism'
    | 'marriage'
    | 'death'
    | 'penalty'
    | 'birthday'
    | 'worship'
    | 'financial';
  content: string;
  publishedDate: Date;
}

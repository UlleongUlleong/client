export type ChatRoomType = {
  id: number;
  ownerId: number;
  name: string;
  description: string;
  theme: theme;
  maxParticipants: number;
  alcoholCategory: [];
  createdAt: string;
};

export type theme = {
  id: string;
  url: string;
};

export interface Image {
  width: number;
  height: number;
  formats: {
    thumbnail: {
      url: string;
    };
    small: {
      url: string;
    };
  };
}

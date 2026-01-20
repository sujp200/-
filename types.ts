
export interface Project {
  id: string;
  title: string;
  titleEn: string;
  mainImage: string;
  images: string[];
  info: {
    design: string;
    construction: string;
    photograph: string;
    year: string;
    site: string;
    usage: string;
  };
  descriptionKr: string;
  descriptionEn: string;
  logos: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Channel {
  id: string;
  name: string;
  icon: string;
  url: string;
  thumbnail: string;
}

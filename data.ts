
import { Project, TeamMember, Channel } from './types';

// Helper to generate dummy projects for layout testing
const generateDummyProjects = (count: number, startId: number): Project[] => {
  const dummyData: Project[] = [];
  const baseProjects = [
    { title: '한남동 펜트하우스', titleEn: 'HANNAM PENTHOUSE', usage: 'Residential' },
    { title: '성수 오피스 쇼룸', titleEn: 'SEONGSU SHOWROOM', usage: 'Commercial' },
    { title: '평창동 단독주택', titleEn: 'PYEONGCHANG RESIDENCE', usage: 'Residential' },
    { title: '압구정 플래그십 스토어', titleEn: 'APGUJEONG FLAGSHIP', usage: 'Retail' },
    { title: '제주 스테이 오름', titleEn: 'JEJU STAY OREUM', usage: 'Hospitality' },
  ];

  for (let i = 0; i < count; i++) {
    const base = baseProjects[i % baseProjects.length];
    const id = startId + i;
    dummyData.push({
      id: `project-${id}`,
      title: `${base.title} ${id}`,
      titleEn: `${base.titleEn} VOL.${id}`,
      mainImage: `https://picsum.photos/id/${(id % 50) + 140}/1200/1600`, // Using taller images for 3:4 aspect
      images: [
        `https://picsum.photos/id/${id + 10}/800/600`,
        `https://picsum.photos/id/${id + 11}/800/600`,
      ],
      info: {
        design: 'CUCKOO STUDIO',
        construction: 'CUCKOO STUDIO',
        photograph: 'Internal Team',
        year: '2024',
        site: 'Seoul, South Korea',
        usage: base.usage
      },
      descriptionKr: '뻐꾸기인테리어의 감각으로 재해석된 공간입니다. 본질적인 아름다움에 집중합니다.',
      descriptionEn: 'A space reinterpreted with the sensibility of Cuckoo Interior. We focus on essential beauty.',
      logos: ['https://picsum.photos/id/20/100/100']
    });
  }
  return dummyData;
};

export const projects: Project[] = [
  {
    id: 'kyochon-pilbang',
    title: '교촌필방 오마카세 묵암',
    titleEn: 'KYOCHON PILBANG FINE DINING | MUKAM',
    mainImage: 'https://picsum.photos/id/122/1200/1600',
    images: [
      'https://picsum.photos/id/101/800/600',
      'https://picsum.photos/id/102/800/600',
      'https://picsum.photos/id/103/800/600',
      'https://picsum.photos/id/104/800/600',
    ],
    info: {
      design: 'NONESPACE',
      construction: 'NONESPACE',
      photograph: 'Septto',
      year: '2023',
      site: '127 Bogwang-ro, Yongsan-gu, Seoul',
      usage: 'Pub & Restaurant'
    },
    descriptionKr: '1991년 구미 작은 동네에서 시작한 교촌치킨은 "정도경영"이라는 슬로건을 바탕으로 약 500개의 치킨 브랜드 사이에서 이제는 누구나 아는 대한민국의 치킨 문화를 선도하는 국민 브랜드로 성장한 기업입니다. "묵암"은 교촌의 본질을 반영한 공간으로 MZ세대와 접점을 만들고 진정성을 알릴 수 있는 공간을 만들고자 했습니다.',
    descriptionEn: 'Founded in 1991 in a small town in Gumi, Kyochon Chicken began with the slogan "Jeongdo Management". Mukam is a space that reflects the essence of Kyochon, aiming to create a point of contact with the MZ generation and convey authenticity.',
    logos: ['https://picsum.photos/id/20/100/100']
  },
  ...generateDummyProjects(24, 1) // Generates 24 more projects to total 25
];

export const team: TeamMember[] = [
  { id: '1', name: '김동규', role: 'Main Designer', avatar: 'https://picsum.photos/id/64/100/100' },
  { id: '2', name: '이지훈', role: 'Field Team', avatar: 'https://picsum.photos/id/65/100/100' },
  { id: '3', name: '최아름', role: 'Video Team', avatar: 'https://picsum.photos/id/66/100/100' },
  { id: '4', name: '박민석', role: '3D Designer', avatar: 'https://picsum.photos/id/67/100/100' },
];

export const channels: Channel[] = [
  { 
    id: 'insta', 
    name: 'Instagram', 
    icon: 'Instagram', 
    url: 'https://instagram.com', 
    thumbnail: 'https://picsum.photos/id/1/400/300' 
  },
  { 
    id: 'blog', 
    name: 'Naver Blog', 
    icon: 'Book', 
    url: 'https://blog.naver.com', 
    thumbnail: 'https://picsum.photos/id/2/400/300' 
  },
  { 
    id: 'yt', 
    name: 'YouTube', 
    icon: 'Youtube', 
    url: 'https://youtube.com', 
    thumbnail: 'https://picsum.photos/id/3/400/300' 
  },
];


import { Project, TeamMember, Channel } from './types';

// Curated Interior Image URLs for a high-end feel
const interiorImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80", // Modern Living
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80", // Luxury Kitchen
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80", // Minimal Bedroom
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80", // Designer Chair
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80", // Commercial Office
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80", // Boutique Restaurant
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80", // Apartment Lobby
  "https://images.unsplash.com/photo-1616489953149-80516597950c?auto=format&fit=crop&w=1200&q=80", // Modern Bathroom
  "https://images.unsplash.com/photo-1505691722718-250393ec4154?auto=format&fit=crop&w=1200&q=80", // Penthouse View
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80"  // Pop-up store feel
];

const generateDummyProjects = (count: number, startId: number): Project[] => {
  const dummyData: Project[] = [];
  const baseProjects = [
    { title: '한남동 하이엔드 펜트하우스', titleEn: 'HANNAM LUXURY PENTHOUSE', usage: 'Residential' },
    { title: '성수 플래그십 스토어', titleEn: 'SEONGSU FLAGSHIP STORE', usage: 'Commercial' },
    { title: '청담동 프라이빗 오피스', titleEn: 'CHEONGDAM PRIVATE OFFICE', usage: 'Office' },
    { title: '제주 프리미엄 스테이', titleEn: 'JEJU PREMIUM STAY', usage: 'Hospitality' },
    { title: '반포 써밋 아파트 리모델링', titleEn: 'BANPO SUMMIT REMODELING', usage: 'Residential' },
  ];

  for (let i = 0; i < count; i++) {
    const base = baseProjects[i % baseProjects.length];
    const id = startId + i;
    // Generate 20-30 images for each dummy project to test the new grid
    const gallery = Array.from({ length: 24 }, (_, idx) => interiorImages[(id + idx) % interiorImages.length]);
    
    dummyData.push({
      id: `project-${id}`,
      title: `${base.title}`,
      titleEn: `${base.titleEn} | ${2020 + (id % 5)}`,
      mainImage: interiorImages[id % interiorImages.length],
      images: gallery,
      info: {
        design: 'BBEOGGUGI',
        construction: 'BBEOGGUGI',
        photograph: 'Studio B',
        year: `${2020 + (id % 5)}`,
        site: 'Seoul / Gyeonggi',
        usage: base.usage
      },
      descriptionKr: '공간의 본질에 집중하며, 사용자의 라이프스타일을 최우선으로 고려한 디자인입니다. 고급 자재와 정교한 시공을 통해 시간이 흘러도 변치 않는 가치를 제안합니다.',
      descriptionEn: 'Focusing on the essence of space, this design prioritizes the user\'s lifestyle. Through high-end materials and sophisticated construction, we propose value that remains unchanged over time.',
      logos: []
    });
  }
  return dummyData;
};

export const projects: Project[] = [
  {
    id: 'kyochon-pilbang',
    title: '교촌필방 오마카세 묵암',
    titleEn: 'KYOCHON PILBANG FINE DINING | MUKAM',
    mainImage: 'https://images.unsplash.com/photo-1550966842-28c199833749?auto=format&fit=crop&w=1200&q=80',
    images: Array.from({ length: 25 }, (_, i) => interiorImages[i % interiorImages.length]),
    info: {
      design: 'BBEOGGUGI',
      construction: 'BBEOGGUGI',
      photograph: 'Septto',
      year: '2023',
      site: '127 Bogwang-ro, Yongsan-gu, Seoul',
      usage: 'Commercial / Restaurant'
    },
    descriptionKr: '전통과 현대가 공존하는 오마카세 공간입니다. "묵암"은 교촌의 본질을 반영한 공간으로 MZ세대와 접점을 만들고 진정성을 알릴 수 있는 감각적인 인테리어를 선보입니다.',
    descriptionEn: 'An omakase space where tradition and modernity coexist. Mukam reflects the essence of Kyochon, featuring a sensible interior designed to connect with the MZ generation.',
    logos: []
  },
  ...generateDummyProjects(15, 1)
];

export const team: TeamMember[] = [
  { id: '1', name: '김성환', role: 'CEO', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: '2', name: '박서인', role: 'Designer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: '3', name: '유은지', role: 'Designer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: '4', name: '서명원', role: 'PD', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80' },
];

export const channels: Channel[] = [
  { 
    id: 'insta', 
    name: 'Instagram', 
    icon: 'Instagram', 
    url: 'https://www.instagram.com/bbeoggugi_official/', 
    thumbnail: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=1000&auto=format&fit=crop' 
  },
  { 
    id: 'blog', 
    name: 'Naver Blog', 
    icon: 'Book', 
    url: 'https://blog.naver.com/lali8122', 
    thumbnail: 'https://images.unsplash.com/photo-1541140532154-b024d715b909?q=80&w=1000&auto=format&fit=crop' 
  },
  { 
    id: 'yt', 
    name: 'YouTube', 
    icon: 'Youtube', 
    url: 'https://www.youtube.com/@bbeoggugi_homes', 
    thumbnail: 'https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9?q=80&w=1000&auto=format&fit=crop' 
  },
];

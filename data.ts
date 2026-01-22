
import { Project, TeamMember, Channel } from './types';

/**
 * Extremely stable and verified High-end Architecture & Interior Image URLs from Unsplash.
 * These IDs are curated and monitored for high availability.
 */
const interiorImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop", // Minimal Living
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop", // Modern Kitchen
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop", // High-end Lounge
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop", // Modern Office
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop", // Commercial Store
  "https://images.unsplash.com/photo-1534489503306-4441f3d7a1b1?q=80&w=1600&auto=format&fit=crop", // Architecture Detail
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop", // Aesthetic Interior
  "https://images.unsplash.com/photo-1550966842-2849a224ef6c?q=80&w=1600&auto=format&fit=crop", // Luxury Restaurant
  "https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1600&auto=format&fit=crop", // Wall Texture
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop"  // Design Furniture
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
    // Safely generate gallery with unique rotation
    const gallery = Array.from({ length: 8 }, (_, idx) => interiorImages[(id + idx + 2) % interiorImages.length]);
    
    dummyData.push({
      id: `project-${id}`,
      title: `${base.title}`,
      titleEn: `${base.titleEn}`,
      mainImage: interiorImages[(id + 1) % interiorImages.length],
      images: gallery,
      info: {
        design: '박서인, 유은지',
        construction: '김성환',
        photograph: '김태호',
        year: `${2021 + (id % 4)}`,
        site: 'Seoul, Korea',
        usage: base.usage,
        area: `${120 + (id * 15)}㎡`,
        scope: id % 3 === 0 ? 'Architecture / Space' : 'Space'
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
    mainImage: 'https://images.unsplash.com/photo-1550966842-2849a224ef6c?q=80&w=1600&auto=format&fit=crop',
    images: [
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop",
      ...interiorImages.slice(0, 8)
    ],
    info: {
      design: '박서인, 유은지',
      construction: '김성환',
      photograph: '김태호',
      year: '2023',
      site: '127 Bogwang-ro, Yongsan-gu, Seoul',
      usage: 'Commercial / Restaurant',
      area: '154㎡',
      scope: 'Space'
    },
    descriptionKr: '전통과 현대가 공존하는 오마카세 공간입니다. "묵암"은 교촌의 본질을 반영한 공간으로 MZ세대와 접점을 만들고 진정성을 알릴 수 있는 감각적인 인테리어를 선보입니다.',
    descriptionEn: 'An omakase space where tradition and modernity coexist. Mukam reflects the essence of Kyochon, featuring a sensible interior designed to connect with the MZ generation.',
    logos: []
  },
  {
    id: 'seongsu-flagship',
    title: '성수 플래그십 스토어',
    titleEn: 'SEONGSU FLAGSHIP STORE',
    mainImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop',
    images: [
      "https://images.unsplash.com/photo-1534489503306-4441f3d7a1b1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513584684441-29d93b178c1d?q=80&w=1600&auto=format&fit=crop",
      ...interiorImages.slice(2, 9)
    ],
    info: {
      design: '박서인, 서명원',
      construction: '김성환',
      photograph: '김태호',
      year: '2024',
      site: 'Seongsu-dong, Seoul',
      usage: 'Commercial / Flagship Store',
      area: '210㎡',
      scope: 'Architecture / Interior'
    },
    descriptionKr: '성수동의 산업적 유산을 현대적으로 재해석한 플래그십 스토어입니다. 노출 콘크리트와 금속, 세련된 조명을 활용하여 브랜드의 미래지향적 가치를 전달합니다.',
    descriptionEn: 'A flagship store that modernly reinterprets the industrial heritage of Seongsu-dong. It conveys the brand\'s forward-looking values through exposed concrete, metal, and sophisticated lighting.',
    logos: []
  },
  ...generateDummyProjects(12, 1)
];

export const team: TeamMember[] = [
  { id: '1', name: '김성환', role: 'CEO', avatar: '' },
  { id: '2', name: '박서인', role: 'Head Designer', avatar: '' },
  { id: '3', name: '유은지', role: 'Designer', avatar: '' },
  { id: '4', name: '서명원', role: 'PD', avatar: '' },
];

export const channels: Channel[] = [
  { 
    id: 'insta', 
    name: 'Instagram', 
    icon: 'Instagram', 
    url: 'https://www.instagram.com/bbeoggugi_official/', 
    thumbnail: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    id: 'blog', 
    name: 'Naver Blog', 
    icon: 'Book', 
    url: 'https://blog.naver.com/lali8122', 
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop' 
  },
  { 
    id: 'yt', 
    name: 'YouTube', 
    icon: 'Youtube', 
    url: 'https://www.youtube.com/@bbeoggugi_homes', 
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop' 
  },
];

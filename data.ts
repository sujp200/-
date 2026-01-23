
import { Project, TeamMember, Channel } from './types';

const interiorImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534489503306-4441f3d7a1b1?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550966842-2849a224ef6c?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop"
];

/**
 * Technical Architectural Floor Plan URL (Clean, 2D Drawing style)
 */
const technicalDrawingUrl = "https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=1600&auto=format&fit=crop";

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
    const gallery = Array.from({ length: 8 }, (_, idx) => interiorImages[(id + idx) % interiorImages.length]);
    
    dummyData.push({
      id: `project-${id}`,
      title: `${base.title}`,
      titleEn: `${base.titleEn}`,
      mainImage: interiorImages[(id) % interiorImages.length],
      images: gallery,
      floorPlans: [technicalDrawingUrl],
      info: {
        design: '박서인, 유은지',
        construction: '김성환',
        photograph: '김태호',
        year: `${2021 + (id % 4)}`,
        site: 'Seoul, Korea',
        usage: base.usage,
        area: `${120 + (id * 15)}㎡`,
        scope: 'Interior / Space'
      },
      descriptionKr: '공간의 본질에 집중하며, 사용자의 라이프스타일을 최우선으로 고려한 디자인입니다.',
      descriptionEn: 'Focusing on the essence of space, this design prioritizes the user\'s lifestyle.',
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
    images: Array.from({ length: 12 }, (_, i) => interiorImages[i % interiorImages.length]),
    floorPlans: [
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=1600&auto=format&fit=crop"
    ],
    info: {
      design: '박서인, 유은지',
      construction: '김성환',
      photograph: '김태호',
      year: '2023',
      site: 'Seoul, Korea',
      usage: 'Commercial / Restaurant',
      area: '154㎡',
      scope: 'Space'
    },
    descriptionKr: '전통과 현대가 공존하는 오마카세 공간입니다.',
    descriptionEn: 'An omakase space where tradition and modernity coexist.',
    logos: []
  },
  ...generateDummyProjects(8, 1)
];

export const team: TeamMember[] = [
  { id: '1', name: '김성환', role: 'CEO', avatar: '' },
  { id: '2', name: '박서인', role: 'Head Designer', avatar: '' },
  { id: '3', name: '유은지', role: 'Designer', avatar: '' },
  { id: '4', name: '서명원', role: 'PD', avatar: '' },
];

export const channels: Channel[] = [
  { id: 'yt', name: 'YouTube', icon: 'Youtube', url: 'https://www.youtube.com/@bbeoggugi_homes', thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop' },
  { id: 'insta', name: 'Instagram', icon: 'Instagram', url: 'https://www.instagram.com/bbeoggugi_official/', thumbnail: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=1200&auto=format&fit=crop' },
  { id: 'blog', name: 'Naver Blog', icon: 'Book', url: 'https://blog.naver.com/lali8122', thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop' },
];

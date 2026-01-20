
import { Project, TeamMember, Channel } from './types';

export const projects: Project[] = [
  {
    id: 'kyochon-pilbang',
    title: '교촌필방 오마카세 묵암',
    titleEn: 'KYOCHON PILBANG FINE DINING | MUKAM',
    mainImage: 'https://picsum.photos/id/122/1200/800',
    images: [
      'https://picsum.photos/id/101/800/600',
      'https://picsum.photos/id/102/800/600',
      'https://picsum.photos/id/103/800/600',
      'https://picsum.photos/id/104/800/600',
      'https://picsum.photos/id/106/800/600',
      'https://picsum.photos/id/107/800/600',
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
    logos: [
      'https://picsum.photos/id/20/100/100',
      'https://picsum.photos/id/30/100/100',
      'https://picsum.photos/id/40/100/100'
    ]
  },
  {
    id: 'shilla-stay',
    title: '신라스테이 플러스 이호테우',
    titleEn: 'SHILLA STAY PLUS IHOTEWOO',
    mainImage: 'https://picsum.photos/id/123/1200/800',
    images: [
      'https://picsum.photos/id/108/800/600',
      'https://picsum.photos/id/109/800/600',
      'https://picsum.photos/id/110/800/600',
      'https://picsum.photos/id/111/800/600',
    ],
    info: {
      design: 'CUCKOO STUDIO',
      construction: 'CUCKOO STUDIO',
      photograph: 'Studio J',
      year: '2024',
      site: 'Jeju, South Korea',
      usage: 'Hotel & Hospitality'
    },
    descriptionKr: '신라스테이의 새로운 라인업인 "플러스"는 더욱 감각적이고 휴식에 집중된 공간을 지향합니다. 이호테우의 자연 경관을 내부로 끌어들이는 건축적 시퀀스를 제안했습니다.',
    descriptionEn: 'Shilla Stay Plus, a new lineup, aims for a more sensual and relaxation-focused space. We proposed an architectural sequence that brings the natural scenery of Ihotewoo indoors.',
    logos: ['https://picsum.photos/id/50/100/100']
  },
  {
    id: 'blue-bottle',
    title: '블루보틀 성수 아틀리에',
    titleEn: 'BLUE BOTTLE SEONGSU ATELIER',
    mainImage: 'https://picsum.photos/id/124/1200/800',
    images: [
      'https://picsum.photos/id/112/800/600',
      'https://picsum.photos/id/113/800/600',
      'https://picsum.photos/id/114/800/600',
    ],
    info: {
      design: 'CUCKOO STUDIO',
      construction: 'CUCKOO STUDIO',
      photograph: 'Lee Sang-hun',
      year: '2022',
      site: 'Seongsu-dong, Seoul',
      usage: 'Cafe & Atelier'
    },
    descriptionKr: '블루보틀의 미니멀리즘과 성수동의 산업적 유산을 결합하여 따뜻하면서도 정제된 커피 경험의 장을 디자인했습니다.',
    descriptionEn: 'Combining Blue Bottle’s minimalism with Seongsu-dong’s industrial heritage, we designed a space for a warm yet refined coffee experience.',
    logos: ['https://picsum.photos/id/60/100/100']
  },
  {
    id: 'naver-1784',
    title: '네이버 1784 워크스페이스',
    titleEn: 'NAVER 1784 WORKSPACE',
    mainImage: 'https://picsum.photos/id/125/1200/800',
    images: [
      'https://picsum.photos/id/115/800/600',
      'https://picsum.photos/id/116/800/600',
      'https://picsum.photos/id/117/800/600',
    ],
    info: {
      design: 'CUCKOO STUDIO',
      construction: 'CUCKOO STUDIO',
      photograph: 'Park Young-chae',
      year: '2022',
      site: 'Pangyo, South Korea',
      usage: 'Office'
    },
    descriptionKr: '첨단 기술과 인간의 감성이 공존하는 미래형 오피스 환경을 구축하기 위해 가변적이고 유연한 가구 배치를 핵심 요소로 삼았습니다.',
    descriptionEn: 'To build a futuristic office environment where advanced technology and human sensibility coexist, variable and flexible furniture arrangement was used as a key element.',
    logos: ['https://picsum.photos/id/70/100/100']
  },
  {
    id: 'time-villas',
    title: '의왕 타임빌라스',
    titleEn: 'TIME VILLAS UIWANG',
    mainImage: 'https://picsum.photos/id/126/1200/800',
    images: [
      'https://picsum.photos/id/118/800/600',
      'https://picsum.photos/id/119/800/600',
      'https://picsum.photos/id/120/800/600',
    ],
    info: {
      design: 'CUCKOO STUDIO',
      construction: 'CUCKOO STUDIO',
      photograph: 'Hong Seok-gyu',
      year: '2021',
      site: 'Uiwang-si, Gyeonggi-do',
      usage: 'Retail'
    },
    descriptionKr: '자연과 쇼핑의 경계를 허무는 "글라스 빌리지" 컨셉을 통해 고객들에게 새로운 야외 상업 공간 경험을 제공합니다.',
    descriptionEn: 'Through the "Glass Village" concept that blurs the boundary between nature and shopping, we provide customers with a new outdoor commercial space experience.',
    logos: ['https://picsum.photos/id/80/100/100']
  },
  {
    id: 'granhand',
    title: '그랑핸드 마포',
    titleEn: 'GRANHAND MAPO',
    mainImage: 'https://picsum.photos/id/127/1200/800',
    images: [
      'https://picsum.photos/id/121/800/600',
      'https://picsum.photos/id/122/800/600',
      'https://picsum.photos/id/123/800/600',
    ],
    info: {
      design: 'CUCKOO STUDIO',
      construction: 'CUCKOO STUDIO',
      photograph: 'Kim Jae-yoon',
      year: '2023',
      site: 'Mapo-gu, Seoul',
      usage: 'Retail / Showroom'
    },
    descriptionKr: '향기를 시각적, 촉각적 언어로 치환하여 브랜드의 정체성을 공간 곳곳에 녹여냈습니다. 거친 질감과 매끄러운 금속의 대비가 특징입니다.',
    descriptionEn: 'The brand identity was melted throughout the space by substituting scent into visual and tactile language. It features a contrast between rough textures and smooth metals.',
    logos: ['https://picsum.photos/id/90/100/100']
  }
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

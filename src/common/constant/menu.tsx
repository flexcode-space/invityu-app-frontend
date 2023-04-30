import MenuBride from '@/modules/create/components/information/menu/MenuBride';

export const createDataInformationMenu = [
  {
    order: 1,
    id: 'bride',
    title: 'Data Calon Mempelai',
    description: 'Isi data calon mempelai',
    target: '',
    icon: '/images/icons/information/ic-data-brides.svg',
    isRequired: false,
    isChecked: true,
    tag: '',
    render: () => <MenuBride />,
  },
  {
    order: 2,
    id: 'events',
    title: 'Rangkaian Acara',
    description: 'Acara, tanggal dan lainnya',
    target: '/create/information/events',
    icon: '/images/icons/information/ic-data-events.svg',
    isRequired: false,
    isChecked: true,
    tag: '',
    render: () => <>events</>,
  },
  {
    order: 3,
    id: 'link',
    title: 'Link Undangan',
    description: 'Buat link undangan',
    target: '/create/information/link',
    icon: '/images/icons/information/ic-data-link.svg',
    isRequired: true,
    isChecked: true,
    tag: '',
    render: () => <>link</>,
  },
];

export const createDataInformationMenuAdditional = [
  {
    order: 4,
    id: 'music',
    title: 'Musik',
    description: 'Pilih Musik Undangan',
    target: '/create/information/music',
    icon: '/images/icons/information/ic-data-music.svg',
    isRequired: false,
    tag: 'Premium',
    render: () => <>music</>,
  },
  {
    order: 5,
    id: 'quotes',
    title: 'Quotes',
    description: 'Pilih atau Buat Quotes',
    target: '/create/information/quotes',
    icon: '/images/icons/information/ic-data-quotes.svg',
    isRequired: false,
    tag: 'Premium',
    render: () => <>quotes</>,
  },
  {
    order: 6,
    id: 'galleries',
    title: 'Galeri',
    description: 'Maksimal 1 vidio & 5 foto',
    target: '/create/information/gallery',
    icon: '/images/icons/information/ic-data-gallery.svg',
    isRequired: false,
    tag: 'Ekslusif',
    isChecked: false,
    render: () => <>galleries</>,
  },
  {
    order: 7,
    id: 'stories',
    title: 'Couple Story',
    description: 'Maksimal 5 story',
    target: '/create/information/story',
    icon: '/images/icons/information/ic-data-story.svg',
    isRequired: false,
    tag: 'Ekslusif',
    isChecked: false,
    render: () => <>stories</>,
  },
  {
    order: 8,
    id: 'bank_or_wallet_account',
    title: 'Hadiah',
    description: 'Informasi rekening / e-wallet',
    target: '/create/information/gift',
    icon: '/images/icons/information/ic-data-gift.svg',
    isRequired: false,
    tag: 'Ekslusif',
    isChecked: false,
    render: () => <>bank_or_wallet_account</>,
  },
  {
    order: 9,
    id: 'live_streaming',
    title: 'Siaran Langsung',
    description: 'Cantumkan link streaming',
    target: '/create/information/gift',
    icon: '/images/icons/information/ic-data-live.svg',
    isRequired: false,
    tag: 'Ekslusif',
    isChecked: false,
    render: () => <>live_streaming</>,
  },
  {
    order: 10,
    id: 'opening_sentence',
    title: 'Informasi Lainnya',
    description: 'Pilih kalimat pembuka',
    target: '/create/information/gift',
    icon: '/images/icons/information/ic-data-more.svg',
    isRequired: false,
    tag: 'Ekslusif',
    isChecked: false,
    render: () => <>opening_sentence</>,
  },
];

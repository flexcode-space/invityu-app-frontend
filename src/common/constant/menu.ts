export const createDataInformationMenu = [
  [
    {
      order: 1,
      id: 'bride',
      title: "Data calon mempelai",
      description: "Isi data calon mempelai",
      target: "/create/information/brides",
      icon: "/images/icons/information/ic-data-brides.svg",
      isRequired: false,
      tag: null
    },
    {
      order: 2,
      id: 'events',
      title: "Rangkaian Acara",
      description: "Acara, tanggal dan lainnya",
      target: "/create/information/events",
      icon: "/images/icons/information/ic-data-events.svg",
      isRequired: false,
      tag: null
    },
    {
      order: 3,
      id: 'link',
      title: "Link Undangan",
      description: "Buat link undangan",
      target: "/create/information/link",
      icon: "/images/icons/information/ic-data-link.svg",
      isRequired: true,
      tag: null
    },

  ]
];

export const createDataInformationMenuAdditional = [
  [
    {
      order: 4,
      id: 'music',
      title: "Musik",
      description: "Pilih musik undangan",
      target: "/create/information/music",
      icon: "/images/icons/information/ic-data-music.svg",
      isRequired: false,
      tag: "Premium"
    },
    {
      order: 5,
      id: 'quotes',
      title: "Quotes",
      description: "Pilih atau buat quotes",
      target: "/create/information/quotes",
      icon: "/images/icons/information/ic-data-quotes.svg",
      isRequired: false,
      tag: "Premium"
    },
    {
      order: 6,
      id: 'galleries',
      title: "Galeri",
      description: "Maksimal 1 vidio & 5 foto",
      target: "/create/information/gallery",
      icon: "/images/icons/information/ic-data-gallery.svg",
      isRequired: false,
      tag: "Ekslusif",
      isChecked: false
    },
    {
      order: 7,
      id: 'stories',
      title: "Couple Story",
      description: "Maksimal 5 story",
      target: "/create/information/story",
      icon: "/images/icons/information/ic-data-story.svg",
      isRequired: false,
      tag: "Ekslusif",
      isChecked: false
    },
    {
      order: 8,
      id: 'bank_or_wallet_account',
      title: "Hadiah",
      description: "Informasi rekening / e-wallet",
      target: "/create/information/gift",
      icon: "/images/icons/information/ic-data-gift.svg",
      isRequired: false,
      tag: "Ekslusif",
      isChecked: false
    },
    {
      order: 9,
      id: 'live_streaming',
      title: "Siaran Langsung",
      description: "Cantumkan link siaran langsung",
      target: "/create/information/gift",
      icon: "/images/icons/information/ic-data-live.svg",
      isRequired: false,
      tag: "Ekslusif",
      isChecked: false
    },
    {
      order: 10,
      id: 'opening_sentence',
      title: "Informasi Lainnya",
      description: "Pilih kalimat pembuka",
      target: "/create/information/gift",
      icon: "/images/icons/information/ic-data-more.svg",
      isRequired: false,
      tag: "Ekslusif",
      isChecked: false
    },
  ]
];
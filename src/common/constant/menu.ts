export const createDataInformationMenu = [
  [
    {
      id: 1,
      title: "Data calon mempelai",
      description: "Isi data calon mempelai",
      target: "/create/information/brides",
      icon: "/images/icons/information/ic-data-brides.svg",
      isRequired: false,
      tag: null
    },
    {
      id: 2,
      title: "Rangkaian Acara",
      description: "Acara, tanggal dan lainnya",
      target: "/create/information/events",
      icon: "/images/icons/information/ic-data-events.svg",
      isRequired: false,
      tag: null
    },
    {
      id: 3,
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
      id: 4,
      title: "Musik",
      description: "Pilih musik undangan",
      target: "/create/information/music",
      icon: "/images/icons/information/ic-data-music.svg",
      isRequired: false,
      tag: "Premium"
    },
    {
      id: 5,
      title: "Quotes",
      description: "Pilih atau buat quotes",
      target: "/create/information/quotes",
      icon: "/images/icons/information/ic-data-quotes.svg",
      isRequired: false,
      tag: "Premium"
    },
    {
      id: 6,
      title: "Galeri",
      description: "Maksimal 1 vidio & 5 foto",
      target: "/create/information/gallery",
      icon: "/images/icons/information/ic-data-brides.svg",
      isRequired: false,
      tag: "Ekslusif",
      isChecked: false
    },
    {
      id: 7,
      title: "Couple Story",
      description: "Maksimal 5 story",
      target: "/create/information/story",
      icon: "/images/icons/information/ic-data-events.svg",
      isRequired: false,
      tag: "Ekslusif",
      isChecked: false
    },
    {
      id: 8,
      title: "Hadiah",
      description: "Informasi rekening / e-wallet",
      target: "/create/information/gift",
      icon: "/images/icons/information/ic-data-link.svg",
      isRequired: false,
      tag: "Ekslusif",
      isChecked: false
    },
  ]
];
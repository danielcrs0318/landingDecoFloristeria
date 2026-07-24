const unsplash = (id, width = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const heroImage = unsplash('photo-1563241527-3004b7be0ffd', 2000);

export const galleryImages = [
  { img: unsplash('photo-1519225421980-715cb0215aed'), title: 'Ramo romántico' },
  { img: unsplash('photo-1543168256-418811576931'), title: 'Centro de mesa' },
  { img: unsplash('photo-1465495976274-aa7a44e88dcd'), title: 'Boda' },
  { img: unsplash('photo-1563241527-3004b7be0ffd'), title: 'Bouquet' },
  { img: unsplash('photo-1526047932273-341f2a7631f9'), title: 'Arreglo floral' },
  { img: unsplash('photo-1487530811176-3780de880c2d'), title: 'Rosas' },
  { img: unsplash('photo-1463936575829-25148e1db1b8'), title: 'Minimalista' },
  { img: unsplash('photo-1490750967868-88aa4486c946'), title: 'Primavera' },
];

export const catalogImages = {
  ramoPrimavera: unsplash('photo-1490750967868-88aa4486c946', 600),
  centroElegante: unsplash('photo-1519225421980-715cb0215aed', 600),
  arregloRomantico: unsplash('photo-1563241527-3004b7be0ffd', 600),
  bouquetSilvestre: unsplash('photo-1463936575829-25148e1db1b8', 600),
  coronaFunebre: unsplash('photo-1455659817273-f96807779a3a', 600),
  cajaRosas: unsplash('photo-1582794545883-038f066a8146', 600),
};

export const avatarImages = {
  ana: unsplash('photo-1494790108377-be9c29b29330', 150),
  carlos: unsplash('photo-1599566150163-29194dcaad36', 150),
  lucia: unsplash('photo-1534528741775-53994a69daeb', 150),
};

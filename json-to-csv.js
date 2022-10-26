const {
  createWriteStream,
  promises: {
    readFile,
    rm,
    mkdir
  }
} = require('fs');

async function main() {
  const data = JSON.parse(
    await readFile('response.json')
  );

  const MEMBER_TYPES = {
    'HASTANE': 'hospital',
    'TIP MERKEZİ': 'medical_center',
    'POLİKLİNİK': 'clinic',
    'FİZİK TEDAVİ MERKEZİ': 'physiotherapist',
    'TIBBİ MALZEME': 'medical_supplier',
  };

  const OUTPUT_DIRECTORY = 'map-data';

  await rm(OUTPUT_DIRECTORY, { recursive: true });
  await mkdir(OUTPUT_DIRECTORY);

  const fileStreams = Object.entries(MEMBER_TYPES).reduce(
    (fileStreams, [key, value]) => ({
      ...fileStreams,
      [key]: createWriteStream(`${OUTPUT_DIRECTORY}/${value}.csv`),
    }),
    {}
  );

  // Write the CSV headers to the map data of every member type
  for (const fileStream of Object.values(fileStreams)) {
    fileStream.write([
      'ID',
      'Ad',
      'İlçe',
      'Adres',
      'Telefon',
      'Fax',
      'E-mail',
      'Bölge',
      'Geçerli Branşlar',
      'Lat',
      'Lon',
      'Kod'
    ].map(
      header => `"${header}"`
    ).join(',') + '\n');
  }

  // Direct (write) each entry to the respective map data file
  for (const {
    Tip,
    ID,
    KurumAdi,
    Ilce,
    Adres,
    Tel,
    Fax,
    Mail,
    Zones_Name,
    TamamlayiciUrunAnlasmaDurumu,
    GmapEnlem,
    GmapBoylam,
    Kurumkodu
  } of data.result.restResponse.content) {
    fileStreams[Tip].write([
      ID,
      KurumAdi,
      Ilce,
      Adres,
      Tel,
      Fax,
      Mail,
      Zones_Name,
      TamamlayiciUrunAnlasmaDurumu,
      GmapEnlem.replace(',', '.'),
      GmapBoylam.replace(',', '.'),
      Kurumkodu
    ].map(
      datum => `"${datum}"`
    ).join(',') + '\n');
  }

  for (const fileStream of Object.values(fileStreams)) {
    fileStream.end();
  }
}

main();

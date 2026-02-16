// ================== KONFIGURASI ==================
const FOLDER_ID = "1d2mdXt5djErCDJco7BqEhln4Hdpk0T4d";
const SPREADSHEET_ID = "1DInBlfDorzhPId6kmxvXSqFLTo5ZMJ-_UDAwdEbsq08";

// ================== WEB APP ==================
function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ================== UPLOAD FOTO ==================
function uploadImages(base64Array, prefix) {
  const folder = DriveApp.getFolderById(FOLDER_ID);
  let urls = [];

  base64Array.forEach((base64, i) => {
    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64),
      "image/jpeg",
      prefix + "_" + new Date().getTime() + "_" + i + ".jpg"
    );

    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    urls.push(file.getUrl());
  });

  return urls.join(", ");
}

// ================== SIMPAN PATROL ==================
function simpanPatrol(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("PATROL");

  const fotoUrls = uploadImages(data.foto, "PATROL");

  sheet.appendRow([
    new Date(),
    data.tanggal,
    data.peralatan,
    data.aktifitas,
    data.temuan,
    data.rekomendasi,
    data.status,
    data.keterangan,
    data.pic,
    fotoUrls
  ]);

  return "✅ Data Patrol berhasil disimpan!";
}

// ================== SIMPAN DOKUMENTASI ==================
function simpanDok(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("DOKUMENTASI");

  const fotoUrls = uploadImages(data.foto, "DOK");

  sheet.appendRow([
    new Date(),
    data.tanggal,
    data.jenis,
    data.aktifitas,
    data.peserta,
    data.tempat,
    fotoUrls
  ]);

  return "✅ Dokumentasi berhasil disimpan!";
}

// ================== SIMPAN ABSENSI ==================
function simpanAbsensi(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("ABSENSI");

  const fotoUrls = uploadImages(data.foto, "ABSEN");

  sheet.appendRow([
    new Date(),
    data.nama,
    data.tanggal,
    data.map,
    fotoUrls
  ]);

  return "✅ Absensi berhasil disimpan!";
}

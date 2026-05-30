var STORAGE_ANAHTARI = "harcamalar";
var harcamalar = [];

function veriyiYukle() {
    var raw = localStorage.getItem(STORAGE_ANAHTARI);

    if (raw === null) {
        harcamalar = ORNEK_VERILER.slice();
        veriyiKaydet();
    } else {
        try {
            harcamalar = JSON.parse(raw);
        } catch (hata) {
            harcamalar = [];
        }
    }
}

function veriyiKaydet() {
    localStorage.setItem(STORAGE_ANAHTARI, JSON.stringify(harcamalar));
}

function yeniIdUret() {
    if (harcamalar.length === 0) {
        return 1;
    }
    var enBuyuk = 0;
    for (var i = 0; i < harcamalar.length; i++) {
        if (harcamalar[i].id > enBuyuk) {
            enBuyuk = harcamalar[i].id;
        }
    }
    return enBuyuk + 1;
}

function kayitEkle(veri) {
    var yeniKayit = {
        id: yeniIdUret(),
        aciklama: veri.aciklama,
        tutar: veri.tutar,
        kategori: veri.kategori,
        tur: veri.tur,
        tarih: veri.tarih
    };
    harcamalar.push(yeniKayit);
    veriyiKaydet();
}

function kayitGuncelle(id, veri) {
    for (var i = 0; i < harcamalar.length; i++) {
        if (harcamalar[i].id === id) {
            harcamalar[i].aciklama = veri.aciklama;
            harcamalar[i].tutar = veri.tutar;
            harcamalar[i].kategori = veri.kategori;
            harcamalar[i].tur = veri.tur;
            harcamalar[i].tarih = veri.tarih;
            break;
        }
    }
    veriyiKaydet();
}

function kayitSil(id) {
    var onay = confirm("Bu kaydı silmek istediğine emin misin?");
    if (!onay) {
        return;
    }

    var yeniListe = [];
    for (var i = 0; i < harcamalar.length; i++) {
        if (harcamalar[i].id !== id) {
            yeniListe.push(harcamalar[i]);
        }
    }
    harcamalar = yeniListe;

    var duzenlenenIdMetin = document.getElementById("duzenlenen-id").value;
    if (duzenlenenIdMetin !== "" && parseInt(duzenlenenIdMetin, 10) === id) {
        duzenlemeModunuKapat();
    }

    veriyiKaydet();
    ekraniYenile();
}

function ekraniYenile() {
    ozetiGuncelle();
    listeyiGoster();
}

document.addEventListener("DOMContentLoaded", function () {
    veriyiYukle();

    document.getElementById("kayit-formu").addEventListener("submit", formuGonder);
    document.getElementById("tur").addEventListener("change", kategorileriDoldur);
    document.getElementById("iptal-butonu").addEventListener("click", duzenlemeModunuKapat);

    document.getElementById("tarih").value = bugununTarihi();

    kategorileriDoldur();
    ekraniYenile();
});

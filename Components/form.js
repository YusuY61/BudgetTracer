function kategorileriDoldur() {
    var tur = document.getElementById("tur").value;
    var kategoriler;
    if (tur === "income") {
        kategoriler = GELIR_KATEGORILERI;
    } else {
        kategoriler = GIDER_KATEGORILERI;
    }

    var kategoriSelect = document.getElementById("kategori");
    kategoriSelect.innerHTML = "";

    for (var i = 0; i < kategoriler.length; i++) {
        var option = document.createElement("option");
        option.value = kategoriler[i];
        option.textContent = kategoriler[i];
        kategoriSelect.appendChild(option);
    }
}

function formuOku() {
    return {
        aciklama: document.getElementById("aciklama").value.trim(),
        tutar: parseFloat(document.getElementById("tutar").value),
        tarih: document.getElementById("tarih").value,
        tur: document.getElementById("tur").value,
        kategori: document.getElementById("kategori").value
    };
}

function formuDogrula(veri) {
    if (veri.aciklama === "") {
        alert("Lütfen bir açıklama giriniz.");
        return false;
    }
    if (isNaN(veri.tutar) || veri.tutar <= 0) {
        alert("Lütfen 0'dan büyük bir tutar giriniz.");
        return false;
    }
    if (veri.tarih === "") {
        alert("Lütfen bir tarih seçiniz.");
        return false;
    }
    return true;
}

function formuGonder(event) {
    event.preventDefault();

    var veri = formuOku();
    if (!formuDogrula(veri)) {
        return;
    }

    var duzenlenenIdMetin = document.getElementById("duzenlenen-id").value;

    if (duzenlenenIdMetin === "") {
        kayitEkle(veri);
    } else {
        var id = parseInt(duzenlenenIdMetin, 10);
        kayitGuncelle(id, veri);
        duzenlemeModunuKapat();
    }

    document.getElementById("kayit-formu").reset();
    document.getElementById("tarih").value = bugununTarihi();
    document.getElementById("tur").value = "expense";
    kategorileriDoldur();
    ekraniYenile();
}

function duzenlemeyeBasla(id) {
    var kayit = null;
    for (var i = 0; i < harcamalar.length; i++) {
        if (harcamalar[i].id === id) {
            kayit = harcamalar[i];
            break;
        }
    }
    if (kayit === null) {
        return;
    }

    document.getElementById("duzenlenen-id").value = kayit.id;
    document.getElementById("aciklama").value = kayit.aciklama;
    document.getElementById("tutar").value = kayit.tutar;
    document.getElementById("tarih").value = kayit.tarih;
    document.getElementById("tur").value = kayit.tur;
    kategorileriDoldur();
    document.getElementById("kategori").value = kayit.kategori;

    document.getElementById("form-baslik").textContent = "Kaydı Düzenle";
    var kaydetBtn = document.getElementById("kaydet-butonu");
    kaydetBtn.textContent = "Güncelle";
    kaydetBtn.classList.remove("btn-primary");
    kaydetBtn.classList.add("btn-success");
    document.getElementById("iptal-butonu").style.display = "inline-block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function duzenlemeModunuKapat() {
    document.getElementById("duzenlenen-id").value = "";
    document.getElementById("kayit-formu").reset();
    document.getElementById("tarih").value = bugununTarihi();
    document.getElementById("tur").value = "expense";
    kategorileriDoldur();

    document.getElementById("form-baslik").textContent = "Yeni Kayıt Ekle";
    var kaydetBtn = document.getElementById("kaydet-butonu");
    kaydetBtn.textContent = "Ekle";
    kaydetBtn.classList.remove("btn-success");
    kaydetBtn.classList.add("btn-primary");
    document.getElementById("iptal-butonu").style.display = "none";
}

function bugununTarihi() {
    var d = new Date();
    var yil = d.getFullYear();
    var ay = d.getMonth() + 1;
    var gun = d.getDate();
    if (ay < 10) ay = "0" + ay;
    if (gun < 10) gun = "0" + gun;
    return yil + "-" + ay + "-" + gun;
}

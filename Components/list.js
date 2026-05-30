function listeyiGoster() {
    var tablo = document.getElementById("kayit-tablosu");
    var tbody = document.getElementById("kayit-listesi");
    var bosMesaj = document.getElementById("bos-mesaj");
    var sayi = document.getElementById("kayit-sayisi");

    sayi.textContent = harcamalar.length;
    tbody.innerHTML = "";

    if (harcamalar.length === 0) {
        tablo.style.display = "none";
        bosMesaj.style.display = "block";
        return;
    }

    tablo.style.display = "table";
    bosMesaj.style.display = "none";

    var sirali = harcamalar.slice();
    sirali.sort(function (a, b) {
        if (a.tarih < b.tarih) return 1;
        if (a.tarih > b.tarih) return -1;
        return 0;
    });

    for (var i = 0; i < sirali.length; i++) {
        var k = sirali[i];

        var tr = document.createElement("tr");

        var isaret;
        var renkClass;
        var etiketCls;
        var turMetin;

        if (k.tur === "income") {
            isaret = "+";
            renkClass = "tutar-gelir";
            etiketCls = "etiket gelir";
            turMetin = "Gelir";
        } else {
            isaret = "−";
            renkClass = "tutar-gider";
            etiketCls = "etiket gider";
            turMetin = "Gider";
        }

        tr.innerHTML =
            "<td>" + tarihiFormatla(k.tarih) + "</td>" +
            "<td>" + k.aciklama + "</td>" +
            "<td>" + k.kategori + "</td>" +
            "<td><span class='" + etiketCls + "'>" + turMetin + "</span></td>" +
            "<td class='sag " + renkClass + "'>" + isaret + " " + paraFormatla(k.tutar) + "</td>" +
            "<td class='orta'>" +
                "<button class='btn btn-primary btn-sm' onclick='duzenlemeyeBasla(" + k.id + ")'>Düzenle</button> " +
                "<button class='btn btn-danger btn-sm' onclick='kayitSil(" + k.id + ")'>Sil</button>" +
            "</td>";

        tbody.appendChild(tr);
    }
}

function paraFormatla(sayi) {
    return sayi.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + " ₺";
}

function tarihiFormatla(tarihMetin) {
    var parcalar = tarihMetin.split("-");
    return parcalar[2] + "." + parcalar[1] + "." + parcalar[0];
}

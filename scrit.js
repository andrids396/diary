// === INISIASI AUNTIFHICATION ===

// Menginport satpam dari google (versi web/CDN)
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Kunci auntifhication
const firebaseConfig = {
  apiKey: "AIzaSyC504fvEGM_YSvbModyPi67-jrBy9WiKZg",
  authDomain: "krisan-a5985.firebaseapp.com",
  databaseURL: "https://krisan-a5985-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "krisan-a5985",
  storageBucket: "krisan-a5985.firebasestorage.app",
  messagingSenderId: "27828446239",
  appId: "1:27828446239:web:b8fbda710a46b2aa9e212a"
};

// menghidupkan firebase dan auntifhication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// uid aktif
let UID_AKTIF = "";
let emailLogin = "";

// variabel global
const URL_DATABASE = "https://krisan-a5985-default-rtdb.asia-southeast1.firebasedatabase.app";


// === MENGAMBIL ELEMEN ===

// === AUNTH ===
// container auth
const containerAuth = document.querySelector("#container-auth");

// Login
const formAuthLogin = document.querySelector("#form-auth-login");
const inputEmailLogin = document.querySelector("#input-email-login");
const inputPasswordLogin = document.querySelector("#input-password-login");
const buatAkun = document.querySelector("#buat-akun");

// Buat akun
const formAuthBuatAkun = document.querySelector("#form-auth-buat-akun");
const inputEmailBuatAkun = document.querySelector("#input-email-buat-akun");
const inputPasswordBuatAkun = document.querySelector("#input-password-buat-akun");

// === APPLIKASI ===

// container aplikasi
const containerAplikasi = document.querySelector("#container-aplikasi");

// layout kiri
const penulis = document.querySelector("#penulis");
const menulis = document.querySelector("#menulis");
const daftarTulisan = document.querySelector("#daftar-tulisan");

// layout tengah
const layoutTengah = document.querySelector(".layout-tengah");
const inputDiary = document.querySelector("#input-diary");
const inputJudulDiary = document.querySelector("#input-judul-diary");
const inputIsiDiary = document.querySelector("#input-isi-diary");
const wadahTols = document.querySelector("#wadah-tols");
const tampilanTanggal = document.querySelector("#tampilan-tanggal");
const tobolSimpanDiaryBaru = document.querySelector("#btn-simpan-diary-baru");
const containerDisplay = document.querySelector("#container-display");
const wadahEditDiary = document.querySelector("#wadah-edit-diary");

// layout kanan
const tombolLogout = document.querySelector("#btn-logout");

containerAuth.style.display = "none";

// === AUTH ===

// buat akun baru
buatAkun.addEventListener("click", () => {
    formAuthLogin.style.display = "none";
    formAuthBuatAkun.style.display = "flex";
})

// Login
formAuthLogin.addEventListener("submit", async (event) => {
    // supaya tidak refres
    event.preventDefault();

    try{
        // menyuruh satpam mencocokan email dan password
        const prosesLogin = await signInWithEmailAndPassword(auth, inputEmailLogin.value, inputPasswordLogin.value);

        // simpan uid aktif
        UID_AKTIF = prosesLogin.user.uid;

        // menangkap email login
        emailLogin = prosesLogin.user.email;

        // manipulasi tampilan aplikasi
        containerAuth.style.display = "none";
        containerAplikasi.style.display = "flex";

        
        console.log("Berhasil login");
    }catch(error){
        console.log("Gagal login:", error);
    }
    
})

// Membuat akun
formAuthBuatAkun.addEventListener("submit", async (event) => {
    // supaya tidak refres
    event.preventDefault();
    
    try{
        // menyuruh satpam membuat akun baru diserver
        const prosesBuatAkun = await createUserWithEmailAndPassword(auth, inputEmailBuatAkun.value, inputPasswordBuatAkun.value);

        console.log("Berhasil membuat akun");
    }catch(error){
        console.log("Gagal membuat akun:", error);
    }
})

// === APLIKASI ===

// listener

// == layout kiri ==
// tombol menulis
menulis.addEventListener("click", () => {
    inputDiary.style.display = "flex";
    containerDisplay.style.display = "none";

    inputJudulDiary.value = "";
    inputIsiDiary.value = "";
    inputJudulDiary.focus();
});

// == layout tengah ==

// fungsu tampilkan diary
async function menampilkanDiary(token, uid) {
    // mengambil data sesuai dengan judul daftar diary
    const respon = await fetch(`${URL_DATABASE}/diary/${UID_AKTIF}/${uid}.json?auth=${token}`); // Ambil data dari database
    const dataHasil = await respon.json();

    // wadah judul dan tombol edit hapus
    const wadahJudulDanEditHapus = document.createElement("div");
    wadahJudulDanEditHapus.classList.add("wadah-judul-hapus-edit");

    // titik 3
    const titikTiga = document.createElement("button");
    titikTiga.classList.add("titik-tiga");
    titikTiga.innerHTML = "&#8942";

    // tombol edit
    const tombolEdit = document.createElement("button");
    tombolEdit.classList.add("btn-edit");
    tombolEdit.innerHTML = "edit";

    // tombol hapus
    const tombolHapus = document.createElement("button");
    tombolHapus.classList.add("btn-hapus");
    tombolHapus.innerHTML = "hapus";

    // judul 
    const judul = document.createElement("h2");
    judul.classList.add("judul-diary-display", "input-judul-diary", "teks-pink");
    judul.innerHTML = dataHasil.judulDiary;

    // isi
    const isi = document.createElement("p");
    isi.classList.add("isi-diary-display", "input-isi-diary", "teks-pink");
    isi.innerHTML = dataHasil.isiDiary;

    // tanggal teks
    const tanggal = document.createElement("div");
    tanggal.classList.add("tampilan-tanggal", "teks-pink");
    tanggal.innerHTML = dataHasil.tanggalTeks;

    // membersihkan layout tengah lebih dulu
    containerDisplay.innerHTML = "";

    // append
    // ke wadah judul edit hapus
    wadahJudulDanEditHapus.appendChild(judul);
    wadahJudulDanEditHapus.appendChild(titikTiga);
    wadahJudulDanEditHapus.appendChild(tombolEdit);
    wadahJudulDanEditHapus.appendChild(tombolHapus);

    // ke container display
    containerDisplay.appendChild(wadahJudulDanEditHapus);
    containerDisplay.appendChild(isi);
    containerDisplay.appendChild(tanggal);

    // == listener ==

    // titik tiga
    titikTiga.addEventListener("click", () => {
        if (tombolEdit.style.display === "none" || tombolEdit.style.display === ""){
            tombolEdit.style.display = "block";
            tombolHapus.style.display = "block";
        }else{
            tombolEdit.style.display = "none";
            tombolHapus.style.display = "none";
        }
    });

    // tombol edit
    tombolEdit.addEventListener("click", async () => {
        containerDisplay.style.display = "none"; 
        containerDisplay.innerHTML = "";
        // inputDiary.style.display = "none";
        wadahEditDiary.style.display = "flex";

        // input edit judul
        const inputEditJudul = document.createElement("input");
        inputEditJudul.classList.add("input-judul-diary", "teks-pink");
        inputEditJudul.value = dataHasil.judulDiary;

        // input edit isi
        const inputEditIsi = document.createElement("textarea");
        inputEditIsi.classList.add("input-isi-diary", "teks-pink");
        inputEditIsi.value = dataHasil.isiDiary;

        // wadah tols edit
        const wadahTolsEdit = document.createElement("div");
        wadahTolsEdit.classList.add("wadah-tols");

        // tanggal
        const tanggalTeksEdit = document.createElement("div");
        tanggalTeksEdit.classList.add("tampilan-tanggal", "teks-pink");
        tanggalTeksEdit.innerHTML = new Date().toLocaleDateString("id-ID");

        // tombol submit
        const tombolSimpanPerubahan = document.createElement("button");
        tombolSimpanPerubahan.classList.add("simpan");
        tombolSimpanPerubahan.type = "submit"
        tombolSimpanPerubahan.innerHTML = "Simpan perubahan";

        // append
        wadahTolsEdit.appendChild(tanggalTeksEdit);
        wadahTolsEdit.appendChild(tombolSimpanPerubahan);

        wadahEditDiary.appendChild(inputEditJudul);
        wadahEditDiary.appendChild(inputEditIsi);
        wadahEditDiary.appendChild(wadahTolsEdit);

        // kursor ke input judul edit
        inputEditJudul.focus();

        // listener simpan perubahan
        wadahEditDiary.addEventListener("submit", async (event) => {
            // mencegah restart
            event.preventDefault();
            console.log("simpan perubahan");

            wadahEditDiary.style.display = "none";
            containerDisplay.style.display = "flex";


            const dataPerubahanKirim = {
                judulDiary: inputEditJudul.value,
                isiDiary: inputEditIsi.value,
                tanggalAngka: Date.now(),
                tanggalTeks: new Date().toLocaleDateString("id-ID")
            }

            // simpan perubahan data
            try{
                await fetch(`${URL_DATABASE}/diary/${UID_AKTIF}/${uid}.json?auth=${token}`,{
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(dataPerubahanKirim)
                });
                console.log("perubahan berhasil disimpan");

                menampilkanDiary(token, uid);
                tampilanAplikasi(auth.currentUser);
            }catch(error){
                console.log("gagal melakukan perubahan");
            }
        });
    });

    // tombol hapus
    tombolHapus.addEventListener("click", async () => {
        containerDisplay.innerHTML = "";
        containerDisplay.innerHTML = "<p class='teks-pink'>Menghapus...</p>";

        try{
            // hapus data
            const respon = await fetch(`${URL_DATABASE}/diary/${UID_AKTIF}/${uid}.json?auth=${token}`, {
                method: "DELETE"
            });
            
            containerDisplay.innerHTML = "<p class='teks-pink'>Berhasil menghapus data</p>"
            tampilanAplikasi(auth.currentUser);
        }catch(error){
            containerDisplay.insertAdjacentHTML = `<p class='teks-pink'>Gagal menghapus \nError: ${error}</p>`
        }

    });
};

// submit diary baru
inputDiary.addEventListener("submit", async (event) => {
    // menghilangkan auto refres
    event.preventDefault();

    // mengambil token
    const penggunaAktif = auth.currentUser;
    
    if(penggunaAktif){
        // mengambil token
        const token = await penggunaAktif.getIdToken();

        // variabel yang akan dimasukan database
        const dataKirim = {
            judulDiary: inputJudulDiary.value,
            isiDiary: inputIsiDiary.value,
            tanggalAngka: Date.now(),
            tanggalTeks: new Date().toLocaleDateString("id-ID")
        };

        try{
            // mengosongkan dan menghilangkan form buat diary bary
            inputJudulDiary.value = "";
            inputIsiDiary.value = "";
            
            // loding
            inputDiary.style.display = "none";
            containerDisplay.style.display = "flex";
            
            // container display
            containerDisplay.innerHTML = "<span class='teks-pink'>Memuat...</span>";
            
            // masukan ke database
            const urlKirim = `${URL_DATABASE}/diary/${UID_AKTIF}.json?auth=${token}`;
            const respon = await fetch(urlKirim, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(dataKirim)
            });

            
            const hasilRespon = await respon.json();
            const uid = hasilRespon.name;
            
            console.log("Berhasil mengirim data ke database", hasilRespon);

            menampilkanDiary(token, uid);
            
            // update tampilan aplikasi MASIH GAGAL
            tampilanAplikasi(auth.currentUser);

            // mematikan edit
            edit = false;
        }catch(error){
            console.log("Gagal memuat data ke database:", error);
        }
    }

});


// == layout kanan ==
// Logout
tombolLogout.addEventListener("click", async () => {
    await signOut(auth);

    UID_AKTIF = "";
    emailLogin = "";
    daftarTulisan.innerHTML = "";


    containerAuth.style.display = "flex";
    containerAplikasi.style.display = "none";

    inputEmailBuatAkun.value = "";
    inputPasswordBuatAkun.value = "";
    inputEmailLogin.value = "";
    inputPasswordLogin.value = "";
    inputJudulDiary.value = "";
    inputIsiDiary.value = "";
    inputDiary.style.display = "flex";
    containerDisplay.innerHTML = "";
    containerDisplay.style.display = "none"
});

// daftar diary


async function tampilanAplikasi (user){
    
    // == Layout kiri ==

    // penulis
    penulis.innerHTML = ""; // bersihkan nama email
    penulis.innerHTML = user.email;

    // daftar isi
    const penggunaAktif = auth.currentUser;

    if(user){
        const token = await user.getIdToken();
        // console.log("token daftar isi:", token);
        const respon = await fetch(`${URL_DATABASE}/diary/${UID_AKTIF}.json?auth=${token}`); // Ambil data dari database
        const dataHasil = await respon.json();


        // bersihkan daftar tulisan
        daftarTulisan.innerHTML = "";

        for (const uid in dataHasil) {
            const elemenLi = document.createElement("li");
            const tombol = document.createElement("button");
            tombol.classList.add("tombol-daftar-isi");
            tombol.innerHTML = `${dataHasil[uid].judulDiary}`

            // append
            elemenLi.appendChild(tombol);
            daftarTulisan.appendChild(elemenLi);

            // listener
            tombol.addEventListener("click", async () => {

                // loding
                inputDiary.style.display = "none";
                containerDisplay.style.display = "flex";

                // container display
                containerDisplay.innerHTML = "<span class='teks-pink'>Memuat...</span>";

                menampilkanDiary(token, uid);
            })
        };
    }

    // == Layout tengah ==

    // mengambil tanggal sekarang
    const tanggalTeks = new Date().toLocaleDateString("id-ID");
    tampilanTanggal.innerHTML = tanggalTeks;

    // == layout kanan ==

};

// mengecek apakah sudah login, supaya kalo sudah login -> refres tidak logout (padahal tidak logout hanya tampilannya yang kembali keawal)
onAuthStateChanged(auth, async (user) => {
    
    if(user) {
        containerAuth.style.display = "none";
        containerAplikasi.style.display = "flex";
        UID_AKTIF = user.uid;
        emailLogin = user.email;

        tampilanAplikasi(user);

    }else{
        console.log("refres false");
        containerAuth.style.display = "flex";
        containerAplikasi.style.display = "none";
    }
});
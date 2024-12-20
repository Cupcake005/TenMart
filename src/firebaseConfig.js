// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString,uploadBytes, getDownloadURL } from "firebase/storage";

// Konfigurasi Firebase dari Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyDvKTVp163iKgMarmqmOShxRDocTBcZekA",
    authDomain: "belajarfirebase-e3d29.firebaseapp.com",
    projectId: "belajarfirebase-e3d29",
    storageBucket: "belajarfirebase-e3d29.appspot.com",
    messagingSenderId: "807543040939",
    appId: "1:807543040939:web:45a5632059f9ec3f5cc0ee",
    measurementId: "G-FFMH0PCW79"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Dapatkan referensi Storage
const storage = getStorage(app);

export { storage, ref, uploadString,uploadBytes, getDownloadURL };

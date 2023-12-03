<template>
    <div class="bg-white">
        <div class="container mx-auto px-4">
            {{ product }}
            <header class="border-b py-6">
                <div class="flex justify-between items-center">
                    <div></div>
                    <div class="flex space-x-4 items-center">
                        <div class="flex bg-white rounded overflow-hidden border">
                            <input class="px-4 py-2" placeholder="Cari produk" type="text" />
                            <button class="flex items-center justify-center px-4 border-l">
                                <i class="fas fa-search text-gray-400">
                                </i>
                            </button>
                        </div>
                        <a class="text-gray-400 hover:text-gray-500" href="#">
                            <i class="far fa-heart">
                            </i>
                        </a>
                        <a class="text-gray-400 hover:text-gray-500" href="#">
                            <i class="far fa-user">
                            </i>
                        </a>
                        <a class="text-gray-400 hover:text-gray-500" href="#">
                            <i class="fas fa-shopping-cart">
                            </i>
                        </a>
                    </div>
                </div>
                <div class="mt-4 bg-gray-200">
                    <button class="ml-8 text-lg font-semibold text-white bg-red-500 px-4 py-2 rounded shadow">
                        BELANJA
                        <i class="fas fa-chevron-down" />
                    </button>
                </div>
            </header>
            <div class=" overflow-hidden">
                <div class="px-6 py-4">
                    <div class="flex justify-between items-center border-b pb-4">
                        <div class="text-sm text-gray-600">
                            Home &gt; HARIO CAFE PRESS SLIM GREY 240ML
                        </div>
                        <div class="flex space-x-4">
                            <div class="text-gray-600">
                                <i class="fas fa-search">
                                </i>
                            </div>
                            <div class="text-gray-600">
                                <i class="far fa-heart">
                                </i>
                            </div>
                            <div class="text-gray-600">
                                <i class="far fa-user">
                                </i>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-16">
                        <div class="">
                            <img alt="HARIO CAFE PRESS SLIM GREY 240ML" class="w-full h-auto" height="600"
                                :src="currentImage"
                                width="600" />
                        </div>
                        <div class="p-6 bg-white">
                            <h1 class="text-2xl font-semibold mb-2">{{ product.name }}</h1>
                            <h1 class="text-lg font-semibold mb-2">{{ product.store.name }}</h1>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <span class="text-gray-600 ml-2">(7)</span>
                            </div>
                            <div class="flex justify-between items-center mb-6">
                                <div class="text-3xl font-bold text-red-600">{{ formatCurrency(product.price) }}</div>
                                <div class="text-blue-600 text-sm">{{ product.stock > 0 ? 'Tersedia' : 'Tidak Tersedia'}}</div>
                            </div>
                            <div class="flex items-center mb-6">
                                <button class="text-gray-600 bg-gray-200 h-10 w-10 flex items-center justify-center rounded-l">-</button>
                                <input type="text" class="text-center w-10 h-10 border-t border-b border-gray-300" value="1">
                                <button class="text-gray-600 bg-gray-200 h-10 w-10 flex items-center justify-center rounded-r">+</button>
                                <button class="bg-red-500 text-white py-2 px-6 ml-4 rounded">TAMBAH KE KERANJANG</button>
                                <button class="text-red-500 ml-4">
                                    <i class="far fa-heart"></i>
                                </button>
                            </div>
                            <p class="text-gray-600 mb-2 mt-2">{{ product.miniDescription }}</p>
                        </div>
                    </div>
                    <div class="border-t pt-4">
                        <div class="flex justify-between">
                            <h2 class="text-xl font-semibold mb-2">
                                DESKRIPSI
                            </h2>
                            <h2 class="text-xl font-semibold mb-2 text-gray-400">
                                INFORMASI
                            </h2>
                        </div>
                        <p class="text-gray-600 text-sm mb-4">
                            French Press dari Hario berbahan dasar kaca berwarna abu-abu di desain dengan bentuk yang
                            ramping dan menarik. sangat cocok untuk membuat 1-2 gelas kopi. French Press merupakan salah
                            satu teknik seduh manual yang simple, cukup untuk menyeduh air dan steep selama empat menit
                            sebelum kamu menekan knob agar ampas bisa turun ke dasar.
                        </p>
                        <div class="text-gray-600 text-sm">
                            <div>
                                Spesifikasi:
                            </div>
                            <div>
                                Dimensi: 11x16,5x8cm
                            </div>
                            <div>
                                Berat: 350gr
                            </div>
                            <div>
                                Kapasitas: (240ml)
                            </div>
                            <div>
                                Warna : Abu-abu / Grey
                            </div>
                            <div>
                                Brand: Hario
                            </div>
                        </div>
                    </div>
                    <div class="border-t py-4">
                        <h2 class="text-xl font-semibold mb-2">
                            REKOMENDASI UNTUK ANDA
                        </h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div class="bg-white p-4 shadow-sm rounded-sm">
                                <img alt="ABID CLEVER DRIPPER 102" class="w-full h-auto mb-2" height="300"
                                    src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-aiToeUayBP15O6n4p7APSGpT/user-Us6ce7epJzcXZbtVUBiIJkO5/img-SOxo2JiCAzCVHYb7K4PUSHQw.png?st=2023-12-03T13%3A22%3A21Z&amp;se=2023-12-03T15%3A22%3A21Z&amp;sp=r&amp;sv=2021-08-06&amp;sr=b&amp;rscd=inline&amp;rsct=image/png&amp;skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&amp;sktid=a48cca56-e6da-484e-a814-9c849652bcb3&amp;skt=2023-12-02T22%3A48%3A32Z&amp;ske=2023-12-03T22%3A48%3A32Z&amp;sks=b&amp;skv=2021-08-06&amp;sig=gFZe8UsDrg3QgImUOHUFDhZFS19W1omIzS%2Bvbsa1Yw4%3D"
                                    width="300" />
                                <div class="text-gray-600 text-sm mb-1">
                                    ABID CLEVER DRIPPER 102
                                </div>
                                <div class="text-red-500 text-sm">
                                    Rp 480.000
                                </div>
                            </div>
                            <div class="bg-white p-4 shadow-sm rounded-sm">
                                <img alt="KALITA FP PAPER FILTER ..." class="w-full h-auto mb-2" height="300"
                                    src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-aiToeUayBP15O6n4p7APSGpT/user-Us6ce7epJzcXZbtVUBiIJkO5/img-1NO6eoapmvUrJIzGsZsRdnHc.png?st=2023-12-03T13%3A22%3A19Z&amp;se=2023-12-03T15%3A22%3A19Z&amp;sp=r&amp;sv=2021-08-06&amp;sr=b&amp;rscd=inline&amp;rsct=image/png&amp;skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&amp;sktid=a48cca56-e6da-484e-a814-9c849652bcb3&amp;skt=2023-12-02T22%3A39%3A14Z&amp;ske=2023-12-03T22%3A39%3A14Z&amp;sks=b&amp;skv=2021-08-06&amp;sig=n6tc%2Bue8IP3dnE/%2BEnurzLVOr2KYDi35vK/xo3Xra8Q%3D"
                                    width="300" />
                                <div class="text-gray-600 text-sm mb-1">
                                    KALITA FP PAPER FILTER ...
                                </div>
                                <div class="text-red-500 text-sm">
                                    Rp 80.000
                                </div>
                            </div>
                            <div class="bg-white p-4 shadow-sm rounded-sm">
                                <img alt="HARIO GLASS RANGE SERVER" class="w-full h-auto mb-2" height="300"
                                    src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-aiToeUayBP15O6n4p7APSGpT/user-Us6ce7epJzcXZbtVUBiIJkO5/img-m3pQ6jyrN0mKhfEu6Tu4TC2O.png?st=2023-12-03T13%3A22%3A22Z&amp;se=2023-12-03T15%3A22%3A22Z&amp;sp=r&amp;sv=2021-08-06&amp;sr=b&amp;rscd=inline&amp;rsct=image/png&amp;skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&amp;sktid=a48cca56-e6da-484e-a814-9c849652bcb3&amp;skt=2023-12-02T22%3A37%3A14Z&amp;ske=2023-12-03T22%3A37%3A14Z&amp;sks=b&amp;skv=2021-08-06&amp;sig=uu55hQjT8MpzonG8tI6sywj2rmcrBKJLNES2aSn%2Bf9g%3D"
                                    width="300" />
                                <div class="text-gray-600 text-sm mb-1">
                                    HARIO GLASS RANGE SERVER
                                </div>
                                <div class="text-red-500 text-sm">
                                    Rp 499.000
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailProduct",
    data(){
        return {
            productId: this.$route.params.id,
            currentImage: '',
            product: null
        }
    },
    created(){
        this.fetchData()
    },  
    methods: {
        fetchData() {
            const apiUrl = this.$apiUrl
            
            this.$axios.get(`${apiUrl}/api/products/${this.productId}`)
            .then(response => {
                console.log(response)
                this.product = response.data.data
                this.currentImage = this.product.media[0]?.url
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
                // Menandai bahwa loading sudah selesai meskipun terjadi kesalahan
            });
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID', { 
                style: 'currency', 
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(value);
        }
    },
}
</script>
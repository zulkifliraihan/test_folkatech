<template>
    <div class="bg-white">
        <div class="container mx-auto px-4">
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
            <div class="py-8">
                <div class="flex">
                    <!-- Sidebar -->
                    <div class="w-1/4 pr-6 ml-8">
                        <div class="p-4 rounded-lg shadow">
                            <div class="mb-4">
                                <div class="flex justify-between items-center mb-2">
                                    <h2 class="text-lg font-semibold">URUTKAN BERDASARKAN</h2>
                                    <i class="fa fa-angle-up" aria-hidden="true"></i>
                                </div>
                                <div class="mt-4 mb-4">
                                    <label for="price-range" class="block text-sm font-medium text-gray-700">Harga</label>
                                    <input type="range" min="50000" max="2250000" value="50000"
                                        class="w-full h-2 bg-red-600 rounded-lg appearance-none cursor-pointer" />
                                </div>
                                <div class="flex items-center justify-center text-sm">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Rp. &nbsp;</span>
                                        <input class="bg-gray-200 pl-3 p-0.5 w-28 text-sm" type="number" value="50000"/>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">&nbsp; - Rp. &nbsp;</span>
                                        <input class="bg-gray-200 pl-3 p-0.5 w-28 text-sm" type="number" value="2250000"/>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-4">
                                <div class="flex justify-between items-center mb-2 bg-gray-200 p-2 rounded">
                                    <h2 class="text-lg font-semibold">Origin</h2>
                                    <i class="fa fa-angle-up" aria-hidden="true"></i>
                                </div>
                                <div class="space-y-2">
                                    <div class="flex items-center">
                                        <input id="aceh" name="origin" type="checkbox"
                                            class="h-4 w-4 text-red-600 border-gray-300 rounded" />
                                        <label for="aceh" class="ml-2 block text-sm text-gray-900">Aceh (8)</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="semarang" name="origin" type="checkbox"
                                            class="h-4 w-4 text-red-600 border-gray-300 rounded" />
                                        <label for="semarang" class="ml-2 block text-sm text-gray-900">Semarang (2)</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="bandung" name="origin" type="checkbox"
                                            class="h-4 w-4 text-red-600 border-gray-300 rounded" />
                                        <label for="bandung" class="ml-2 block text-sm text-gray-900">Bandung (7)</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="jawa" name="origin" type="checkbox"
                                            class="h-4 w-4 text-red-600 border-gray-300 rounded" />
                                        <label for="jawa" class="ml-2 block text-sm text-gray-900">Jawa (5)</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="amerika-selatan" name="origin" type="checkbox"
                                            class="h-4 w-4 text-red-600 border-gray-300 rounded" />
                                        <label for="amerika-selatan" class="ml-2 block text-sm text-gray-900">Amerika
                                            Selatan (6)</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="lain-lain" name="origin" type="checkbox"
                                            class="h-4 w-4 text-red-600 border-gray-300 rounded" />
                                        <label for="lain-lain" class="ml-2 block text-sm text-gray-900">Lain - Lain
                                            (8)</label>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-4">
                                <div class="flex justify-between items-center mb-2 bg-gray-200 p-2 rounded">
                                    <h2 class="text-lg font-semibold">Species</h2>
                                    <i class="fa fa-angle-up" aria-hidden="true"></i>
                                </div>
                                <div class="space-y-2">
                                    <div class="flex items-center">
                                        <input id="arabika" name="species" type="checkbox"
                                            class="h-4 w-4 text-red-600 border-gray-300 rounded" />
                                        <label for="arabika" class="ml-2 block text-sm text-gray-900">Arabika (128)</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="robusta" name="species" type="checkbox"
                                            class="h-4 w-4 text-red-600 border-gray-300 rounded" />
                                        <label for="robusta" class="ml-2 block text-sm text-gray-900">Robusta (23)</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="blend" name="species" type="checkbox"
                                            class="h-4 w-4 text-red-600 border-gray-300 rounded" />
                                        <label for="blend" class="ml-2 block text-sm text-gray-900">Blend (9)</label>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-4">
                                <div class="flex justify-between items-center mb-2 bg-gray-200 p-2 rounded">
                                    <h2 class="text-lg font-semibold">Roast Level</h2>
                                    <i class="fa fa-angle-up" aria-hidden="true"></i>
                                </div>
                                <div class="space-y-2">
                                    <div class="flex items-center">
                                        <input id="light-roast" name="roast-level" type="checkbox"
                                            class="h-4 w-4 text-red-600 border-gray-300 rounded" />
                                        <label for="light-roast" class="ml-2 block text-sm text-gray-900">Light Roast
                                            (8)</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="medium-roast" name="roast-level" type="checkbox"
                                            class="h-4 w-4 text-red-600 border-gray-300 rounded" />
                                        <label for="medium-roast" class="ml-2 block text-sm text-gray-900">Medium Roast
                                            (2)</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="dark-roast" name="roast-level" type="checkbox"
                                            class="h-4 w-4 text-red-600 border-gray-300 rounded" />
                                        <label for="dark-roast" class="ml-2 block text-sm text-gray-900">Dark Roast
                                            (7)</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="light-to-medium-roast" name="roast-level" type="checkbox"
                                            class="h-4 w-4 text-red-600 border-gray-300 rounded" />
                                        <label for="light-to-medium-roast" class="ml-2 block text-sm text-gray-900">Light to
                                            Medium Roast (5)</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Products Grid -->
                    <div class="w-3/4">
                        <div class="flex items-center mb-4">
                            <div class="flex-grow">
                                <span class="text-sm font-semibold"> Menampilkan </span>
                                <select class="mx-2 border rounded px-2 py-1 text-sm">
                                    <option>12</option>
                                    <!-- More options... -->
                                </select>
                                <span class="text-sm font-semibold"> dari 132 </span>
                            </div>
                            <div>
                                <span class="text-sm font-semibold"> Urutkan </span>
                                <select class="mx-2 border rounded px-2 py-1 text-sm">
                                    <option>Nama Produk</option>
                                    <!-- More options... -->
                                </select>
                            </div>
                        </div>
                        <div class="grid grid-cols-3 gap-6">
                            <!-- Product 1 -->
                            <div class="bg-white rounded-lg shadow-lg" v-for="(item, index) in products" :key="index">
                                <img alt="Placeholder image of ABID CLEVER DRIPPER 102" class="mb-3 w-full" height="300"
                                    :src="item.media[0]?.url"
                                    width="300" />
                                <div class="p-4 text-center">
                                    <h5 class="text-gray-900 text-xl font-bold mb-2">
                                        {{ item.name }}
                                    </h5>
                                    <h5 class="text-gray-900 text-sm font-semibold mb-2">
                                        {{ item.store.name }}
                                    </h5>
                                    <div class="justify-between mt-4">
                                        <i class="text-yellow-400 fa fa-star" aria-hidden="true"></i>
                                        <i class="text-yellow-400 fa fa-star" aria-hidden="true"></i>
                                        <i class="text-yellow-400 fa fa-star" aria-hidden="true"></i>
                                        <i class="text-yellow-400 fa fa-star" aria-hidden="true"></i>
                                        <i class="text-yellow-400 fa fa-star" aria-hidden="true"></i>

                                    </div>
                                    <p class="text-red-500 text-xl mb-4 mt-4">{{ formatCurrency(item.price) }}</p>
                                </div>
                                <!-- More product details... -->
                            </div>
                            <!-- More products... -->
                        </div>
                        <!-- Pagination -->
                        <div class="flex items-center justify-center mt-8">
                            <a class="border rounded px-3 py-1 mx-1" href="#">
                                <i class="fa fa-angle-left" aria-hidden="true"></i>
                            </a>
                            <a class="border rounded px-3 py-1 mx-1 font-bold" href="#"> 1 </a>
                            <a class="border rounded px-3 py-1 mx-1" href="#"> 2 </a>
                            <a class="border rounded px-3 py-1 mx-1" href="#"> 3 </a>
                            <a class="border rounded px-3 py-1 mx-1" href="#">
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "ListProduct",
    metaInfo() {
        return {
            title: 'Test - List Product'
        }
    },
    data(){
        return {
            products: null
        }
    },
    created(){
        this.fetchData()
    },  
    methods: {
        fetchData() {
            const apiUrl = this.$apiUrl
            
            this.$axios.get(`${apiUrl}/api/products`)
            .then(response => {
                console.log(response)
                this.products = response.data.data
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

};
</script>

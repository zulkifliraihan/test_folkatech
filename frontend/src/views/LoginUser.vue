<template>
    <div class="bg-gray-100 flex items-center justify-center h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-2/6">
          <h1 class="text-2xl font-semibold mb-6">Masuk</h1>
          <form>
              <div class="mb-4">
                  <input type="text" placeholder="Nama Depan" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
              </div>
              <div class="mb-4">
                  <input type="text" placeholder="Nama Belakang" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
              </div>
              <div class="mb-6">
                  <input type="email" placeholder="Email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
              </div>
              <div class="mb-4">
                  <button type="submit" class="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">SELANJUTNYA</button>
              </div>
              <div class="text-center">
                  <div class="border-b border-gray-300 mb-4"></div>
                  <p class="text-sm">Sudah punya akun? <a href="#" class="text-red-500 font-medium">Masuk</a></p>
              </div>
          </form>
      </div>
    </div>
  
</template>
  
<script>  
export default {
    name: "LoginUser",
    components: {
    }
}
</script>
  
  
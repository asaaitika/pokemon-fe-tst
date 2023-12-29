<template>
    <main class="container mt-custom">
        <div class="bg-light p-5 rounded">
          <h1>Pokemon</h1>
          <p class="lead">Get your pokemon now! from <strong>permata-asa</strong></p>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                  <th scope="col" class="text-center">Image</th>
                                  <th scope="col" class="text-center">Name</th>
                                  <th scope="col" class="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(post, index) in posts" :key="index">
                                    <td>
                                        <img v-if="post.img" :src="post.img" alt="Pokemon Image" style="max-width: 100%; max-height: 100px;"/>
                                        <span v-else>No Image Available</span>
                                    </td>
                                    <td class="text-center">{{ post.name }}</td>
                                    <td>
                                      <button @click="openModal(post.id, post.name, post.img)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#dataEntryModal">Catch Pokemon</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="dataEntryModal" tabindex="-1" aria-labelledby="dataEntryModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="dataEntryModalLabel">Catch Pokemon - {{ selectedName }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div>
                  <label for="dataInput">Nickname:</label>
                  <input v-model="dataToSave" id="dataInput" class="form-control" />
                </div>
              </div>
              <div class="modal-footer">
                <button @click="saveData" class="btn btn-primary">Save</button>
                <button @click="closeModal" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div v-if="successAlert" @show="successAlert==true" class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Catch success!</strong> <!-- Customize this message as needed -->
            <button @click="closeSuccessAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>

          <div v-if="errorAlert" @show="errorAlert==true" class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Catch failed!</strong> <!-- Customize this message as needed -->
            <button @click="closeErrorAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>
    </main>
</template>
  
<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    //reactive state
    let posts = ref([])
    let showModal = ref(false)
    let selectedId = ref(null)
    let pokemonName = ref(null)
    let pokemonImg = ref(null)
    let selectedName = ref('')
    let dataToSave = ref('')
    let successAlert = ref(false)
    let errorAlert = ref(false)

    //mounted
    onMounted(() => {
      getDataPosts()
    })

    function getDataPosts() {
      const headers = {
          "Content-Type": "application/json",
      };

      //get API from Express Backend
      axios.get('http://localhost:3001/api/v1/pokemon/list', headers)
      .then(response => {
        posts.value = response.data.data
      }).catch(error => {
          console.log(error.response.data)
      })
    }

    function openModal(id, name, img) {
      selectedId.value = id
      pokemonName.value = name
      pokemonImg.value = img
      selectedName.value = `${name}`
      showModal.value = true
    }

    async function saveData() {
      console.log(`Saving data for ID ${selectedId.value}: ${dataToSave.value}`)

      const apiUrl = 'http://localhost:3001/api/v1/pokemon/catch'

      const requestBody = {
        pokemon_id: selectedId.value,
        pokemon_name: pokemonName.value,
        image_url: pokemonImg.value,
        nickname: dataToSave.value,
      };

      try {
        const response = await axios.post(apiUrl, requestBody)
        console.log('ini response: ', response)

        if(response.data.status){
          closeModal()
          showSuccessAlert()
        } else {
          showErrorAlert()  
        }
      } catch (error) {
        console.log('ini error: ', error)
        console.error('Error:', error.message)
        showErrorAlert()
      }
    }

    function closeModal() {
      showModal.value = false;
      dataToSave.value = '';
    }

    function showSuccessAlert() {
      successAlert.value = true;
      setTimeout(() => {
        successAlert.value = false;
      }, 3000);
    }

    function showErrorAlert() {
      errorAlert.value = true;
      setTimeout(() => {
        errorAlert.value = false;
      }, 3000);
    }

    function closeSuccessAlert() {
      successAlert.value = false;
    }

    function closeErrorAlert() {
      errorAlert.value = false;
    }

    //return
    return {
        posts,
        getDataPosts,
        showModal,
        openModal,
        saveData,
        closeModal,
        dataToSave,
        selectedName,
        successAlert,
        errorAlert,
        closeSuccessAlert,
        closeErrorAlert
    }
  }

}
</script>

<style>

</style>
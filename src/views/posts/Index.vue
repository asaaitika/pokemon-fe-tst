<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>My Pokemon</h4>
                        <hr>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col" class="text-center">Image</th>
                                    <th scope="col" class="text-center">Name</th>
                                    <th scope="col" class="text-center">Nickname</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(post, index) in posts" :key="index">
                                    <td>
                                        <img v-if="post.image_url" :src="post.image_url" alt="Pokemon Image" style="max-width: 100%; max-height: 100px;" />
                                        <span v-else>No Image Available</span>
                                    </td>
                                    <td class="text-center">{{ post.pokemon_name }}</td>
                                    <td class="text-center">{{ post.nickname }}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {

    setup() {
        //reactive state
        let posts = ref([])

        //mounted
        onMounted(() => {
           getDataPosts()
        })

        function getDataPosts() {
            const headers = {
                "Content-Type": "application/json",
            };

            //get API from Express Backend
            axios.get('http://localhost:3001/api/v1/pokemon/list/caught', headers)
            .then(response => {
              posts.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        }

        //return
        return {
            posts,
            getDataPosts,
        }

    }

}
</script>
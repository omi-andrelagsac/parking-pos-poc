<script>
    import Database from "tauri-plugin-sql-api";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { createUser } from "$lib/url";
    import { updateUser } from "$lib/url";

    /**
     * @type {any[]}
    */
    let result = [];
    
    const loadUsers = async () => {
        const db = await Database.load("sqlite:/Users/andrelagsac/Downloads/parking_pos_poc.sqlite")
        result = await db.select("SELECT * FROM users");
        console.log(result)
    }

    const deleteUser = async (/** @type {any} */ userId) => {
        const db = await Database.load("sqlite:/Users/andrelagsac/Downloads/parking_pos_poc.sqlite")
        await db.execute(`DELETE FROM USERS WHERE id = ${userId}`)
        await loadUsers();
    }

    onMount(loadUsers);
</script>

<div class="flex justify-between p-3">
    <h1 class="text-3xl font-bold mb-4">POS POC</h1>
    <button class="border border-green-600 bg-green-600 text-white px-3 rounded-md" on:click={() => goto(createUser)}>Create User</button>
</div>
<div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            {#each result as user}
                <tr class="hover:bg-gray-100">
                    <td class="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{user.username}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button class="text-indigo-600 hover:text-indigo-900" on:click={() => goto(`${updateUser}?id=${user.id}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>                              
                        </button>
                        <button class="ml-2 text-red-600 hover:text-red-900" on:click={() => deleteUser(user.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>                              
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
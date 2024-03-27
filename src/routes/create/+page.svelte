<script>
    import Database from "tauri-plugin-sql-api";
    import { homePage } from "$lib/url";
    import { goto } from "$app/navigation";

    let name = "";
    let username = "";
    let email = "";

    const createUser = async () => {
        const db = await Database.load("sqlite:/Users/andrelagsac/Downloads/parking_pos_poc.sqlite");
        await db.execute(`INSERT INTO users (name, username, email) VALUES (?, ?, ?)`, [name, username, email]);
        goto(homePage)
    };

    const goBack = () => {
        goto(homePage)
    };
</script>

<div class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-4">Create User</h1>
    <form class="space-y-4" on:submit|preventDefault={createUser}>
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" bind:value={name} class="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
        </div>
        <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" id="username" bind:value={username} class="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
        </div>
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" bind:value={email} class="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
        </div>
        <div class="flex justify-between">
            <button type="button" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400" on:click={goBack}>Back</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Create User</button>
        </div>
    </form>
</div>
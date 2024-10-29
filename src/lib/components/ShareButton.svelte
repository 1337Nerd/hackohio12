<script lang="ts">
    export let name: string
    export let href: string
    export let download: string
</script>
<a class="flex flex-col items-center bg-gray-300 hover:bg-gray-400 transition-colors p-2 rounded-md min-w-16" href={href} download={download}>
    <slot />
    {name}
</a>
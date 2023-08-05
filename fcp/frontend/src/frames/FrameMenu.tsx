export function FrameMenu({ frame }) {
    return <button id="dropdownButton-{{frame.id}}" data-dropdown-toggle="dropdown-{{frame.id}}" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
    <span class="sr-only">Open dropdown</span>
    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
    </svg>
</button>
<div id="dropdown-{{frame.id}}" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2" aria-labelledby="dropdownButton-{{frame.id}}">
    <li>
        <a 
            href="/frames/{{frame.id}}"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            View
        </a>
    </li>
    {% if frame.status == "uninitialized" %}
    <li>
        <a 
            href="#" 
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            Initialize
        </a>
    </li>
    {% endif %}
    <li>
        <a 
            href="#" 
            hx-delete="/frames/{{frame.id}}/delete"
            hx-swap="delete"
            hx-target="#frame-{{frame.id}}"
            hx-confirm="Are you sure? This action is irreversible."
            class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            Delete
        </a>
    </li>
    </ul>
</div>
}
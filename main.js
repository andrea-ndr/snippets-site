import snippets from "./data/snippets.mjs";


/* --- DOM elements --- */

const searchbar = document.getElementById("searchbar");
const descriptions_toggle = document.getElementById("descriptionstoggle");
const snippet_wrapper = document.getElementById("snippetwrapper");
const counter = document.getElementById("counter");


/* --- Events --- */

/* Search bar */
searchbar.addEventListener("input", () => {
    update_all(searchbar.value, snippet_wrapper, counter);
});

/* Filters */
descriptions_toggle.addEventListener("change", (e) => {
    filter.description = e.target.checked;
    update_all(searchbar.value, snippet_wrapper, counter);
});



/* --- Main --- */

/* True means the value is allowed past the filter */
let filter = {
    description: descriptions_toggle.checked,
};
update_all(searchbar.value, snippet_wrapper, counter);


/* --- Functions --- */

/*
 * Generates a tree of DOM elements from a data object.
 *
 * snips:       The data object
 * old_wrapper: The DOM element to attach the result onto
 * tab_offset:  The initial value from which to generate tabindex attributes
 *              Avoid using 0, as it has the special meaning of coming after
 *              the list of positive indices.
 */
function display_snippets(snips, old_wrapper, tab_offset = 2) {
    /* Work on a fragment to avoid unnecessary browser repaints */
    let fragment = new DocumentFragment();
    let f_wrapper = document.createElement("div");
    /* Add a default ID in case it's missing from the HTML file */
    if (!old_wrapper.id)
        old_wrapper.id = "snippetwrapper";
    f_wrapper.id = old_wrapper.id;
    fragment.appendChild(f_wrapper);

    let snippet = undefined;
    let element = undefined;
    for (let i = 0; i < snips.length; ++i) {
        /* Small wrapper for this entry */
        snippet = document.createElement("div");
        snippet.className = "snippetbox";
        snippet.tabIndex = i + tab_offset;

        /* Check every value of this entry, make sub-elements as appropriate */
        for (const key in snips[i]) {
            /* Handle only the desired cases */
            switch(key) {
            case "title":
                element = document.createElement("div");
                element.textContent = snips[i][key];
                element.className = key;
                snippet.appendChild(element);
                break;
            case "body":
                element = document.createElement("code");
                element.textContent = snips[i][key];
                element.className = key;
                element.addEventListener("click", (e) => to_clipboard(e));
                snippet.appendChild(element);
                break;
            case "description":
                if (filter.description) {
                    element = document.createElement("div");
                    element.textContent = snips[i][key];
                    element.className = key;
                    snippet.appendChild(element);
                }
                break;
            default:
                break;
            }
        }
        f_wrapper.appendChild(snippet);
    }

    /* Replace old wrapper with new one */
    document.getElementById(old_wrapper.id).replaceWith(fragment);
}

/*
 * Search through all the snippets.
 *
 * query:       The search string
 * original:    The data to scan (array of objects)
 *
 * Returns the filtered array, or the original one if the query is empty.
 */
function search(query, original = snippets) {
    if (!query)
        return original;

    return original.filter(entry =>
    {
        /* Don't want to filter by language */
        // TODO: Make a whitelist, or just delete unwanted entries on load
        // and not at every call, even when they're already gone
        delete entry["language"];

        /* Search the rest */
        for (let line of Object.values(entry)) {
            /* Verify it's a string and it contains our substring */
            /* Note: for logical AND the operator precedence is left-to-right */
            if ((typeof line === "string")
                && line.toLowerCase().includes(query.toLowerCase())) {
                return true;
            }
        }
        return false;
    });
}

/*
 * Updates the given counter with the current number of elements.
 *
 * counter: The DOM element.
 * list:    The data, as an array. Normally the result of a search().
 */
function update_counter(counter, list) {
    counter.textContent = `Showing ${list.length} snippets`;
}

/* Search for the given query (assumes default parameters),
 * generates the DOM for them, and updates the counter all in one.
 *
 * query:   Search string.
 * wrapper: DOM element to attach results to.
 * counter: DOm element for the counter.
 */
function update_all(query, wrapper, counter) {
    const hits = search(query);
    display_snippets(hits, wrapper);
    update_counter(counter, hits);
}

/* Copies this event's target's textContent into the OS's clipboard */
function to_clipboard(event) {
    navigator.clipboard.writeText(event.target.textContent);
}


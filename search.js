
const input = document.getElementById("search");

const searchInput = () => {

    const searchInputBox = document.getElementById("search");
    const options = {
        threshold: 0.3,
        distance: 100,

        keys: [
            "title"
        ]
    };
   
    fetch("./index.json")
    .then(response => {
        if (response.ok)
            return response.json();
        throw new Error("Something went wrong")
    })
    .then(result => {
        searchInputBox.addEventListener(("keypress"), (event) => {
            if (event.key != "Enter")
                return;

            const fuse = new Fuse(result, options);
    
            event.preventDefault();
    
            const resultDiv = document.getElementById("resultDiv");
    
            resultDiv.classList.remove("d-none");
            searchInputBox.blur();
            searchInputBox.removeAttribute("autofocus");
    
            const searchResults = document.getElementById("searchResults");
    
            const noResultsDiv = document.getElementById("noResults");
    
    
            searchResults.innerHTML = "";
    
            const searchQuery = event.target.value;
            const results = fuse.search(searchQuery, { "limit": 10 });
    
            htmlString = "";
    
            if (results.length == 0) {
                resultDiv.classList.add("d-none");
                noResultsDiv.classList.remove("d-none");
                return;
            }
    
            for (let result of results) {
                htmlString += "<a class='lightbox' href=./webp/" + result["title"] + " data-toggle='lightbox' data-gallery='example-gallery'>" +
                    "<img class='img-fluid col-md-3' src=./webp/" + result["title"] + " title= " + result["title"] + "></a>"            
            }
    
            searchResults.innerHTML = htmlString;
            resultDiv.classList.remove("d-none");
            noResultsDiv.classList.add("d-none");
    
            const lightboxOptions = {
                keyboard: true,
                size: 'xl'
            };
    
            document.querySelectorAll('.lightbox').forEach((el) => el.addEventListener('click', (e) => {
                e.preventDefault();
                const lightbox = new Lightbox(el, lightboxOptions);
                lightbox.show();
            }));
        });
    })
    .catch(err => {
        console.log(err);
    })

   
}

searchInput();



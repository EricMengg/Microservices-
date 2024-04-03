window.addEventListener("DOMContentLoaded", function(event) {
    let cat_input = this.document.getElementById("cate");

    let result_div = this.document.getElementById("quote-report");

    this.document.getElementById("search-btn").addEventListener("click", function(event) {
        let cat = cat_input.value;

        let addon = ""

        if (cat_input != "") {
            addon = "?category=" + cat;
        }

        getQuote(addon, result_div)
    })
});

function getQuote(addOn, div) {
    let api = 'https://api.api-ninjas.com/v1/quotes'
    api += addOn;
    fetch(api, {headers: { 'X-Api-Key': 'TPSZ1kZASalgdQLhGtsYMA==XeGxlxCK3wkx8EqS'}}).then(function(res){
        return res.json();
    }).then(function(data){
        console.log(data)
        processData(data, div)
    });
}

function processData(data, div){
    if (data.length == 0) {
        alert("Invalid Inputs. Try again.")
    } else {
        div.innerHTML = "";
        let result = data[0]
        let author = result.author;
        let category = result.category;
        let quote = result.quote;
        div.appendChild(document.createElement("p").appendChild(document.createTextNode("Author: " + author)));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("p").appendChild(document.createTextNode("Category: " + category)));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("p").appendChild(document.createTextNode("Quote: " + quote)));
    }
}
    const url_s = "http://www.omdbapi.com/?s=";
    const url_t = "http://www.omdbapi.com/?t=";
    const api_key = "&plot=short&apikey=74f62994";
    const api_key_long = "&plot=full&apikey=74f62994";

    document.getElementById("search").onkeyup = function() {
        if( $("#result").is(":hidden")){
            $("#details").hide();
            $("#result").show();
        }
        const search = document.getElementById("search").value;
        fetch(url_s+ search + api_key) // Call the fetch function passing the url of the API as a parameter
            .then(response => {
                if(response.ok){
                    return response.json();
                }
            })
            .then(data => {
                let array = data.Search;
                let str1='';
                console.log(array);
                if (array != null) {
                    let i;
                    for (i=0; i<array.length; i++){
                        str1 += getMovieDetails(array[i].Title, i+1);
                    }
                }
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ', error.message);
            });
    };

    function getMovieDetails(title, i){
         fetch(url_t + title + api_key)
             .then(response=> {
                 if (response.ok) {
                    return response.json()
                 }
             })
             .then(data=>{
                 let str = '';
                 if(data!==null) {
                     str += '<div class="column">' +
                                '<div class="image">';
                     if (data.Poster !== "N/A") {
                         str += '<img class="img-responsive" src=" ' + data.Poster + '"</img>';
                     } else {
                         str += '<p class="img-responsive">Poster not available for this movie</p>';
                     }
                     console.log(str);
                     str += '</div><div class="aside">';
                     str += '<div class="title"><label>Title:</label>' + data.Title + '</div>';
                     str += '<div class="director"><label>Director:</label>' + data.Director + '</div>';
                     str += '<div class="description"><label>Description:</label>' + data.Plot + '</div>';
                     str += '<div class="year"><label>Year:</label>' + data.Year + '</div>';
                     str += '<button class="myButton" onclick="buttonOnClick(\''+data.Title+'\')">Details</button></div></div>';
                     document.getElementById("result"+i).innerHTML = str;
                 }
             })
             .catch(function(error) {
                 console.log('There has been a problem with your inner fetch operation: ', error.message);
             });
        }

        document.getElementById("search").onclick = function() {

        };

    function buttonOnClick(title) {
        fetch(url_t + title + api_key_long)
        .then(response=> {
            if (response.ok) {
                return response.json()
            }
        })
        .then(data=>{
            let str = '';
            if(data!==null) {
                str += '<div class="column">' +
                    '<div class="image">';                     console.log(data);

                if (data.Poster !== "N/A") {
                    str += '<img class="img-responsive" src=" ' + data.Poster + '"</img>';
                } else {
                    str += '<p class="img-responsive">Poster not available for this movie</p>';
                }
                str += '</div><div class="aside">';
                str += '<div class="title"><label>Title:</label>' + data.Title + '</div><br>';
                str += '<div class="description"><label>Actors:</label>' + data.Actors + '</div>';
                str += '<div class="description"><label>Director:</label>' + data.Director + '</div>';
                str += '<div class="description"><label>Description:</label>' + data.Plot + '</div>';
                str += '<div class="description"><label>Production:</label>' + data.Production + '</div>';
                str += '<div class="description"><label>Awards:</label>' + data.Awards + '</div>';
                str += '<div class="description"><label>Genre:</label>' + data.Genre + '</div>';
                str += '<div class="description"><label>Country:</label>' + data.Country + '</div>';
                str += '<div class="description"><label>Duration:</label>' + data.Runtime + '</div>';
                str += '<div class="description"><label>Year:</label>' + data.Year + '</div>';
                $("#result").hide();
                $("#details").show();
                document.getElementById("details").innerHTML = str;
            }
        })
        .catch(function(error) {
            console.log('There has been a problem with your inner fetch operation: ', error.message);
        });
}

 


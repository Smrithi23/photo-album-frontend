// document.addEventListener('keydown', keyPressed);
// BASE_URL = ""

/* <div class="card" style="width: 18rem; display:inline-block">
    <img class="card-img-top" src="./flower.jpeg" alt="Card image cap">
    </div> */

// function keyPressed(e) {
//   if(e && e.keyCode == 13) {
//     console.log("Enter Pressed");
//     search()
//   }
// }

// window.onload = (event) => {
//     
// };

document.addEventListener('keydown', (e) => {
    if(e && e.keyCode == 13) {
        search()
    }
});

// /photos
function upload() {
    customLabels = document.getElementById("customLabels").value.split(",")
    photoFile = document.getElementById("photo").files[0]
    console.log(customLabels)

    if(photoFile != "") {
        putPhotos(customLabels, photoFile)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        console.log("File uploaded")
        // document.getElementById("success").style.display = "inline"
        // document.getElementById("success").innerText = "Success"
        // <div id="succes" class="alert alert-success" role="alert"></div>
        // <div id="failure" class="alert alert-danger" role="alert"></div>

        // let div = document.createElement('div')
        // div.className = "alert alert-success"
        // div.role = "alert"
        // div.innerText = "Hello"

        // let alertDiv = document.getElementById("cardDeck")
        // alertDiv.appendChild(div)

        // let div = document.createElement('div')
        // div.className = "alert alert-success"
        // div.innerText = "Successfully uploaded!"
        // div.role = "alert"

        // let alertDiv = document.getElementById("alertMessage")
        // alertDiv.appendChild(div)

        resetMessage()
        let successDiv = document.getElementById("success")

        if(successDiv) {
            successDiv.style.display = "block"
            successDiv.innerText = "Success"
        }
    } else {
        console.log("File not uploaded")

        resetMessage()
        let errorDiv = document.getElementById("error")

        if(errorDiv) {
            errorDiv.style.display = "block"
            errorDiv.innerText = "Error"
        }
    }

    reset()
}

// /search
function search() {
    searchKey = document.getElementById("searchKey").value

    // validate if search key is entered
    if(searchKey) {
        getSearch(searchKey)
        .then((response) => {
            console.log(response)
            console.log(response.header)
        })
        .catch((error) => {
            console.log(error)
        })
        console.log(searchKey)
        let parent = document.getElementById("cardDeck")
        for(let i = 0; i < 5; i++) {
            let div = document.createElement('div')
            div.className = "card"
            div.style.width = "18em"
            div.style.display = "inline-block"

            let image = document.createElement('img')
            image.className = "card-img-top"
            image.src = "./flower.jpeg"
            div.appendChild(image)
            parent.appendChild(div)
        }
    } else {
        console.log("No search key")
    }
}

function reset() {
    document.getElementById("customLabels").value = ""
    document.getElementById("photo").value = ""
}

function resetMessage() {
    let successDiv = document.getElementById("success")
    let errorDiv = document.getElementById("error")

    if(successDiv) {
        successDiv.style.display = "none"
        successDiv.innerText = ""
    }

    if(errorDiv) {
        errorDiv.style.display = "none"
        errorDiv.innerText = ""
    }
}

function cancel() {
    reset()
    resetMessage()
}

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = error => reject(error);
//     });
//   }

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsBinaryString(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = error => reject(error);
//     });
//   }

// function uploadFile(inputElement) {
//     var file = inputElement.files[0];
//     var reader = new FileReader();
//     reader.onloadend = function() {
//       var data=(reader.result).split(',')[1];
//       var binaryBlob = atob(data);
//       console.log('Encoded Binary File String:', binaryBlob);
//       return binaryBlob;
//     }
//     return reader.readAsDataURL(file);
//   }

function putPhotos(customLabels, photoFile) {
    // params, body, additionalParams
    // var r = new FileReader()
    // r.readAsBinaryString(photoFile)
    // uploadFile(photoFile).then(
    //     data => {
    //         return sdk.bucketFilenamePut({
    //             'x-amz-meta-customLabels': customLabels,
    //             'bucket': 'upload-photos-b2',
    //             'filename': 'frontend_flower.png'
    //         }, 
    //             data
    //         , {});
    //     }
    //   )

    const reader = new FileReader();
    reader.readAsDataURL(photoFile)
    console.log(reader)
    data = reader.result
    console.log(data)
    return sdk.bucketFilenamePut({
        'x-amz-meta-customLabels': customLabels,
        'bucket': 'upload-photos-b2',
        'filename': 'frontend_flower.jpeg'
    }, 
        data
    , {});
}

function getSearch(searchText) {
    // params, body, additionalParams
    return sdk.searchGet({
        'q': searchText
    }, {}, {});
}
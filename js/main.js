var nameInput = document.getElementById('BookmarkName')
var urlInput = document.getElementById('BookmarkUrl')
var submiteBtn = document.getElementById('submitebtn')
var nameValid = document.getElementById('alertNameInput')
var EditBtn = document.getElementById('UpdateBtn')
var closeBtn = document.getElementById('closeBox')
var Boxcontainer = document.getElementById('Boxcontainer')
var productList = []
currentIndex = -1

if (localStorage.getItem('saveData') != null) {
    productList = JSON.parse(localStorage.getItem('saveData'))

}

function submite() {




    if (ValidName() == true && ValidUrl() == true) {
        var data = {
            user: nameInput.value,
            url: urlInput.value,
        }
        productList.push(data)
        localStorage.setItem('saveData', JSON.stringify(productList))
        showData()
        clearForm()
        nameInput.classList.remove('is-valid')
        urlInput.classList.remove('is-valid')
    } else {
        Boxcontainer.style.display = "flex"
    }


}

closeBtn.addEventListener('click', closeBox)
function closeBox() {
    Boxcontainer.classList.remove("d-flex")
    Boxcontainer.classList.add('d-none')
}

document.addEventListener('keypress', function (e) {

    if (e.target == "Escape") {
        closeBox()
    }

})

function showData() {
    var result = ""
    console.log(productList);
    for (var i = 0; i < productList.length; i++) {

        result += `
        <tr>

        <td>${i}</td>
        <td>${productList[i].user}</td>
        <td><button onclick="UpdateData(${i})" class="btn btn-warning"> Update <i
                    class="fa-solid fa-wrench pe-2 text-white"></i></button></td>
        <td><a href="${productList[i].url}" target="_blank" class="btn btn-success">visite <i
                    class="fa - solid fa - eye pe- 2"></i> </a></td>
        <td><button onclick="deleteproduct(${i})" class="btn btn-danger">Delete <i
                    class="fa-solid fa-trash-can pe-2"></i></button></td>
    </tr> `
    }

    document.getElementById('tableData').innerHTML = result
}

function clearForm() {
    nameInput.value = ""
    urlInput.value = ""
}

function deleteproduct(productindex,) {
    productList.splice(productindex, 1)
    localStorage.setItem('saveData', JSON.stringify(productList))
    showData()
}

function UpdateData(index) {
    nameInput.value = productList[index].user
    urlInput.value = productList[index].url

    EditBtn.classList.add('d-block')
    submiteBtn.classList.add('d-none')


}

function EditData() {

    if (ValidName() == true && ValidUrl() == true) {
        var data = {
            user: nameInput.value,
            url: urlInput.value,
        }
        productList.splice(currentIndex, 1, data)
        localStorage.setItem('saveData', JSON.stringify(productList))

        EditBtn.classList.remove('d-block')
        submiteBtn.classList.remove('d-none')


        showData()
        clearForm()
    } else {
        Boxcontainer.style.display = "flex"
    }

};

nameInput.addEventListener('change', ValidName)
function ValidName() {

    var regexName = /^[A-z][a-z]{3,15}[0-9]?$/
    if (regexName.test(nameInput.value) == true) {
        nameInput.classList.add('is-valid')
        nameInput.classList.remove('is-invalid')
        return true
    } else {
        nameInput.classList.add('is-invalid')
        nameInput.classList.remove('is-valid')
        return false
    }
}

urlInput.addEventListener('change', ValidUrl)
function ValidUrl() {

    var regexUrl = /^(ftp|https|http):\/\/www\.[A-Za-z]+\.[a-z]{2,3}$/


    if (regexUrl.test(urlInput.value) == true) {
        urlInput.classList.add('is-valid')
        urlInput.classList.remove('is-invalid')
        return true
    } else {
        urlInput.classList.add('is-invalid')
        urlInput.classList.remove('is-valid')
        return false
    }
}



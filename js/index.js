var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("bookmarkUrl");
var bookmarks = [];
if (localStorage.getItem("ourData")) {
  bookmarks = JSON.parse(localStorage.getItem("ourData"));
  displayBookmarks();
}

function addBookmark() {
  if (validBookmarkName() && validBookmarkUrl()) {
    var bookmark = {
      name: bookmarkName.value,
      url: bookmarkUrl.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("ourData", JSON.stringify(bookmarks));
    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.remove("is-invalid");
    bookmarkUrl.classList.remove("is-valid");
    bookmarkUrl.classList.remove("is-invalid");
    clearInput();
  } else {
    document.getElementById("errorBox").classList.remove("d-none");
  }
  displayBookmarks();
}

function clearInput() {
  bookmarkName.value = bookmarkUrl.value = null;
}

function displayBookmarks() {
  cartona = ``;
  for (var i = 0; i < bookmarks.length; i++) {
    cartona += `
    <div class="row g-0 border-bottom border-1 ">
    <div class="col-2">
      <div class="bg-white text-center py-2 h-100">
        <p class="py-2">${i + 1}</p>
      </div>
    </div>
    <div class="col-4">
      <div class="bg-white text-center py-2 h-100">
        <p class="py-2">${bookmarks[i].name}</p>
      </div>
    </div>
    <div class="col-3">
      <div class="bg-white text-center py-2 h-100">
      <a href="${bookmarks[i].url}" target="_blank" class="link">
        <button class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</button>
      </a>
      </div>
    </div>
    <div class="col-3">
      <div class="bg-white text-center py-2 h-100">
        <button onclick="DeleteBookmark(${i})" class="btn btn-delete"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button>
      </div>
    </div>
    
  </div>
    `;
  }
  document.getElementById("bookmarksContent").innerHTML = cartona;
}

function validBookmarkName() {
  var text = bookmarkName.value;
  var regex = /^\w{3,}(\s{1,}\w{1,}){0,}$/;
  if (regex.test(text)) {
    bookmarkName.classList.remove("is-invalid");
    bookmarkName.classList.add("is-valid");
    return true;
  } else {
    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.add("is-invalid");
    return false;
  }
}

function validBookmarkUrl() {
  var text = bookmarkUrl.value;
  var regex =
    /^(http:\/\/|https:\/\/)?(www\.)?\w*\.\w{2,}\/?\w{0,}(\/\w{1,}){0,}$/;

  if (regex.test(text)) {
    bookmarkUrl.classList.remove("is-invalid");
    bookmarkUrl.classList.add("is-valid");
    return true;
  } else {
    bookmarkUrl.classList.remove("is-valid");
    bookmarkUrl.classList.add("is-invalid");
    return false;
  }
}

function DeleteBookmark(item) {
  bookmarks.splice(item, 1);
  localStorage.setItem("ourData", JSON.stringify(bookmarks));
  displayBookmarks();
}
function dispalyError() {
  document.getElementById("errorBox").classList.remove("d-none");
  //document.getElementById("errorBox").classList.add("d-flex")
}

function closeErrorBox() {
  document.getElementById("errorBox").classList.add("d-none");
}

document.getElementById("errorBox").onclick = function (e) {
  if (e.target == document.getElementById("errorBox")) {
    document.getElementById("errorBox").classList.add("d-none");
  }
};

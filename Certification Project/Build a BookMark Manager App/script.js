const mainMenu = document.getElementById("main-section");
const viewCategoryBtn = document.getElementById("view-category-button");
const listCategory = document.getElementById("category-dropdown");
const addBookMark = document.getElementById("add-bookmark-button");

const viewListCategory = document.getElementById("bookmark-list-section");
const btnCloseList = document.getElementById("close-list-button");
const categoryList = document.getElementById("category-list");
const deleteBookmarkBtn = document.getElementById("delete-bookmark-button");

const formAdd = document.getElementById("form-section");
const btnCloseForm = document.getElementById("close-form-button");
const addBookMarkForm = document.getElementById("add-bookmark-button-form");

const getBookmarks = () => {
  let bookmarks = localStorage.getItem("bookmarks");

  if (!bookmarks) {
    return [];
  }

  try {
    const parsed = JSON.parse(bookmarks);

    if (Array.isArray(parsed) && parsed.every(item =>
      item && typeof item === 'object' &&
      'name' in item && 'category' in item && 'url' in item
    )) {
      return parsed;
    }

    return [];
  } catch {
    return [];
  }
}

function displayOrHideCategory() {
  mainMenu.classList.toggle("hidden");
  viewListCategory.classList.toggle("hidden");
}

function displayOrCloseForm() {
  mainMenu.classList.toggle("hidden");
  formAdd.classList.toggle("hidden");
}

function renderCategoryList(category) {
  const bookmarks = getBookmarks();
  const filtered = bookmarks.filter(b => b.category === category);

  if (filtered.length === 0) {
    categoryList.innerHTML = "<p>No Bookmarks Found</p>";
    return;
  }

  categoryList.innerHTML = filtered.map(b => `
    <div>
      <input type="radio" id="${b.name}" name="bookmark" value="${b.name}">
      <label for="${b.name}"><a href="${b.url}">${b.name}</a></label>
    </div>
  `).join("");
}

viewCategoryBtn.addEventListener("click", () => {
  const h2Title = viewListCategory.querySelector(".category-name");
  const category = listCategory.value;

  h2Title.textContent = listCategory.options[listCategory.selectedIndex].text;

  renderCategoryList(category);

  displayOrHideCategory();
});

btnCloseList.addEventListener("click", () => {
  displayOrHideCategory();
});

addBookMark.addEventListener("click", () => {
  const h2Title = formAdd.querySelector(".category-name");
  h2Title.textContent = listCategory.options[listCategory.selectedIndex].text;

  displayOrCloseForm();
});

btnCloseForm.addEventListener("click", () => {
  displayOrCloseForm();
});

addBookMarkForm.addEventListener("click", () => {
  const nameInput = document.getElementById("name");
  const urlInput = document.getElementById("url");

  const name = nameInput.value;
  const category = listCategory.value;
  const url = urlInput.value;

  const bookmarks = getBookmarks();

  const newBookmark = {
    name,
    category,
    url
  };

  bookmarks.push(newBookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  nameInput.value = "";
  urlInput.value = "";

  displayOrCloseForm();
});

deleteBookmarkBtn.addEventListener("click", () => {
  const selected = categoryList.querySelector("input[name='bookmark']:checked");

  if (!selected) {
    return;
  }

  const category = listCategory.value;
  const bookmarks = getBookmarks();

  const updated = bookmarks.filter(b =>
    !(b.name === selected.value && b.category === category)
  );

  localStorage.setItem("bookmarks", JSON.stringify(updated));

  renderCategoryList(category);
});

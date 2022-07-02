const addBookmark = document.getElementById('add');
const modal = document.getElementById('modal');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const close = document.querySelector('.close-modal');
const form = document.getElementById('bookmark-form');
const container = document.getElementById('container')



let bookmarks = []

// show modal
const showModal = ()=>{
    modal.classList.add('show-modal');
    websiteNameEl.focus()
}
// close modal
const closeModal = ()=>{
    modal.classList.remove('show-modal')
}
// validate form
const validate = (nameValue,urlValue)=>{
    let regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi;
    if(!nameValue || !urlValue){
        alert('please submit values');
        return false
    }
    
    
    if(!regex.test(urlValue)){
        alert('please input a valid address');
        return false

    }
    return true
}

// Build Bookmarks
function buildBookmarks(){
    //  remove all bookmarks
    container.textContent ='';

    
    // build items
    bookmarks.forEach((bookmark) =>{
        
        const{ name , url} = bookmark;
        // item
        const item = document.createElement('div');
        item.classList.add('name');
        // close icon
         const closeIcon = document.createElement('i');
         closeIcon.classList.add('fa-solid','fa-xmark');
         closeIcon.setAttribute('title','remove bookmark')
         closeIcon.setAttribute('onclick',`deleteBookmark('${url}')`)
        //  bookmarkName
        const bookmarkName = document.createElement('h3');
        bookmarkName.textContent = name;
        // link
        const link = document.createElement('a');
        link.setAttribute('href',`${url}`);
        link.setAttribute('target','_blank');
        link.textContent = `go to ${name}`
        // append to book container
        item.append(closeIcon,bookmarkName,link)
        container.appendChild(item);
        console.log(container)


    })
}

// fetch bookmarks from local storage
function fetchBookmarks(){
    // get bookmarks from LS
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        // create bookmarks array in local storage
        bookmarks = [
            {
                name : 'jacinto Design',
                url: 'https://jacinto.design',
            },
        ];
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    }
    buildBookmarks();
}
// delete bookmark
function deleteBookmark(url){
    bookmarks.forEach((bookmark,i) =>{
        if(bookmark.url === url){
            bookmarks.splice(i,1)
        }

    })
    // update LS
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
}

// storing bookmark values and form validation
const storeBookmark = (e) =>{
e.preventDefault();
const nameValue =  websiteNameEl.value;
let urlValue = websiteUrlEl.value;
if(!urlValue.includes('httpS://')){
    urlValue = `https://${urlValue}`
    
}
if(!validate(nameValue,urlValue)){
    return false
}
const bookmark = {
    name: nameValue,
    url: urlValue,
};
   bookmarks.push(bookmark);
   localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
   fetchBookmarks()
   form.reset();
   websiteNameEl.focus();


}



















// add event listener to show modal
addBookmark.addEventListener('click',showModal)

// close modal
close.addEventListener('click', closeModal)
window.addEventListener('click',(e)=>(e.target === modal?closeModal():false))


// event listener
form.addEventListener('submit',storeBookmark)

// On Load , Fetch Bookmarks
fetchBookmarks();

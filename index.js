let details;
const infoCard = document.querySelector('.infoCard');
const categoriesSection = document.querySelector('.categories');
const filterDropDown = document.querySelector('.filterDropDown')

let activeCategory=null;
let activeFilter=null;
let filteredPost=[]

function fetchDataFromURLs() {
    const url = ["https://jade-talented-monkey.cyclic.app/details"]

    const fetchData = url => {
      return fetch(url)
        .then(response => response.json())
        .catch(error => {
          console.error('Error fetching JSON data:', error);
          throw error;
        });
    };
    // Execute multiple promises concurrently
    Promise.all(url.map(fetchData))
      .then(([detail]) => {
        details= detail
        allFunction(details)
      })
      .catch(error => {
        console.error('Error fetching data from URLs:', error);
      });
}


 fetchDataFromURLs();


 function allFunction(details){
    getUniqueValues(details)
    displayCategory()
    displayFilter()
    // renderPost(details)
    applyFilter("filter", activeFilter)
 }


let filters=[];
let categories = [];


function displayFilter() {
    let template = ``;

    for (let i = 0; i < filters.length; i++) {
        const item = filters[i];

        if (i===0){
            activeFilter = item;
            const filterTitle = document.querySelector('.filterTitle')
            filterTitle.innerHTML=activeFilter
           

        }

        template += `
            <div class="${convertToUnderscore(item)} flex hover:bg-gray-100 p-2 rounded-md justify-between items-center ${i === 0 ? `bg-gray-200` : `none`}" onclick="changeFilter('${item}'); applyFilter('filter','${item}');">
                <div class="text-sm">${item}</div>
                <div class="${convertToUnderscore(item)}-img ${i === 0 ? `flex` : `hidden`}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
            </div>
        `;

        filterDropDown.innerHTML = template;
    }
}


function changeFilter(name){
    toggleFilter()

    const oldFilterBg = document.querySelector(`.${convertToUnderscore(activeFilter)}`)
    oldFilterBg.classList.remove('bg-gray-200')

    const icon = document.querySelector(`.${convertToUnderscore(activeFilter)}-img`)
    icon.classList.add('hidden')

    activeFilter = name;

    const newFilterBg = document.querySelector(`.${convertToUnderscore(activeFilter)}`)
    newFilterBg.classList.add('bg-gray-200')

    const newIcon = document.querySelector(`.${convertToUnderscore(activeFilter)}-img`)
    newIcon.classList.remove('hidden')

    const filterTitle = document.querySelector('.filterTitle')
    filterTitle.innerHTML=activeFilter

}

function getUniqueValues(details) {
    for (const data of details) {
        for (const filter of data.filter) {
            if (!filters.includes(filter)) {
                const index = filters.indexOf(filter);
                if (index === -1) {
                    filters.push(filter);
                }
            }
        }
        for (const category of data.category) {
            if (!categories.includes(category)) {
                const index = categories.indexOf(category);
                if (index === -1) {
                    categories.push(category);
                }
            }
        }
    }
}


function renderPost(details){
    let template = ``;
    for(const data of details){
        template+=`
        <div class="flex flex-col ">
            <div class="w-full bg-cover h-60 rounded-xl cursor-pointer" style="background-image: url(${data.img});">
                <div class="w-full h-full flex items-end hoverclass">
                    <div class="flex h-20 rounded-xl p-8 items-center bottom-0 justify-between w-full" style=" background-image: linear-gradient(#6d6b6b27,rgba(17, 17, 17, 0.377));">
                        <div class="text-white font-bold">${data.title}</div>
                        <div class="flex gap-2">
                            <div class="flex w-10 h-10 bg-white rounded-full justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="img" class="icon hover:opacity-40">
                                    <path d="M3.33337 5.2C3.33337 4.0799 3.33337 3.51984 3.55136 3.09202C3.74311 2.71569 4.04907 2.40973 4.42539 2.21799C4.85322 2 5.41327 2 6.53337 2H9.46671C10.5868 2 11.1469 2 11.5747 2.21799C11.951 2.40973 12.257 2.71569 12.4487 3.09202C12.6667 3.51984 12.6667 4.0799 12.6667 5.2V14L8.00004 11.3333L3.33337 14V5.2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </div>
                            <div class="flex w-10 h-10 bg-white rounded-full  justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" role="img" class="icon hover:opacity-40">
                                    <path d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-between mt-[10px] items-center">
                <div class="flex  items-center cursor-pointer">
                    <img src="${data.profile_img}" alt="profile" class="w-6 h-6 rounded-full">
                    <span class="ml-3">${data.name}</span>
                    ${data.pro ? `<a href="https://dribbble.com/pro" target="_blank" class="bg-gray-400 hover:bg-black text-white font-bold px-1 rounded-md text-xs cursor-pointer ml-3 mt-1">PRO</a>` : ``}
                </div>
                <div class="flex gap-2 mt-1">
                    <div class="flex gap-1 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" role="img" class="icon fill-current shot-tools-icon cursor-pointer hover:fill-red-600">
                                <path d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                        <div class="text-xs">${data.likes}</div>
                    </div>
                    <div class="flex gap-1 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" role="img" class="icon fill-current shot-tools-icon ">
                                <path d="M8 3C4.36992 3 1.98789 6.21774 1.18763 7.49059C1.09079 7.64462 1.04237 7.72163 1.01527 7.84042C0.99491 7.92964 0.99491 8.07036 1.01527 8.15958C1.04237 8.27837 1.09079 8.35539 1.18763 8.50941C1.98789 9.78226 4.36992 13 8 13C11.6301 13 14.0121 9.78226 14.8124 8.50941L14.8124 8.50939C14.9092 8.35538 14.9576 8.27837 14.9847 8.15958C15.0051 8.07036 15.0051 7.92964 14.9847 7.84042C14.9576 7.72163 14.9092 7.64462 14.8124 7.4906L14.8124 7.49059C14.0121 6.21774 11.6301 3 8 3Z" fill="currentColor"></path>
                                <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" fill="white"></path>
                            </svg>
                        </div>
                        <div class="text-xs">${data.views}</div>
                    </div>
                </div>
            </div>
        </div> 
        `
    }

    infoCard.innerHTML = template;
}

function convertToUnderscore(str) {
    return str.replace(/[^\w\s]/gi, '').replace(/ /g, '_').toLowerCase();
}

function  displayCategory(){
    let template = ``;
    for (const item of categories){
        template+=`
        <div class="${convertToUnderscore(item)} flex py-2 px-4 rounded-full cursor-pointer font-bold hover:opacity-50" onclick="applyFilter('category','${item}');">${item}</div>`
    }
    categoriesSection.innerHTML = template;
}



function applyFilter(name, value){
    if (name === 'category'){
         if(activeCategory === null ){
            activeCategory = value;
            const button = document.querySelector(`.${convertToUnderscore(value)}`)
            button.classList.add('bg-[#F8F7F4]')
            button.classList.remove('hover:opacity-50')
        }
        else{
            const button = document.querySelector(`.${convertToUnderscore(activeCategory)}`)
            button.classList.remove('bg-[#F8F7F4]')
            button.classList.add('hover:opacity-50')
            activeCategory= value;
            const activebutton = document.querySelector(`.${convertToUnderscore(value)}`)
            activebutton.classList.add('bg-[#F8F7F4]')
            activebutton.classList.remove('hover:opacity-50')
        }
        filteredPost=[]
        for(const data of details){
            if (data.category.includes(value)){
                filteredPost.push(data)
            }
        }
        renderPost(filteredPost)
    }
    if (name === 'filter'){
        if (activeCategory != null){
            filteredPost=[]
            for(const data of details){
                if (data.category.includes(activeCategory) && data.filter.includes(value)){
                    filteredPost.push(data)
                }
            }
            renderPost(filteredPost)
        }
        if (activeCategory === null){
            filteredPost=[]
            for(const data of details){
                if (data.filter.includes(value)){
                    filteredPost.push(data)
                }
            }
            renderPost(filteredPost)
        }
    }
}


function toggleFilter(){
 
    const downArrow = document.querySelector('.downArrow')
    if(filterDropDown.classList.contains('hidden')){
        filterDropDown.classList.remove('hidden')
    }
    else{
        filterDropDown.classList.add('hidden')
    }

    downArrow.classList.toggle('rotate-180')
}

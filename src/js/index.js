// step2 요구사항 구현을 위한 전략
// TODO localStorage Read & Write
// - [ ] localStorage에 데이터를 저장한다.
//    - [ ] 메뉴를 추가할 때 저장
//    - [ ] 메뉴를 수정할 때 저장
//    - [ ] 메뉴를 삭제할 때 저장
// - [ ] localStorage에서 데이터를 읽어온다. (새로고침해도 데이터를 남아있게 한다.)

// TODO 메뉴판 관리
// - [ ] 에스프레소 메뉴판을 관리한다.
// - [ ] 프라푸치노 메뉴판을 관리한다.
// - [ ] 블렌디드 메뉴판을 관리한다.
// - [ ] 티바나 메뉴판을 관리한다.
// - [ ] 디저트 메뉴판을 관리한다.

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// - [ ] 페이지에 최초로 접근할 때, 에스프레소 메뉴가 먼저 보이도록 localStorage에서 데이터를 읽어온다.

// TODO 품절 상태 관리
// - [ ] 품절 버튼을 추가한다.
// - [ ] sold-out class를 추가하여 상태를 변경한다.
// - [ ] 품절 상태를 localStorage에 저장한다.
// - [ ] 품절 상태를 localStorage에서 읽어온다. (새로고침해도 데이터를 남아있게 한다.)

import { $ } from './utils/dom.js';
import { store } from './store/index.js';

function App(){
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = 'espresso';
  this.init = () => {
    if(store.getLocalStorage()){
      this.menu = store.getLocalStorage();
    }
    render();
    initEventListeners();
  }

  const render = () => {
    const template = this.menu[this.currentCategory].map((menuItem, index) => {
      return `
      <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${menuItem.soldOut ? 'sold-out' : ''}">${menuItem.name}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        >
          품절
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
      </li>`
    })
    .join('');
  
    $('#menu-list').innerHTML = template;
    updatedMenuListCount();
  }

  const updatedMenuListCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  }

  const addMenuList = () => {
    if($('#menu-name').value === ''){
      alert('값을 입력해주세요.');
      return;
    }

  const menuName = $('#menu-name').value;
  this.menu[this.currentCategory].push({name: menuName});
  store.setLocalStorage(this.menu);
  render();
  $('#menu-name').value = '';

  }

  const updatedMenuList = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const newMenuName = prompt(
      '수정할 메뉴명을 입력하세요.',
      $menuName.innerText
      );
      if(newMenuName !== null){
        this.menu[this.currentCategory][menuId].name = newMenuName;
        store.setLocalStorage(this.menu);
        render();
      }
  }

  const removeMenuName = (e) => {
    if(confirm('정말 삭제하시겠습니까?')){
      const menuId = e.target.closest('li').dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      render();
    }
  }

  const soldOutMenu = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut;
    store.setLocalStorage(this.menu);
    render();
  }

  const initEventListeners = () => {
    $('#menu-list').addEventListener('click', (e) => {
      if(e.target.classList.contains('menu-edit-button')){
        updatedMenuList(e);
        return;
      }
  
      if(e.target.classList.contains('menu-remove-button')){
        removeMenuName(e);
        return;
      }
  
      if(e.target.classList.contains('menu-sold-out-button')){
        soldOutMenu(e);
        return;
      }
    });
  
    $('#menu-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });
  
    $('#menu-submit-button').addEventListener('click', addMenuList);
  
    $('#menu-name').addEventListener('keydown', (e) => {
      if(e.key !== 'Enter'){
        return;
      }
      addMenuList();
    });
  
    $('nav').addEventListener('click', (e) => {
      const isCategoryButton = e.target.classList.contains('cafe-category-name');
      if(isCategoryButton){
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
        render();
      }
    });
  }
}

const app = new App();
app.init();
// step2 요구사항 구현을 위한 전략
// TODO localStorage Read & Write
// - [ ] localStorage에 데이터를 저장한다.
//    - [ ] 메뉴를 추가할 때 저장
//    - [ ] 메뉴를 수정할 때 저장
//    - [ ] 메뉴를 삭제할 때 저장
// - [ ] localStorage에 있는 데이터를 저장한다.

// TODO 카테고리별 메뉴판 관리
// - [ ] 에스프레소 메뉴판을 관리할 수 있도록 한다.
// - [ ] 프라푸치노 메뉴판을 관리할 수 있도록 한다.
// - [ ] 블렌디드 메뉴판을 관리할 수 있도록 한다.
// - [ ] 티바나 메뉴판을 관리할 수 있도록 한다.
// - [ ] 디저트 메뉴판을 관리할 수 있도록 한다.

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// - [ ] 페이지가 최초로 로딩될 때 localStorage에서 데이터를 읽어온다.
// - [ ] 에스프레소 메뉴를 먼저 보이게 한다.

// TODO 품절 상태 관리
// - [ ] 품절 버튼을 추가한다.
// - [ ] sold-out class를 추가한다.
// - [ ] 품절 버튼을 클릭하면 sold-out class를 적용시킨다.
  
const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu){
    // localStorage는 문자열 형태로만 저장 가능 -> JSON.stringify()를 사용하여 문자열 형태로 변경
    localStorage.setItem('menu', JSON.stringify(menu));
  },
  getLocalStorage(){
    return JSON.parse(localStorage.getItem('menu'));
  },
};

function App(){
// 상태는 변하는 데이터를 의미함(앱에서 변하는 것이 무엇인가) - 메뉴명
  this.menu = [];
  this.init = () => {
    if(store.getLocalStorage().length > 1){
      this.menu = store.getLocalStorage();
    }
    render();
  };

  const render = () => {
    const template = this.menu.map((menuItem, index) => {
      return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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
        </li>`;
    })
    .join('');
  
      $('#espresso-menu-list').innerHTML = template;
  
      // const menuCount = li 갯수를 카운팅
      updatedMenuListCount();
  
  }

  const updatedMenuListCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  }

  const addMenuList = () => {
    if($('#espresso-menu-name').value === ''){
      alert('값을 입력해주세요.');
      return;
    }

  const espressoMenuName = $('#espresso-menu-name').value;

  this.menu.push({ name: espressoMenuName });
  store.setLocalStorage(this.menu);

  render();
  $('#espresso-menu-name').value = '';
  }

  const updatedMenuList = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const newMenuName = prompt(
      '수정할 메뉴명을 입력하세요.',
      $menuName.innerText
      );
      if(newMenuName !== null){
        $menuName.innerText = newMenuName;
        this.menu[menuId].name = newMenuName;
        store.setLocalStorage(this.menu);
      }
  }

  const removeMenuName = (e) => {
    if(confirm('정말 삭제하시겠습니까?')){
      const menuId = e.target.closest('li').dataset.menuId;
      this.menu.splice(menuId, 1);
      store.setLocalStorage(this.menu);
      e.target.closest('li').remove();
      updatedMenuListCount();
    }
  }

  $('#espresso-menu-list').addEventListener('click', (e) => {
    if(e.target.classList.contains('menu-edit-button')){
      updatedMenuList(e);
    }

    if(e.target.classList.contains('menu-remove-button')){
      removeMenuName(e);
    }
  });

  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $('#espresso-menu-submit-button').addEventListener('click', addMenuList);

  $('#espresso-menu-name').addEventListener('keydown', (e) => {
    if(e.key !== 'Enter'){
      return;
    }
    addMenuList();
  });
}

// App();
const app = new App();
app.init();
// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [ ] 메뉴의 이름을 입력 받고 '엔터키 입력'으로 추가한다.
// - [ ] 메뉴의 이름을 입력 받고 '확인 버튼'으로 추가한다.
//   - [ ] 추가되는 메뉴의 마크업은 '<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>' 안에 삽입한다.
// - [ ] 메뉴가 추가되고 나면, input은 '빈 값'으로 초기화한다.
//   - [ ] 사용자 입력값이 빈 값이라면 추가되지 않는다.
// - [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.

// TODO 메뉴 수정
//  - [ ] 메뉴의 '수정 버튼'을 클릭하여 메뉴명을 업데이트한다. 
//    - [ ] 브라우저에서 제공하는 'prompt' 인터페이스를 활용한다.
//  - [ ]  신규 메뉴명을 입력하고, 확인 버튼을 누르면 새로운 메뉴 이름이 반영된다.

// TODO 메뉴 삭제
//  - [ ] 메뉴 '삭제 버튼'을 눌러 메뉴를 삭제한다.
//    - [ ] 브라우저에서 제공하는 'confirm' 인터페이스를 활용한다.
//  - [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.
  
const $ = (selector) => document.querySelector(selector);
  
function App(){
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
  const menuItemTemplate = (menuListItem) => {
    return `
      <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuListItem}</span>
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
  };

    $('#espresso-menu-list').insertAdjacentHTML('beforeend', menuItemTemplate(espressoMenuName));

    // const menuCount = li 갯수를 카운팅
    updatedMenuListCount();

    $('#espresso-menu-name').value = '';
  }

  const updatedMenuList = (e) => {
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const newMenuName = prompt(
      '수정할 메뉴명을 입력하세요.',
      $menuName.innerText
      );
      if(newMenuName !== null){
        $menuName.innerText = newMenuName;
      }
  }

  const removeMenuName = (e) => {
    if(confirm('정말 삭제하시겠습니까?')){
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

App();
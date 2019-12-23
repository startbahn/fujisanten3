window.onload = function () {
  var openElements = document.getElementsByClassName("ls-space-pup-open");

  for (var i = 0; i < openElements.length; i++) {
    openElements[i].onclick = function () {
      document.body.classList.add('space-popup');
      let spaceId = this.id; //クリックしたスペースの ID(slug)を取得する
      //スペースごとに slugNo.jsonというファイル名？？？
    }
  }

  var closeElements = document.getElementsByClassName("ls-space-pup-close");
  for (var i = 0; i < closeElements.length; i++) {
    closeElements[i].onclick = function () {
      document.body.classList.remove('space-popup');
    }
  }
}


//var dmain = 'fujisanten.com';
//var directory = 'json';
const space = 'space-org.json';
//var url = 'https://' + dmain + '/' + directory + '/' + file + '.json';

//json読み込み
fetch(space)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    //外枠アクセス
    let popuoSpace = document.querySelector('.section__space-popup');
  
    //テンプレ複製
    for (let i = 1; i < json.length; i++) {
      let clone = popuoSpace.firstElementChild.cloneNode(true);
      popuoSpace.appendChild(clone);
    }

    let edges = json.data.fairChannels.edges;

    let spaceArea = document.querySelectorAll('.js__space-popup--area');
    let spaceName = document.querySelectorAll('.js__space-popup--name');
    let spaceImg = document.querySelectorAll('.js-space-popup--info-img');
    let spaceCatch = document.querySelectorAll('.js-space-popup--catch');
    let spaceAdd = document.querySelectorAll('.js-space-popup--add');
    let spaceWeb = document.querySelectorAll('.js-space-popup--web');
    let spaceTime = document.querySelectorAll('.js-space-popup--time');
    let spaceDotw = document.querySelectorAll('.js-space-popup--dotw');
    let spaceCollabo = document.querySelectorAll('.js-space-popup--collabo');
      
    for (let i = 0; i < edges.length; i++) {

      spaceArea[i].innerHTML = edges[i].node.area;
      spaceName[i].innerHTML = edges[i].node.title;
      spaceAdd[i].innerHTML = edges[i].node.address;
      spaceCatch[i].innerHTML = edges[i].node.description;
      spaceWeb[i].innerHTML = edges[i].node.url;
      spaceWeb[i].href = edges[i].node.url;
      spaceImg[i].src = edges[i].node.bannerImage.url;
      spaceTime[i].innerHTML = edges[i].node.time;
      spaceDotw[i].innerHTML = edges[i].node.dotw;
      spaceCollabo[i].innerHTML = edges[i].node.collabo;
    } 
  });
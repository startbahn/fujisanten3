//jsonファイルURL
//let dmain = 'startbahn.org';
//let id= 'id';
let file = 'space.json';
//let url = 'https://' + dmain + '/' + id + '/' + file + '.json';

//json読み込み
fetch(file)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {

    //外枠アクセス
    let spacePop = document.querySelector('.section__space-popup');

    //テンプレ複製
    for (let i = 1; i < json.length; i++) {
      let clone = spacePop.firstElementChild.cloneNode(true);
      spacePop .appendChild(clone);
    }

    //タイトル、日、テキスト
    let spaceArea = document.querySelectorAll('.js__space-popup--area');
    let spaceName = document.querySelectorAll('.js__space-popup--name');
    let spaceImg = document.querySelectorAll('.js-space-popup--info-img');
    let spaceCatch = document.querySelectorAll('.js-space-popup--catch');
    let spaceAdd = document.querySelectorAll('.js-space-popup--add');
    let spaceWeb = document.querySelectorAll('.js-space-popup--web');
    let spaceTime = document.querySelectorAll('.js-space-popup--time');
    let spaceDotw = document.querySelectorAll('.js-space-popup--dotw');
    let spaceCollabo = document.querySelectorAll('.js-space-popup--collabo');
    let spaceArtistImg = document.querySelectorAll('.js-space-popup--artistImg');
    let speceArtist = document.querySelectorAll('.artist');

    //Dom出力
    for (let i = 0; i < json.length; i++) {
      spaceArea[i].innerHTML = json[i].area;
      spaceName[i].innerHTML = json[i].name;      
      spaceAdd[i].innerHTML = json[i].address;
      spaceCatch[i].innerHTML = json[i].txt;
      spaceWeb[i].innerHTML = json[i].web;
      spaceWeb[i].href = json[i].web;
      spaceImg[i].src = json[i].spaceimg;
      spaceTime[i].innerHTML = json[i].time;
      spaceDotw[i].innerHTML = json[i].dotw;
      spaceCollabo[i].innerHTML = json[i].collabo;

      for (let t = 0; t < json[i].artist.length; t++) {
        let list = document.createElement('li');     
        list.innerHTML = '<img src="' + json[i].artist[t].image + '"><div><p>' + json[i].artist[t].name + '</p><p>' + json[i].artist[t].category + '</P></div>';
        speceArtist[i].appendChild(list);
      }
    }

  });
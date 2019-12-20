//jsonファイルURL
//var dmain = 'fujisanten.com';
//var directory = 'json';
const file = 'artistname.json';
//var url = 'https://' + dmain + '/' + directory + '/' + file + '.json';

//json読み込み
fetch(file)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {

    //外枠アクセス
    let infoArtist = document.querySelector('.js-about-artist');

    //テンプレ複製
    for (let i = 1; i < json.length; i++) {
      let clone = infoArtist.firstElementChild.cloneNode(true);
      infoArtist.appendChild(clone);
    }

    //a tag
    let infoArtistLink = document.querySelectorAll('.js-about-artist-link');

    //Dom
    for (let i = 0; i < json.length; i++) {
      if (json[i].lavel === artist)
        infoArtistLink[i].innerHTML = json[i].title;
      infoArtistLink[i].href = json[i].slug;
    }
  });
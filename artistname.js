//jsonファイルURL
//let dmain = 'startbahn.org';
//let id= 'id';
let file = 'artistname.json';
//let url = 'https://' + dmain + '/' + id + '/' + file + '.json';

//json読み込み
fetch(file)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {

    //外枠アクセス
    let artistName = document.querySelector('.section__about--bgblue');

    //テンプレ複製
    for (let i = 1; i < json.length; i++) {
      let clone = artistName.firstElementChild.cloneNode(true);
      artistName.appendChild(clone);
    }

    //artist
    let artistName = document.querySelectorAll('.js__space-popup--area');

    //Dom出力
    for (let i = 0; i < json.length; i++) {
      spaceArea[i].innerHTML = json[i].area;
      spaceName[i].innerHTML = json[i].name;      
      spaceAdd[i].innerHTML = json[i].address;
      spaceWeb[i].href = json[i].web;

      if (label == artist) {
        artistName.innerHTML = 'あ';
      }


      for (let t = 0; t < json[i].artist.length; t++) {
        let list = document.createElement('li');     
        list.innerHTML = '<img src="' + json[i].artist[t].image + '"><div><p>' + json[i].artist[t].name + '</p><p>' + json[i].artist[t].category + '</P></div>';
        speceArtist[i].appendChild(list);
      }
    }

  });
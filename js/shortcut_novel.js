function viewStrLen(){
  let len = document.getElementById("textarea-id").value.length;
  document.getElementById("strLen").innerText = "文字数：" + len + "文字";
}

function NovelShortcut(){
  let mark = document.getElementById("novel").value.NovelShortcut;
}

function ShortCutOriginal(id1, id2){
  let short_cut1 = document.getElementById(id1).value;
  let short_cut2 = document.getElementById(id2).value;
  let short_cut_id = short_cut1 + "+" + short_cut2;
  //let word = document.getElementById(id3).value;
  return short_cut_id;
}

function onTextAreaKeyDown(event, object) {
  // キーコードと入力された文字列
  let keyCode = event.keyCode;
  let keyVal = event.key;
  // let keyCode = event.code;

  // カーソル位置
  let cursorPosition = object.selectionStart;
  // カーソルの左右の文字列値
  let leftString = object.value.substr(0, cursorPosition);
  let rightString = object.value.substr(cursorPosition, object.value.length);
  let one_leftString = object.value.substr(cursorPosition - 1, 1);
  let leftString_subOne = object.value.substr(0, cursorPosition - 2);
  const space_brackets1 = object.value.charAt(object.value.length - 1);
  const space_brackets2 = object.value.charAt(object.value.length - 2);
  //console.log(one_leftString)


  shortcut.add("ctrl+d",function() {
    ans = document.getElementById("shortcut2-2").value;
    //console.log(ans);
    object.value = leftString + ans + rightString;
    object.selectionEnd = cursorPosition + ans.length;
  }); 

  shortcut.add("ctrl+e",function() {
    object.value = leftString + "……" + rightString;
    object.selectionEnd = cursorPosition + 2;
  }); 

  shortcut.add(ShortCutOriginal("shortcut3-1-1", "shortcut3-1-2"),function() {
    object.value = leftString + document.getElementById("shortcut3-1-3").value + rightString;
    object.selectionEnd = cursorPosition + document.getElementById("shortcut3-1-3").value.length;
  });
  shortcut.add(ShortCutOriginal("shortcut3-2-1", "shortcut3-2-2"),function() {
    object.value = leftString + document.getElementById("shortcut3-2-3").value + rightString;
    object.selectionEnd = cursorPosition + document.getElementById("shortcut3-2-3").value.length;
  });

  

  if(event.code === "BracketRight") {
    if(one_leftString === "　"){
      object.value = leftString.slice(0, -1) + "」" + rightString.slice(0, -1);
      //object.value = leftString + "「」" + rightString;
      object.selectionEnd = cursorPosition - 1;
      console.log(leftString);
      //console.log(one_leftString)
    }else{
      //event.preventDefault();  // 元の挙動を止める
      // textareaの値をカーソル左の文字列 + {} + カーソル右の文字列にする
      object.value = leftString + "」" + rightString;
      // カーソル位置をタブスペースの後ろにする
      object.selectionEnd = cursorPosition + 0;
    }
  }else if(keyVal === "Enter"){
    event.preventDefault();  // 元の挙動を止める
    // textareaの値をカーソル左の文字列 + {} + カーソル右の文字列にする
    object.value = leftString + "\n　" + rightString;
    // カーソル位置をタブスペースの後ろにする
    object.selectionEnd = cursorPosition + 2;
  }
  // object.value = object.value.replace('　「', '「');
}

// テキストエリアのキー入力時の関数を設定
document.getElementById("textarea-id").onkeydown = function(event) {onTextAreaKeyDown(event, this);}

function save() {
  // テキストエリアより文字列を取得
  const txt = document.getElementById('textarea-id').value;
  if (!txt) { return; }

  // 文字列をBlob化
  const blob = new Blob([txt], { type: 'text/plain' });

  // ダウンロード用のaタグ生成
  const a = document.createElement('a');
  a.href =  URL.createObjectURL(blob);
  a.download = 'novel.txt';
  a.click();
};